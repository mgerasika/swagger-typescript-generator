"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
exports.ApiClassImportComponent = (props) => {
    const result = props.imports.map((val) => {
        return (<div key={val}>{val};{'\n'}</div>);
    });
    const responseTypes = props.swaggerClass.methods.map((method) => {
        return method.responseType;
    }).filter((filter) => filter);
    return (<>
            {result}
            <div>import {'{'} {responseTypes.join(',')} {'}'} from
                '{props.swaggerClass.parent.config.modelFolderPath}';
            </div>
            {'\n\n'}
        </>);
};
//# sourceMappingURL=api-class-import.jsx.map