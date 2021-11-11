import React, { ReactNode } from 'react';
import { ISwaggerComponents } from '../swagger/common';

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

    clear() {
        this.defaultProps = undefined;
        this.customProps = undefined;
    }

    getProps() {
        return _.merge(this.defaultProps, this.customProps);
    }
}

export const customizationArray: ICustomizationItem[] = [];

export const createCustomizationComponentsFactory = (
    baseComponents: ISwaggerComponents,
    customizationName: string,
    callback?: (item: ICustomizationItem) => void,
): ISwaggerComponents => {
    customizationArray.forEach((customization) => customization.clear());

    const init = (
        name: keyof ISwaggerComponents,
        props: any,
        callback?: (item: ICustomizationItem) => void,
    ) => {
        //console.log(`customComponentsFactory.init name=${name} customizationName=${customizationName}`)
        const customizationItem = customizationArray.find(
            (f) => f.methodName === name,
        ) as ICustomizationItem;
        customizationItem.init(props);
        if (callback) {
            callback(customizationItem);
        }
        return customizationItem.getProps();
    };

    return {
        ...baseComponents,
        DEBUG_CUSTOMIZATION_NAME: customizationName,
    };
};
