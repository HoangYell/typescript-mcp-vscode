import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import axios from "axios";
import * as fs from "fs";
import * as path from "path";

const server = new McpServer({
  name: "SimpleMCP",
  version: "1.0.0"
});

server.registerTool(
  "who_the_fuck_is_hoangyell",
  {
    title: "Who is Hoangyell",
    description: "Fetches info about hoangyell from hoangyell.com and returns a short summary.",
    inputSchema: {}
  },
  async () => {
    try {
      const resp = await axios.get("https://hoangyell.com", { timeout: 10000 });
      if (resp.status === 200) {
        const text = resp.data;
        const summary = typeof text === 'string'
          ? text.substring(0, 300).replace(/\n/g, " ").replace(/\r/g, " ")
          : JSON.stringify(text).substring(0, 300);
        return {
          content: [{ type: "text", text: `hoangyell.com summary: ${summary}...` }]
        };
      } else {
        return {
          content: [{ type: "text", text: `I think MCP just DDoSed hoangyell.com: ${resp.status}` }]
        };
      }
    } catch (e: any) {
      return {
        content: [{ type: "text", text: `I think MCP just DDoSed hoangyell.com: ${e.message || String(e)}` }]
      };
    }
  }
);

server.registerTool(
  "who_the_fuck_is_yellshark",
  {
    title: "Who is Yellshark",
    description: "Creates a file with a message from yellshark and returns the file path.",
    inputSchema: {}
  },
  async () => {
    const filePath = path.resolve("yellshark.txt");
    fs.writeFileSync(filePath, "You're mad — from YellShark, with love. 🦈❤️😈\n");
    return {
      content: [{ type: "text", text: `The response is in this file: ${filePath}` }]
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("SimpleMCP server started");
}

main().catch(console.error);
