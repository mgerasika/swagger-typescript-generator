"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const api_class_import_1 = require("../components/api-class/api-class-import");
exports.defaultPlugin = {
    apiClassImport: (props) => {
        const imports = [
            'import {AxiosPromise} from \'axios\'',
            'import {IRequestService, requestService} from \'swagger-typescript-generator\''
        ];
        return (<api_class_import_1.ApiClassImportComponent {...props} imports={imports}/>);
    }
};
//# sourceMappingURL=default-plugin.jsx.map