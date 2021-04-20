"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var e_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
var text = "test";
var server_ts_1 = require("https://deno.land/std@0.92.0/http/server.ts");
var server = server_ts_1.serve({ port: 3000 });
try {
    for (var server_1 = __asyncValues(server), server_1_1; server_1_1 = await server_1.next(), !server_1_1.done;) {
        var req = server_1_1.value;
        req.respond({ body: "Hello World\n" });
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (server_1_1 && !server_1_1.done && (_a = server_1.return)) await _a.call(server_1);
    }
    finally { if (e_1) throw e_1.error; }
}
