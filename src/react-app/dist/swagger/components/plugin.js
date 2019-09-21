"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var api_class_import_1 = require("./api-class/api-class-import");
exports.defaultPlugin = {
    apiClassImport: function (props) {
        var imports = [
            'import {AxiosPromise} from \'axios\'',
            'import {IRequestService, requestService} from \'swagger-typescript-generator\''
        ];
        return (React.createElement(api_class_import_1.ApiClassImportComponent, __assign({}, props, { imports: imports })));
    }
};
//# sourceMappingURL=plugin.js.map