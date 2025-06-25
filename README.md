# Create a Custom MCP Server and Use It with GitHub Copilot in VS Code (TypeScript)

> **Description:**
> Basic example for using Model Context Protocol (MCP) with VS Code. This repo shows how to create your own MCP server in TypeScript and interact with it by chatting custom prompts to GitHub Copilot in VS Code.

## 1. Clone & enter the repo

```sh
git clone git@github.com:HoangYell/typescript-mcp-vscode.git
cd typescript-mcp-vscode
```

## 2. Install dependencies

```sh
npm install
```

## 3. Build the project

```sh
npm run build
```

## 4. Configure VS Code

Add to your [settings.json](vscode://settings/chat.mcp.discovery.enabled):

```jsonc
{
  "chat.mcp.discovery.enabled": true,
  "mcp": {
    "servers": {
      "SimpleMCP": {
        "type": "node",
        "command": "node_modules/.bin/ts-node", // or node dist/server.js
        "args": ["src/server.ts"], // or dist/server.js
        "cwd": "."
      }
    }
  }
}
```

- Click <Start> above SimpleMCP in VS Code's settings, or run:

```sh
npm start
```

## 5. Try it!

- In the chat, type: `who the fuck is hoangyell?`
- Or: `who the fuck is yellshark?`

---

You should now see the MCP tools working in VS Code chat.

https://www.youtube.com/watch?v=U1YMyUdjqCw

![funny_mcp](https://raw.githubusercontent.com/HoangGeek/store/refs/heads/main/github_copilot/mcp/custom_mcp.png)

**MCP Data Flow Overview (ASCII Art):**

```
User                                 VS Code (MCP Client, "chat.mcp.enabled": true)                   LLM Server (e.g. Copilot/GPT)                   MCP Server
 |                                           |                                                        |                                            |
 | 1. "Who the fuck is yellshark?"           |                                                        |                                            |
 |------------------------------------------>|                                                        |                                            |
 |                                           | 2. Send prompt to LLM server                           |                                            |
 |                                           |------------------------------------------------------>|                                            |
 |                                           |                                                        | 3. Parse intent, select tool               |
 |                                           |                                                        |    (who_the_fuck_is_yellshark)             |
 |                                           | 4. Return tool call info                               |                                            |
 |<------------------------------------------|<------------------------------------------------------|                                            |
 | 5. Call who_the_fuck_is_yellshark()       |                                                        |                                            |
 |------------------------------------------>|                                                        |                                            |
 |                                           |                                                        | 6. Execute tool                            |
 |                                           |                                                        |------------------------------------------->|
 |                                           |                                                        |                                            |
 |                                           | 7. Return tool output                                  |                                            |
 |<------------------------------------------|<------------------------------------------------------|                                            |
 | 8. Display output to user                 |                                                        |                                            |
 |<------------------------------------------|                                                        |                                            |
```
