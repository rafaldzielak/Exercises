import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

interface Todo {
  id: string;
  text: string;
}
let todos: Todo[] = [];

router.get("/todos", (ctx, next) => {
  ctx.response.body = { todos };
});

router.post("/todos", async (ctx, next) => {
  const data = await ctx.request.body().value;
  const newTodo: Todo = { id: new Date().toISOString(), text: data.text };
  todos.push(newTodo);
  ctx.response.body = { message: "Created todo!", todo: newTodo };
});

router.put("/todos/:id", async (ctx, next) => {
  // console.log("Update");
  const id = ctx.params.id;
  const data = await ctx.request.body().value;
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) ctx.response.body = { message: "Failed to update, no todo with that id" };
  else {
    todo.text = data.text;
    ctx.response.body = { message: "Updated todo!" };
  }
});

router.delete("/todos/:id", (ctx, next) => {
  const id = ctx.params.id;
  todos = todos.filter((todo) => todo.id !== id);
  ctx.response.body = { message: "Deleted!" };
});

export default router;
