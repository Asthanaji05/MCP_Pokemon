# Deploying MCP Server to Render

This guide will walk you through deploying your MCP Server to Render using the `render.yaml` file I just created.

## Prerequisites

* A Render account.
MCP Server project pushed to a Git repository.

## Deployment Steps Followed

1. **Commit and Push `render.yaml`:**
    Make sure you commit the newly created `render.yaml` file to your Git repository and push it to your remote.

2. **Create a New Web Service in Render:**
    * Log in to your Render dashboard.
    * Click on "New" -> "Web Service".

3. **Connect to your Git Repository:**
    * Connect Render to your Git provider (GitHub).
    * Select the repository containing your MCP Server project.

4. **Configure the Web Service:**
    * Render should automatically detect the `render.yaml` file in your repository.
    * Review the settings. The `render.yaml` file pre-configures the following:
        * **Service Type:** Web Service
        * **Name:** `mcp-server`
        * **Environment:** Node
        * **Build Command:** `npm install && npm run build`
        * **Start Command:** `node dist/index.js`
        * **Health Check Path:** `/`
        * **Environment Variables:** `NODE_ENV=production`

5. **Deploy:**
    * Click "Create Web Service" to start the deployment process.
    * Render will now clone your repository, run the build command, and then start your server.

### After Deployment

* Monitor the deployment logs in the Render dashboard to ensure everything starts up correctly.
* Once deployed, Render will provide you with a public URL for your MCP Server.

Note:

* **`src/index.ts`**: This is your primary HTTP API server, which handles requests and exposes the Pokémon-related tools. The `startCommand: node index.js` in `render.yaml` is designed to run the compiled JavaScript version of this server.

* **`src/mcp-server.ts`**: This is a separate MCP (Model Context Protocol) server. It acts as a wrapper that communicates via standard input/output (stdio) and forwards tool calls to your main HTTP API server (the one running from `index.js`). The `"mcp": "ts-node src/mcp-server.ts"` script in your `package.json` is for running this MCP wrapper, not the main HTTP server that you want to deploy on Render.

So, the current `render.yaml` correctly targets the main server for deployment.
