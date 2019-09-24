"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const diff_1 = require("./diff");
const model_definition_1 = require("../swagger/components/definitions/model-definition");
const definitions_1 = require("../swagger/components/definitions");
exports.ApiModelDefinitionsComponent = (props) => {
    const renderCodegen = (def) => {
        return (<model_definition_1.ModelDefinitionComponent definition={def}></model_definition_1.ModelDefinitionComponent>);
    };
    const result = props.definitions.map((def) => {
        return <diff_1.DiffComponent key={def.name} obj1={def.source} obj2={def} obj3={renderCodegen(def)}/>;
    });
    const renderAllModelsExport = <definitions_1.AllModelsExportComponent definitions={props.definitions}/>;
    return (<>
            <h5 className={'pl-3'}>Definitions examble for index.ts:</h5>
            <diff_1.DiffComponent key={'index.ts'} obj1={{}} obj2={{}} obj3={renderAllModelsExport}/>
            <hr />
            <h5 className={'pl-3'}>Definitions:</h5>
            {result}
        </>);
};
//# sourceMappingURL=api-model-definitions.jsx.map