
// File: app-express.js

const express = require('express')
const port = 8081;
const app=express();
const todoList = ["Complete Node Byte", "Play Cricket"];

app.use(express.json());

app.delete("/todos", (request, response) => {
    let deleteTodo = request.body.name;
    console.log(deleteTodo);
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i] === deleteTodo) {
            todoList.splice(i, 1);
            response.status(201).send("201 Deleted").end();
        }
    }
    response.status(204).send("204 No Content").end();
});

app.post("/todos",(request,response)=>{
    let newTodo=request.body.name;
    todoList.push(newTodo);
    console.log(todoList);
    response.status(201).send("201 Created").end();
});

app.get("/todos", (request,response) => {
    response.send(todoList);
    response.status(200).end();
});

app.all("/todos",(request,response)=>{
    response.status(501).send();
});

app.all("*",(request,response)=>{
    response.status(404).send("404 Not Found");
});

app.listen(port,()=>{
    console.log(`Nodejs server started on port ${port}`)
});

