import { Hono } from "hono";
import { logger } from "hono/logger";
import { authorsRoutes } from "./routes/authors";
import { expensesRoutes } from "./routes/expenses";
import { prettyJSON } from "hono/pretty-json";
import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";
import { serveStatic } from 'hono/bun'



const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

const app = new Hono();

app.use(prettyJSON());

app.use(logger());

// finally opened a web socket connection
app.get(
  "/ws",
  upgradeWebSocket((c) => {
    return {
      onOpen() {
        console.log("a connection was opened");
      },
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data}`);
        ws.send("Hello from server!");
      },
      onClose: () => {
        console.log("Connection closed");
      },
    };
  })
);

const apiRoutes = app.basePath("/api").route("/authors", authorsRoutes).route("/expenses", expensesRoutes);

app.get('*', serveStatic({ root: '../frontend/dist' }))
app.get('*', serveStatic({ path: '../frontend/dist/index.html' }))

export type ApiRoutes = typeof apiRoutes

const server = Bun.serve({
  port: 3000,
  fetch: app.fetch,
  websocket,
});

console.log(`running bun server....${server.port}`);
