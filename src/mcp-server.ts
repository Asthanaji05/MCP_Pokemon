#!/usr/bin/env node

/**
 * MCP Server wrapper that implements the Model Context Protocol
 * This server communicates via stdio and forwards tool calls to the HTTP API server
 */

import * as readline from 'readline';
import axios from 'axios';

const HTTP_SERVER_URL = process.env.MCP_HTTP_SERVER_URL || 'http://localhost:3000';

interface MCPRequest {
  jsonrpc: '2.0';
  id: number | string | null;
  method: string;
  params?: any;
}

interface MCPResponse {
  jsonrpc: '2.0';
  id: number | string | null;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

class MCPServer {
  private requestId: number = 1;
  private initialized: boolean = false;

  async handleRequest(request: MCPRequest): Promise<MCPResponse> {
    try {
      switch (request.method) {
        case 'initialize':
          if (this.initialized) {
            return {
              jsonrpc: '2.0',
              id: request.id,
              error: {
                code: -32000,
                message: 'Server already initialized',
              },
            };
          }
          this.initialized = true;
          const initResponse: MCPResponse = {
            jsonrpc: '2.0',
            id: request.id,
            result: {
              protocolVersion: '2024-11-05',
              capabilities: {
                tools: {},
              },
              serverInfo: {
                name: 'pokemon-mcp-server',
                version: '1.0.0',
              },
            },
          };
          // Send initialized notification after responding
          setTimeout(() => {
            const notification = {
              jsonrpc: '2.0' as const,
              method: 'notifications/initialized',
              params: {},
            };
            process.stdout.write(JSON.stringify(notification) + '\n');
          }, 0);
          return initResponse;

        case 'tools/list':
          return await this.listTools(request);

        case 'tools/call':
          return await this.callTool(request);

        default:
          return {
            jsonrpc: '2.0',
            id: request.id,
            error: {
              code: -32601,
              message: `Method not found: ${request.method}`,
            },
          };
      }
    } catch (error: any) {
      return {
        jsonrpc: '2.0',
        id: request.id,
        error: {
          code: -32603,
          message: error.message || 'Internal error',
        },
      };
    }
  }

  private async listTools(request: MCPRequest): Promise<MCPResponse> {
    try {
      const response = await axios.get(`${HTTP_SERVER_URL}/tools`);
      const tools = response.data;

      // Convert tools to MCP format
      const mcpTools = tools.map((tool: any) => ({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.parameters,
      }));

      return {
        jsonrpc: '2.0',
        id: request.id,
        result: {
          tools: mcpTools,
        },
      };
    } catch (error: any) {
      return {
        jsonrpc: '2.0',
        id: request.id,
        error: {
          code: -32603,
          message: `Failed to fetch tools: ${error.message}`,
        },
      };
    }
  }

  private async callTool(request: MCPRequest): Promise<MCPResponse> {
    try {
      const { name, arguments: args } = request.params || {};
      
      if (!name) {
        return {
          jsonrpc: '2.0',
          id: request.id,
          error: {
            code: -32602,
            message: 'Tool name is required',
          },
        };
      }

      // Call the HTTP API endpoint
      const response = await axios.post(
        `${HTTP_SERVER_URL}/api/tools/${name}`,
        args || {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        jsonrpc: '2.0',
        id: request.id,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify(response.data, null, 2),
            },
          ],
        },
      };
    } catch (error: any) {
      return {
        jsonrpc: '2.0',
        id: request.id,
        error: {
          code: -32603,
          message: `Tool call failed: ${error.response?.data?.error || error.message}`,
        },
      };
    }
  }

  async start() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stderr, // Use stderr for readline prompts/output
      terminal: false,
    });

    rl.on('line', async (line) => {
      if (!line.trim()) return;

      try {
        const request: MCPRequest = JSON.parse(line);
        const response = await this.handleRequest(request);
        // Write JSON-RPC responses to stdout
        process.stdout.write(JSON.stringify(response) + '\n');
      } catch (error: any) {
        const errorResponse: MCPResponse = {
          jsonrpc: '2.0',
          id: null,
          error: {
            code: -32700,
            message: `Parse error: ${error.message}`,
          },
        };
        // Write errors to stdout as well (JSON-RPC format)
        process.stdout.write(JSON.stringify(errorResponse) + '\n');
      }
    });

    // Handle process signals
    process.on('SIGINT', () => {
      rl.close();
      process.exit(0);
    });
  }
}

// Start the server
const server = new MCPServer();
server.start().catch((error) => {
  process.stderr.write(`Failed to start MCP server: ${error.message}\n`);
  process.exit(1);
});

