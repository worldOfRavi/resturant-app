"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import app router
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const PORT = 3000;
// app.get("/",(req:Request, res:Response)=>{
//     res.send("Hello Raj");
// })
app.use("/api", index_1.default);
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});
