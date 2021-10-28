import React, {ReactNode} from "react";
import {ISwaggerComponents} from "../swagger/common";

const _ = require('lodash');

interface IProps {
    style?: object;
    children: ReactNode;
}

export class ICustomizationItem {
    methodName: string = '';
    defaultProps?: any = {};
    customProps?: any = {};

    constructor(name: keyof ISwaggerComponents) {
        this.methodName = name;
    }

    init(props: any) {
        this.defaultProps = props;
    }

    clear(){
        this.defaultProps = undefined;
        this.customProps = undefined;
    }

    getProps() {
        return _.merge(this.defaultProps,this.customProps);
    }
}

export const customizationArray: ICustomizationItem[] = [
    new ICustomizationItem('renderWarningMessage'),
    new ICustomizationItem('renderApiClass'),
    new ICustomizationItem('renderApiClassName'),
    new ICustomizationItem('renderAllClassesExport'),
    new ICustomizationItem('renderApiClassConstructor'),
    new ICustomizationItem('renderApiClassImport'),
    new ICustomizationItem('renderApiClassFields'),
    new ICustomizationItem('renderApiClassMethods'),
    new ICustomizationItem('renderApiClassInstance'),

    new ICustomizationItem('renderApiMethod'),
    new ICustomizationItem('renderApiMethodArguments'),
    new ICustomizationItem('renderApiMethodName'),
    new ICustomizationItem('renderApiMethodBody'),
    new ICustomizationItem('renderApiMethodReturnType'),

    new ICustomizationItem('renderAllModelsExport'),
    new ICustomizationItem('renderModelImport'),
    new ICustomizationItem('renderModel'),

    new ICustomizationItem('renderAllEnumsExport'),
    new ICustomizationItem('renderEnum'),
    new ICustomizationItem('renderEnumContent'),
    new ICustomizationItem('renderEnumField'),

    new ICustomizationItem('renderAllUrls'),
    new ICustomizationItem('renderAllInOneFile'),
]
const Customization = ({children, style}: IProps) => {
    return <span style={{border: '1px solid red', ...style}}>{children}</span>
}
export const createCustomizationComponentsFactory = (baseComponents: ISwaggerComponents, customizationName: string, callback?: (item: ICustomizationItem) => void): ISwaggerComponents => {

    customizationArray.forEach(customization=>customization.clear());

    const init = (name: keyof ISwaggerComponents, props: any, callback?: (item: ICustomizationItem) => void) => {
        //console.log(`customComponentsFactory.init name=${name} customizationName=${customizationName}`)
        const customizationItem = customizationArray.find(f => f.methodName === name) as ICustomizationItem;
        customizationItem.init(props);
        if(callback) {
            callback(customizationItem);
        }
        return customizationItem.getProps();
    }

    return ({
        ...baseComponents,
        DEBUG_CUSTOMIZATION_NAME:customizationName,
        renderWarningMessage: (BaseComponent, props) => {
            const methodName = 'renderWarningMessage';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization>
                    {baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderApiMethod: (BaseComponent, props) => {
            const methodName = 'renderApiMethod';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization style={{display: 'block', margin: '2px 0px'}}>
                    {baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderApiMethodName: (BaseComponent, props) => {
            const methodName = 'renderApiMethodName';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderApiMethodArguments: (BaseComponent, props) => {
            const methodName = 'renderApiMethodArguments';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderApiMethodReturnType: (BaseComponent, props) => {
            const methodName = 'renderApiMethodReturnType';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderApiMethodBody: (BaseComponent, props) => {
            const methodName = 'renderApiMethodBody';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization
                    style={{display: 'inline-block'}} {...newProps}>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderAllClassesExport: (BaseComponent, props) => {
            const methodName = 'renderAllClassesExport';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderAllEnumsExport: (BaseComponent, props) => {
            const methodName = 'renderAllEnumsExport';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderAllInOneFile: (BaseComponent, props) => {
            const methodName = 'renderAllInOneFile';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderAllModelsExport: (BaseComponent, props) => {
            const methodName = 'renderAllModelsExport';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderAllUrls: (BaseComponent, props) => {
            const methodName = 'renderAllUrls';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderApiClass: (BaseComponent, props) => {
            const methodName = 'renderApiClass';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization
                    style={{display: 'block'}}>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderApiClassConstructor: (BaseComponent, props) => {
            const methodName = 'renderApiClassConstructor';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization
                    style={{display: 'block'}}>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderApiClassFields: (BaseComponent, props) => {
            const methodName = 'renderApiClassFields';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization
                    style={{display: 'block'}}>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderApiClassImport: (BaseComponent, props) => {
            const methodName = 'renderApiClassImport';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization
                    style={{display: 'block'}}>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderApiClassInstance: (BaseComponent, props) => {
            const methodName = 'renderApiClassInstance';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderApiClassMethods: (BaseComponent, props) => {
            const methodName = 'renderApiClassMethods';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization style={{display: 'block'}}>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderApiClassName: (BaseComponent, props) => {
            const methodName = 'renderApiClassName';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderEnum: (BaseComponent, props) => {
            const methodName = 'renderEnum';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization style={{display: 'block'}}>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderEnumContent: (BaseComponent, props) => {
            const methodName = 'renderEnumContent';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization style={{display: 'block'}}>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderEnumField: (BaseComponent, props) => {
            const methodName = 'renderEnumField';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization style={{display: 'block'}}>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderModel: (BaseComponent, props) => {
            const methodName = 'renderModel';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization style={{display:'block'}}>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
        renderModelImport: (BaseComponent, props) => {
            const methodName = 'renderModelImport';
            const newProps = init(methodName, props, callback);
            if (customizationName === methodName) {
                return <Customization style={{display:'block'}}>{baseComponents[methodName](BaseComponent,newProps)}</Customization>
            } else {
                return baseComponents[methodName](BaseComponent,newProps)
            }
        },
    })
}