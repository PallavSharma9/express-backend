import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
// Force reliable DNS resolvers due to SRV resolution issues on local network
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./src/db/db.js";

import app from "./src/app.js";

await connectDB();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
