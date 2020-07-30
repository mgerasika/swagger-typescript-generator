import React from 'react';
import {ApiClassImportComponent, IApiClassImportProps} from '../swagger/components';
import {defaultPlugin, ISwaggerPlugin} from '../swagger/common/default-plugin';
import {ISwaggerUtils} from "../swagger/common/swagger-utils";

export const createCustomUtilsFactory = (baseUtils:ISwaggerUtils) => baseUtils;

