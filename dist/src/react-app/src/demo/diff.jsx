"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
exports.DiffComponent = (props) => {
    return (<>
            <div className={'d-flex w-100'}>
                <div className={'col-4'}>
                <pre>
                 {JSON.stringify(props.obj1, null, 4)}
                </pre>
                </div>
                <div className={'col-4'}>
                <pre>
                    {JSON.stringify(props.obj2, null, 4)}
                </pre>
                </div>

                <div className={'col-4'}>
                <pre>
                    {props.obj3}
                </pre>
                </div>
            </div>
        </>);
};
//# sourceMappingURL=diff.jsx.map