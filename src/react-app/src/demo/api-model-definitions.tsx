import React, {ReactNode} from 'react';
import {DiffComponent} from "./diff";
import {SwaggerDefinitionModel} from "../swagger/model/swagger-definition-model";
import {ModelDefinitionComponent} from '../swagger/components/definitions/model-definition';
import {AllModelsExportComponent} from '../swagger/components/definitions';

interface IProps {
    definitions: SwaggerDefinitionModel[];
}

export const ApiModelDefinitionsComponent: React.FC<IProps> = (props) => {
    const renderCodegen = (def: SwaggerDefinitionModel) => {
        return (<ModelDefinitionComponent definition={def}></ModelDefinitionComponent>)
    };
    const result = props.definitions.map((def: SwaggerDefinitionModel) => {
        return <DiffComponent key={def.name} obj1={def.source} obj2={def} obj3={renderCodegen(def)}/>
    })

    const renderAllModelsExport = <AllModelsExportComponent definitions={props.definitions} />
    return (
        <>
            <h5 className={'pl-3'}>Definitions examble for index.ts:</h5>
            <DiffComponent key={'index.ts'} obj1={{}} obj2={{}} obj3={renderAllModelsExport}/>
            <hr/>
            <h5 className={'pl-3'}>Definitions:</h5>
            {result}
        </>
    );
}

