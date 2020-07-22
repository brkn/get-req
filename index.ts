import { get as http } from "http";
import { get as https } from "https";

export default function getRequest(url: string) {
  const get = url.indexOf("https") === 0 ? https : http

  return new Promise<string>((resolve, reject) => {
    const request = get(url, (incomingMessage) => {
      let responseChunks = [] as string[];

      incomingMessage.on("data", (chunk) => {
        responseChunks.push(chunk);
      });

      incomingMessage.on("end", () => {
        const response = responseChunks.join();
        resolve(response);
      });
    });

    request.on("error", (error) => {
      reject(error);
    });

    request.end();
  });
}