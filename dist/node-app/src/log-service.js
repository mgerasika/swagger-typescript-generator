"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clc = require("cli-color");
var LogService = /** @class */ (function () {
    function LogService() {
    }
    LogService.prototype.log = function (msg) {
        console.log(clc.green(msg));
    };
    LogService.prototype.error = function (msg) {
        console.log(clc.red(msg));
    };
    return LogService;
}());
exports.logService = new LogService();
//# sourceMappingURL=log-service.js.map