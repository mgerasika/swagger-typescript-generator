import React from 'react';
import {ClassImport} from "../swagger/ts-generator/class/class-import";
import {ESwaggerPlugins, ISwaggerPlugin} from "../swagger/common/swagger-plugins";

const ClassImportPlugin: React.FC = (props: any) => {
    const getProps = (): any => {
        return {...props, imports: [...props.imports, 'hello world!']};
    }
    return (
        <>
            <ClassImport swaggerClass={props.swaggerClass} {...getProps()}  />
        </>
    );
}

export const customPlugins: ISwaggerPlugin[] = [
    {
        pluginName: ESwaggerPlugins.ClassImport,
        componentFn: (props) => {
            return (<ClassImportPlugin {...props}/>)
        }
    }
];

