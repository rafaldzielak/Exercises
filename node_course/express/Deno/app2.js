"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mod_ts_1 = require("https://deno.land/x/oak/mod.ts");
var app = new mod_ts_1.Application();
app.use(function (ctx, next) {
    ctx.response.body = "Hello World!";
});
await app.listen({ port: 3000 });
