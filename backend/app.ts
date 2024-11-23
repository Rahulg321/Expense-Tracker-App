import { Hono } from "hono";
import { logger } from "hono/logger";
import { authorsRoutes } from "./routes/authors";
import { expensesRoutes } from "./routes/expenses";
import { prettyJSON } from "hono/pretty-json";
import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

const app = new Hono();

app.use(prettyJSON());

app.use(logger());

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

app.route("/api/authors", authorsRoutes);
app.route("/api/expenses", expensesRoutes);

Bun.serve({
  port: 4000,
  fetch: app.fetch,
  websocket,
});

console.log("running bun server....4000");
