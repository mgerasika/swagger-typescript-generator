"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.Diff = function (props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: 'd-flex w-100' },
            react_1.default.createElement("div", { className: 'col-4' },
                react_1.default.createElement("pre", null, JSON.stringify(props.obj1, null, 4))),
            react_1.default.createElement("div", { className: 'col-4' },
                react_1.default.createElement("pre", null, JSON.stringify(props.obj2, null, 4))),
            react_1.default.createElement("div", { className: 'col-4' },
                react_1.default.createElement("pre", null, props.obj3)))));
};
//# sourceMappingURL=diff.js.map