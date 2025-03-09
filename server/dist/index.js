"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables first
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const connectDB_1 = __importDefault(require("./db/connectDB"));
const app = (0, express_1.default)();
const PORT = 3000;
(0, connectDB_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening at port ${PORT}`);
    });
});
app.use("/api", index_1.default);
