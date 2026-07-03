const express = require("express");
const router = express.Router();
const{
    getTodos,
    createTodos,
    updateTodos,
    deleteTodos
} = require("../controllers/todoController");
router.get("/", getTodos);
router.post("/", createTodos);
router.put("/:id", updateTodos);
router.delete("/:id", deleteTodos);
module.exports = router;