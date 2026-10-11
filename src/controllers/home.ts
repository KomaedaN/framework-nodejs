import type { IncomingMessage, ServerResponse } from "http";

export class HomeController {
  public index(request: IncomingMessage, response: ServerResponse) {
    response.end(JSON.stringify({
      service: "diagnostic",
      version: 1
    }));
  }
}
