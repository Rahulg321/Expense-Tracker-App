import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters long",
    })
    .max(255, {
      message: "Title must be at most 255 characters long",
    }),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;

// id need not be present
const createPostSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "Rent",
    amount: 1000,
  },
  {
    id: 2,
    title: "Groceries",
    amount: 100,
  },
  {
    id: 3,
    title: "Car Insurance",
    amount: 200,
  },
  {
    id: 4,
    title: "Playstation",
    amount: 499,
  },
];

export const expensesRoutes = new Hono()
  .get("/", (c) => {
    return c.json({
      expenses: fakeExpenses,
    });
  })
  .get("/total-expenses", async (c) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const total = fakeExpenses.reduce((acc, expense)=> acc + expense.amount, 0)
    return c.json({
      total,
    });
  })
  //   this regular expression will make sure it is always a number;
  .get("/:id{[0-9]+}", (c) => {
    const id = c.req.param("id");
    const parsedId = parseInt(id);
    const foundExpense = fakeExpenses.find((e) => e.id === parsedId);

    if (!foundExpense) {
      return c.notFound();
    }

    return c.json({
      expense: foundExpense,
    });
  })
  //   this is validator middleware, it validates the request coming from the request body, we also need to specify the schema to validate the request and type of request body coming in......
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const validated = c.req.valid("json");
    console.log("valid fields returned are", validated);
    return c.json({
      message: "expense created",
      validated,
    });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = c.req.param("id");
    const parsedId = parseInt(id);
    const expenseIndex = fakeExpenses.findIndex((e) => e.id === parsedId);

    if (expenseIndex === -1) {
      return c.notFound();
    }

    fakeExpenses.splice(expenseIndex, 1); // Remove 1 element at the found index

    return c.json({
      message: "expense deleted",
    });
  });
