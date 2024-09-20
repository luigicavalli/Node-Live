import express, { Express } from "express";
import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  READ_TODO,
} from "./todos.controllers";
import { VALIDATE_BODY } from "./todos.middleware";

const app: Express = express();
const port: number = 3000;
app.use(express.json());

app.get("/todos", READ_TODO);

app.post("/todos", VALIDATE_BODY, ADD_TODO);

app.put("/todos", VALIDATE_BODY, UPDATE_TODO);

app.delete("/todos", DELETE_TODO);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
