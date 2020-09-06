import {ISwaggerComponents} from "../swagger/common";
import {ISwaggerApiMethodArgumentsProps} from "../swagger/components/api-method";
import {ISwaggerMethodParameter} from "../swagger/models";
import React from "react";

export const exampleComponentsFactory = (base: ISwaggerComponents): ISwaggerComponents => {
    return {
        ...base,
        renderApiMethodArguments: (Component, props) => {
            const newProps: ISwaggerApiMethodArgumentsProps = {
                ...props,
                parameters: props.parameters.map((parameter): ISwaggerMethodParameter => {
                    if (parameter?.modelType.isArray && parameter?.modelType.isEnum) {
                        return {
                            ...parameter,
                            modelType: {
                                ...parameter.modelType,
                                type: `${parameter.modelType.arrayItemType}[] | string[]`
                            }
                        };
                    }
                    if (parameter?.modelType.isArray) {
                        return {
                            ...parameter,
                            modelType: {
                                ...parameter.modelType,
                                type: `${parameter.modelType.arrayItemType}[]`
                            }
                        };
                    }

                    if (parameter?.modelType.isEnum) {
                        return {
                            ...parameter,
                            modelType: {
                                ...parameter.modelType,
                                type: `${parameter.modelType.type} | string`
                            }
                        };
                    }
                    return parameter;
                }),
            };
            return <Component {...newProps} />;
        },
    }
}