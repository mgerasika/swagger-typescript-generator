import React from "react";
import {SwaggerClass} from "../../model/swagger-class";
import {ESwaggerPlugins} from "../../common/swagger-plugins";
import {usePlugin} from "../../common/use-plugin";

interface IAdapterProps {
    swaggerClass: SwaggerClass;
}

export const GenerateClassImportAdapter: React.FC<IAdapterProps> = (props) => {
    const imports = ['import axios, {AxiosError, AxiosPromise} from \'axios\';'];
    const getProps = (): IProps => {
        return {
            swaggerClass: props.swaggerClass,
            imports
        }
    }

    return (
        <>
            {usePlugin(ESwaggerPlugins.ClassImport, getProps())}
        </>
    );
}

interface IProps {
    swaggerClass: SwaggerClass;
    imports: string[];
}

export const ClassImport: React.FC<IProps> = (props) => {
    const result = props.imports.map((val:string) =>{
        return (<div key={val} >{val};</div>)
    })
    return (
        <>
            {result}
            {'\n'}
        </>
    );
}
