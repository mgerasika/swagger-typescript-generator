"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var server_1 = require("react-dom/server");
var ReactJSDOM = require('react-jsdom');
// const url = "http://192.168.1.72:84/swagger/docs/v1";
//
// axios.get(url)
//     .then(response => {
//         generate(response.data);
//     })
//     .catch(error => {
//         console.log(error);
//     });
//
// const generate = (json: any) => {
//     const parentDir = path.resolve(__dirname,'..');
//     console.log('parentDir' + parentDir)
//
//     const config: ISwaggerConfig = {
//         apiFilesOutDir: `${parentDir}/gen/api`,
//         modelFilesOutDir: `${parentDir}/gen/model`,
//         plugins: [],
//         swaggerInputJson: json
//     }
//     const swaggerGenerator = new SwaggerGenerator(config);
//     swaggerGenerator.generate();
// }
//const elem = ReactJSDOM.render(<div>hi</div>);
var Hi = /** @class */ (function (_super) {
    __extends(Hi, _super);
    function Hi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hi.prototype.render = function () {
        return ('3hi2');
    };
    return Hi;
}(React.Component));
var body = server_1.renderToString(React.createElement(Hi));
console.log(body);
//# sourceMappingURL=index.js.map