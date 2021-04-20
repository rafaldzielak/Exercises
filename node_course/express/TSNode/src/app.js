"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var todos_1 = __importDefault(require("./routes/todos"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(todos_1.default);
app.listen(3000);
