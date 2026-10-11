import { createServer } from "node:http";
import type { Server, ServerResponse, IncomingMessage } from "node:http";
import type { Config } from "./config";

export class Kernel {
  #config: Config;
  #server: Server | undefined;
  public constructor(config: Config) {
    this.#config = config;
  }

  public listen() {
    const { port, hostname } = this.#config.server;
    const server = createServer((request, response) => {
      this.handle(request, response);
    });
    const shutdown = () => {
      this.close();
    };
    server.listen(port, hostname, () => {
      console.log(`Http server listening on http://${hostname}:${port}`);
    });

    this.#server = server;
    process.once("SIGINT", shutdown);
    process.once("SIGTERM", shutdown);
  }

  public handle(request: IncomingMessage, response: ServerResponse) {
    response.end("Hello from kernel test");
  }

  public close() {
    this.#server?.close(() => {
      console.log("Server close");
    });
  }
}
