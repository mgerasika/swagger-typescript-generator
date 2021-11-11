import { ISwaggerComponents } from '../swagger/common';
import { ISwaggerApiMethodArgumentsProps } from '../swagger/components/api-method';
import { ISwaggerMethodParameter } from '../swagger/models';
import React from 'react';

export const exampleComponentsFactory = (base: ISwaggerComponents): ISwaggerComponents => {
    return {
        ...base,
    };
};
