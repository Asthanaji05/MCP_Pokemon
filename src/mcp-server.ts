#!/usr/bin/env node

/**
 * MCP Server wrapper that implements the Model Context Protocol
 * This server communicates via stdio and forwards tool calls to the HTTP API server
 */

import * as readline from 'readline';
import axios from 'axios';

const HTTP_SERVER_URL = process.env.MCP_HTTP_SERVER_URL || 'https://pokemon-mcp-server-vs8m.onrender.com';

interface MCPRequest {
  jsonrpc: '2.0';
  id?: number | string | null;
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

  async handleRequest(request: MCPRequest): Promise<MCPResponse | null> {
    // Don't respond to notifications (requests without id)
    const isNotification = request.id === undefined || request.id === null;
    
    try {
      switch (request.method) {
        case 'initialize':
          if (this.initialized) {
            if (isNotification) return null;
            return {
              jsonrpc: '2.0',
              id: request.id!,
              error: {
                code: -32000,
                message: 'Server already initialized',
              },
            };
          }
          this.initialized = true;
          const initResponse: MCPResponse = {
            jsonrpc: '2.0',
            id: request.id ?? null,
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
          if (isNotification) return null;
          return {
            jsonrpc: '2.0',
            id: request.id!,
            error: {
              code: -32601,
              message: `Method not found: ${request.method}`,
            },
          };
      }
    } catch (error: any) {
      if (isNotification) return null;
      return {
        jsonrpc: '2.0',
        id: request.id!,
        error: {
          code: -32603,
          message: error.message || 'Internal error',
        },
      };
    }
  }

  private async listTools(request: MCPRequest): Promise<MCPResponse | null> {
    if (request.id === undefined || request.id === null) {
      return null; // Don't respond to notifications
    }
    
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
        id: request.id!,
        error: {
          code: -32603,
          message: `Failed to fetch tools: ${error.message}`,
        },
      };
    }
  }

  private async callTool(request: MCPRequest): Promise<MCPResponse | null> {
    if (request.id === undefined || request.id === null) {
      return null; // Don't respond to notifications
    }
    
    try {
      const { name, arguments: args } = request.params || {};
      
      if (!name) {
        return {
          jsonrpc: '2.0',
          id: request.id!,
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
        id: request.id!,
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
        id: request.id!,
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

      let requestId: number | string | null = null;
      
      try {
        // Try to parse the request to get the ID, even if validation fails
        const rawRequest = JSON.parse(line);
        requestId = rawRequest.id || null;
        
        const request: MCPRequest = rawRequest;
        
        // Validate required fields
        if (!request.jsonrpc || !request.method) {
          throw new Error('Missing required fields: jsonrpc or method');
        }
        
        const response = await this.handleRequest(request);
        // Write JSON-RPC responses to stdout (only if not a notification)
        if (response !== null) {
          process.stdout.write(JSON.stringify(response) + '\n');
        }
      } catch (error: any) {
        // Only send error response if we have a valid request ID
        // For parse errors, try to extract ID from raw JSON
        if (requestId === null) {
          try {
            const rawRequest = JSON.parse(line);
            requestId = rawRequest.id || null;
          } catch {
            // If we can't parse at all, don't send a response
            // The client will timeout or handle it differently
            return;
          }
        }
        
        // Send parse error response only if we have an ID
        if (requestId !== null) {
          const errorResponse: MCPResponse = {
            jsonrpc: '2.0',
            id: requestId,
            error: {
              code: -32700,
              message: `Parse error: ${error.message}`,
            },
          };
          process.stdout.write(JSON.stringify(errorResponse) + '\n');
        }
      }
    });

    // Handle process signals
    process.on('SIGINT', () => {
      rl.close();
      process.exit(0);
    });
  }
}

// Verify HTTP server is accessible before starting
async function verifyHTTPServer() {
  try {
    const response = await axios.get(`${HTTP_SERVER_URL}/tools`, { timeout: 2000 });
    return true;
  } catch (error) {
    process.stderr.write(
      `\n⚠️  WARNING: HTTP server at ${HTTP_SERVER_URL} is not accessible.\n` +
      `   Please start it with: npm start\n` +
      `   The MCP server will continue but tool calls will fail.\n\n`
    );
    return false;
  }
}

// Start the server
const server = new MCPServer();
verifyHTTPServer().then(() => {
  server.start().catch((error) => {
    process.stderr.write(`Failed to start MCP server: ${error.message}\n`);
    process.exit(1);
  });
});

