"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.ApiClassConstructorComponent = function (props) {
    return react_1.default.createElement(react_1.default.Fragment, null,
        '\t',
        "public constructor(service:IRequestService) ",
        '{\n',
        '\t\t',
        "this._requestService = service; ",
        '\n',
        '\t}\n');
};
//# sourceMappingURL=api-class-constructor.js.map