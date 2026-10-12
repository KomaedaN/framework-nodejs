import type { IncomingMessage } from "node:http";

export const getBody = async (request: IncomingMessage) => {
  let body = "";

  for await (const chunk of request) {
    body += chunk
  }

  return body;
}
