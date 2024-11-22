import { Hono } from "hono";

export const authorsRoutes = new Hono()
  .get("/", (c) => {
    return c.json({
      authors: ["JK Rowling", "george rr marting", "naval ravikant"],
    });
  })
  .post("/", (c) => {
    return c.json({
      message: "author created",
    });
  })
  .delete("/", (c) => {
    return c.json({
      message: "author deleted",
    });
  });
