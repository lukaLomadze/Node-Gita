#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import chalk from "chalk";

const program = new Command();
const file = "./todos.json";


function getTodos() {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "[]");
  return JSON.parse(fs.readFileSync(file));
}

function setTodos(todos) {
  fs.writeFileSync(file, JSON.stringify(todos, null, 2));
}


program
  .command("show")
  .description("Show all todos")
  .action(() => {
    const todos = getTodos();
    if (todos.length === 0) {
      console.log(chalk.yellow("No todos yet."));
      return;
    }
    todos.forEach(t =>
      console.log(chalk.cyan(`[${t.id}] ${t.title} - Done: ${t.isDone}`))
    );
  });


program
  .command("add <title>")
  .description("Add new todo")
  .action(title => {
    const todos = getTodos();
    const newTodo = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      title,
      isDone: false
    };
    todos.push(newTodo);
    setTodos(todos);
    console.log(chalk.green("Added:"), newTodo);
  });


program
  .command("delete <id>")
  .description("Delete todo by ID")
  .action(id => {
    const todos = getTodos();
    const index = todos.findIndex(t => t.id == id);
    if (index === -1) {
      console.log(chalk.red("Todo not found"));
      return;
    }
    const deleted = todos.splice(index, 1)[0];
    setTodos(todos);
    console.log(chalk.red("Deleted:"), deleted);
  });


program
  .argument("<id>")
  .option("--name <title>", "Update todo title")
  .option("--done <bool>", "Mark done true/false")
  .action((id, options) => {
    const todos = getTodos();
    const todo = todos.find(t => t.id == id);
    if (!todo) {
      console.log(chalk.red("Todo not found"));
      return;
    }
    if (options.name) todo.title = options.name;
    if (options.done) todo.isDone = options.done === "true";
    setTodos(todos);
    console.log(chalk.green("Updated:"), todo);
  });

program.parse(process.argv);
