import type { IncomingMessage, ServerResponse } from "http";
import { getBody } from "../core/body";

export class HealthController {
  public index(request: IncomingMessage, response: ServerResponse) {
    response.end(JSON.stringify({
      status: "ok",
      date: new Date().toISOString()
    }));
  }

  public ping(request: IncomingMessage, response: ServerResponse) {
    response.end("Pong");
  }

  public async post(request: IncomingMessage, response: ServerResponse) {
    const body = await getBody(request)
    const json = JSON.parse(body);
    const received = json["service"];

    response.end(JSON.stringify({
      received
    }));
  }

  public delete(request: IncomingMessage, response: ServerResponse) {
    response.writeHead(204);
  }
}
