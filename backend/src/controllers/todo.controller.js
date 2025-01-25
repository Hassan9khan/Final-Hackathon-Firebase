import mongoose from "mongoose";
import Todos from "../models/todo.model.js";

const addTodo = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({
      message: "title or description required",
    });
    return;
  }

  const todo = await Todos.create({
    title,
    description,
  });
  res.status(201).json({
    message: "todo added to database",
    todo,
  });
};

// get all todo
const getAllTodos = async (req, res) => {
  const todos = await Todos.find({});
  res.status(200).json({
    todos: todos,
  });
};

// get single todo
const getTodoWithId = async (req, res) => {
  const { id } = req.params;
  console.log(id, "1");
  if (!id) {
    return res.status(400).json({ error: "Not valid Id" });
  }

  const todo = await Todos.findById(id);
  if (!todo) {
    res.status(404).json({
      message: "no todo found!",
    });
    return;
  }

  res.status(200).json(todo);
};

// delete todo

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const deletedTodo = await Todos.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully", data: deletedTodo });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// const deleteTodo = async (req, res) => {
//   const { id } = req.params;

//   if (!id) {
//     return res.status(400).json({ error: "Not valid id" });
//   }

//   const todo = await Todos.findOneAndDelete({ _id: id });

//   if (!todo) {
//     return res.status(404).json({ error: "No Todo found" });
//   }
//   res.status(200).json({
//     message: "todo deleted successfully",
//     todo,
//   });
// };

// edit todo
const editTodo = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ error: "Not a valid Id" });
  }

  const todo = await Todos.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!todo) {
    return res.status(404).json({ error: "Todo not found!" });
  }

  res.json(todo);
};

export { addTodo, getAllTodos, getTodoWithId, deleteTodo, editTodo };
