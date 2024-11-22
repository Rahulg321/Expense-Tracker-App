import { Hono } from "hono";
import { logger } from "hono/logger";
import { authorsRoutes } from "./routes/authors";
import { expensesRoutes } from "./routes/expenses";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();

app.use(prettyJSON());

app.use(logger());

app.route("/api/authors", authorsRoutes);
app.route("/api/expenses", expensesRoutes);

export default app;
