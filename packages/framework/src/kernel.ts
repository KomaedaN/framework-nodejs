import { createServer } from "node:http";
import type { Server, ServerResponse, IncomingMessage } from "node:http";
import type { Config } from "./config";

export class Kernel {
  #config: Config;
  #server: Server | undefined;
  #shutdown = () => {
    this.close().catch((error) => {
      console.error(error);
    });
  };

  public constructor(config: Config) {
    this.#config = config;
  }

  public listen() {
    if (this.#server !== undefined) {
      throw new Error(`Kernel déjà démarré`);
    }
    this.validateConfig();
    const { port, hostname } = this.#config.server;
    const server = createServer((request, response) => {
      this.handle(request, response);
    });

    return new Promise<void>((resolve, reject) => {
      server.once("error", reject);
      server.listen(port, hostname, () => {
        console.log(`Http server listening on http://${hostname}:${port}`);
        server.off("error", reject);
        this.#server = server;
        process.once("SIGINT", this.#shutdown);
        process.once("SIGTERM", this.#shutdown);
        resolve();
      });
    });
  }

  public handle(request: IncomingMessage, response: ServerResponse) {
    response.end("Hello from kernel test");
  }

  public close() {
    return new Promise<void>((resolve, reject) => {
      process.off("SIGINT", this.#shutdown);
      process.off("SIGTERM", this.#shutdown);
      const server = this.#server;
      if (!server) {
        resolve();
        return;
      }
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        console.log("Server close");
        this.#server = undefined;
        resolve();
      });
    });
  }

  private validateConfig() {
    if (
      !Number.isInteger(this.#config.server.port) ||
      this.#config.server.port < 0 ||
      this.#config.server.port > 65535
    ) {
      throw new Error(
        `Config invalide : server.port doit être un entier entre 0 et 65535, Port actuel :${this.#config.server.port}`,
      );
    }
    if (
      typeof this.#config.server.hostname !== "string" ||
      this.#config.server.hostname.trim() === ""
    ) {
      throw new Error(
        `Config invalide : server.hostname doit être une chaine de caractere valide, Hostname actuel : ${JSON.stringify(this.#config.server.hostname)}`,
      );
    }
  }
}
