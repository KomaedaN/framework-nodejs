import type { IncomingMessage, ServerResponse } from "http";

export class NotFoundController {
  public all(request: IncomingMessage, response: ServerResponse) {
    response.writeHead(404);

    response.end(JSON.stringify({
      error: "Unknown route"
    }));
  }
}
