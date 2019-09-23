"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_color_1 = __importDefault(require("cli-color"));
class LogService {
    log(msg) {
        console.log(cli_color_1.default.green(msg));
    }
    error(msg) {
        console.log(cli_color_1.default.red(msg));
    }
}
exports.logService = new LogService();
//# sourceMappingURL=log-service.js.map