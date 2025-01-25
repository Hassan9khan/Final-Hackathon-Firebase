import express from "express";
import {
  addTodo,
  deleteTodo,
  editTodo,
  getAllTodos,
  getTodoWithId,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/todo", addTodo);
router.get("/todos", getAllTodos);
router.get("/todo/:id", getTodoWithId);
router.delete("/todo/:id", deleteTodo);
router.put("/todo/:id", editTodo);

export default router;
