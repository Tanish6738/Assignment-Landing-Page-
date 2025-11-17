import app from "./src/app.js";
import { config } from "dotenv";
import http from "http";
import connectDB from "./src/config/db.js";
config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
    connectDB();
    console.log(`🚀 Server is running on http://localhost:${PORT}`
    )
});