import { Kernel } from "../../../packages/framework/src/kernel";

process.loadEnvFile();
const app = new Kernel({
  server: {
    port: Number(process.env["PORT"]),
    hostname: process.env["HOST"] ?? "0.0.0.0",
  },
});
try {
  await app.listen();
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(String(error));
  }
  process.exitCode = 1;
}
