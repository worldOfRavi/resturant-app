import expres, { Request, Response } from 'express';
// import app router
import appRouter from "./routes/index";
const app = expres();
const PORT = 3000;

// app.get("/",(req:Request, res:Response)=>{
//     res.send("Hello Raj");
// })

app.use("/api",appRouter)

app.listen(PORT,()=>{
    console.log(`Server is listening at port ${PORT}`);
})