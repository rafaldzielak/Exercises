import express from "express";
import todosRoutes from "./routes/todos";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());

app.use(todosRoutes);

app.listen(3000);
