import { createServer } from "http";
import { Controller } from "./controllers";

const port = Number(process.env["PORT"] ?? 3000);
const hostname = "0.0.0.0";
const controller = new Controller();

const server = createServer((request, response) => {
  if (request.url === "/") {
    if (request.method === "GET") {
      return controller.home.index(request, response);
    }
  }

  if (request.url === "/health") {
    if (request.method === "GET") {
      return controller.health.index(request, response);
    }

    if (request.method === "POST") {
      return controller.health.post(request, response);
    }

    if (request.method === "DELETE") {
      return controller.health.delete(request, response);
    }
  }

  if (request.url === "/ping") {
    if (request.method === "GET") {
      return controller.health.ping(request, response);
    }
  }
  const url: URL = new URL(request.url ? "/" : "http://localhost/");
  if (url.pathname === "/api/tasks") {
    if (request.method === "GET") {
      return controller.task.index(request, response);
    }
  }

  controller.notFound.all(request, response);
});

server.listen(port, hostname, () => {
  console.log(`Http server listening on http://${hostname}:${port}`);
});

process.once("SIGINT", () => {
  console.log("Gracefully shutting down the server.");

  server.close(() => {
    console.log("Server closed, bye.");
  });
});
