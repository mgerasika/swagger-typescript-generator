"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const diff_1 = require("./diff");
const api_class_1 = require("../swagger/components/api-class");
const api_all_class_export_1 = require("../swagger/components/api-class/api-all-class-export");
const urls_1 = require("../swagger/components/urls");
exports.ApiClassesComponent = (props) => {
    const renderCodegen = (swaggerClass) => {
        return (<api_class_1.ApiClassDefinitionComponent swaggerClass={swaggerClass}></api_class_1.ApiClassDefinitionComponent>);
    };
    const result = props.classes.map((def) => {
        return <diff_1.DiffComponent key={def.fileName} obj1={def.source} obj2={def} obj3={renderCodegen(def)}/>;
    });
    const renderAllClassesExport = <api_all_class_export_1.ApiAllClassesExportComponent classes={props.classes}/>;
    const renderAllUrlsExport = <urls_1.ApiUrlsComponent classes={props.classes}/>;
    return (<>
            <h5 className={'pl-3'}>Api examble for index.ts:</h5>
            <diff_1.DiffComponent key={'index.ts'} obj1={{}} obj2={{}} obj3={renderAllClassesExport}/>
            <hr />

            <h5 className={'pl-3'}>Urls for all apis:</h5>
            <diff_1.DiffComponent key={'index.ts'} obj1={{}} obj2={{}} obj3={renderAllUrlsExport}/>
            <hr />

            <h5 className={'pl-3'}>Api:</h5>
            {result}
        </>);
};
//# sourceMappingURL=api-classes.jsx.map