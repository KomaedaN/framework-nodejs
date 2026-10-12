import type { IncomingMessage, ServerResponse } from "http";
import { getBody } from "../core/body";

export class TaskController {
  public index(request: IncomingMessage, response: ServerResponse) {
    const url: URL = new URL("http://localhost/api/tasks");
    const count = url.searchParams.get("count");
    const filters = url.searchParams.get("filters");
    response.end(
      JSON.stringify({
        status: "ok",
        count: count,
        filters: filters,
      }),
    );
  }

  public async post(request: IncomingMessage, response: ServerResponse) {
    const body = await getBody(request);
    const json = JSON.parse(body);
    const received = json["service"];

    response.end(
      JSON.stringify({
        received,
      }),
    );
  }

  public delete(request: IncomingMessage, response: ServerResponse) {
    response.writeHead(204);
  }
}
