import { Kernel } from "../../packages/framework/kernel";

process.loadEnvFile();
const app = new Kernel({
  server: { port: Number(process.env["PORT"]), hostname: "0.0.0.0" },
});
app.listen();
