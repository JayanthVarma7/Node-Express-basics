
// File: app-http.js

const http = require('http');

const port = 8081;


http.createServer((request, response) => {

    // Set response status code and response headers

    
    // const { headers, method, url } = request;

    const todoList = ["Complete Node Byte", "Play Cricket"];
    const {headers,method,url}=request;
    if (method === "GET" && url === "/todos") {
        response.write(todoList.toString())
        response.statusCode=200;
        response.end();
    }
    else if (method === "POST" && url === "/todos") {
        let body = '';
        request.on('error', (err) => {
            console.error(err);
        }).on('data', (chunk) => {
            body += chunk;
        }).on('end', () => {
            body = JSON.parse(body);
            todoList.push(body.name);
            console.log(body,body.name,todoList);
        });
        response.statusCode=201;
        response.end();
    } 
    else if (method === "DELETE" && url === "/todos") {
        let body = '';
        request.on('error', (err) => {
            console.error(err);
        }).on('data', (chunk) => {
            body += chunk;
        }).on('end', () => {
            body = JSON.parse(body);
            let deleteTodo = body.name;
            let flag=false;
            for (let i = 0; i < todoList.length; i++) {
                if (todoList[i] === deleteTodo) {
                    todoList.splice(i, 1);
                    flag=true;
                }
            }
            if(!flag){
                response.statusCode=204;
            }
            console.log(body,body.name,todoList);
        })
        response.end();
    }
    
    
    // if (request.method === 'POST' && request.url === '/todos') {
    //     response.statusCode=201;
    //     let body = '';
    //     request.on('error', (err) => {
    //         console.error(err);
    //     }).on('data', (chunk) => {
    //         body += chunk;
    //     }).on('end', () => {
    //         body = JSON.parse(body);
    //         todoList.push(body.name);
    //     });
    //     response.write(body);
    //     response.write(`<p>201 Created</p>`);
    //     response.end();
    // }
    // if (request.method === 'GET' && request.url === '/todos') {
    //     response.statusCode=200;
    //     response.write('<h1>TODO Created by</h1>');
    //     response.write('<ol>');
    //     for (let i=0;i<todoList.length;i++){
    //         response.write(`<li>${todoList[i]}</li>`)
    //     }
    //     response.write('</ol>');
    //     response.end();
    // }
    // if (request.method === 'GET' && request.url === '/random') {
    //     response.statusCode=404;
    //     response.write("404 Not Found");
    //     response.end();
    // }
    // if (request.method === 'GET' && request.url === '/') {
    //     response.statusCode=404;
    //     response.write("404 Not Found");
    //     response.end();
    // }

    // Set response body i.e, data to be sent
    // response.writeHead(200, { 'Content-Type': 'text/html' });
    // Tell the server the response is complete and to close the connection
    // response.end();

}).listen(port, () => {

    // Log text to the terminal once the server starts

    console.log(`Nodejs server started on port ${port}`)


});
