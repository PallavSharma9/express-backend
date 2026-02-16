import dns from "node:dns/promises";
dns.setServers([
  "1.1.1.1", // Cloudflare
  "8.8.8.8", // Google
]);
import "dotenv/config";
import app from "./src/app.js";
import { connectDB } from "./src/db/db.js";

async function startServer() {
  await connectDB();

  app.listen(3000, () => {
    console.log("server is working on port number 3000");
  });
}

startServer();
