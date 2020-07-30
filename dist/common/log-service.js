"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cli_color_1 = __importDefault(require("cli-color"));
var LogService = /** @class */ (function () {
    function LogService() {
    }
    LogService.prototype.log = function (msg) {
        console.log(cli_color_1.default.green(msg));
    };
    LogService.prototype.error = function (msg) {
        console.log(cli_color_1.default.red(msg));
    };
    return LogService;
}());
exports.logService = new LogService();
//# sourceMappingURL=log-service.js.map