import React, {useEffect, useState} from 'react';
import {ApiModelDefinitionsComponent} from './api-model-definitions';
import {ApiClassesComponent} from './api-classes';
import {ISwaggerDocModelConfig, SwaggerDocModel} from '../swagger/model/swagger-doc-model';
import {ISwaggerPlugin} from '../swagger/common/default-plugin';
import {ISwaggerUtils} from "../swagger/common/swagger-utils";
import {createCustomUtilsFactory} from "./custom-utils";

const axios = require('axios');

interface IProps {
    plugin: ISwaggerPlugin;
    createCustomUtilsFactory:(baseUtils:ISwaggerUtils) => ISwaggerUtils;
}

export const SwaggerRootComponent: React.FC<IProps> = (props) => {
    const swaggerUrl = 'https://petstore.swagger.io/v2/swagger.json';
    const [url, setUrl] = useState(swaggerUrl);
    const [root, setRoot] = useState<SwaggerDocModel>();

    const loadSwagger = () => {
        axios.get(url)
            .then((response: any) => {
                const config: ISwaggerDocModelConfig = {
                    source: response.data,
                    modelImportPath: '../api-model',
                    plugin: props.plugin,
                    createCustomUtilsFactory: createCustomUtilsFactory
                };
                setRoot(new SwaggerDocModel(config));
            })
            .catch((error: string) => {
                console.error('load swagger error ' + error);
            });
    };
    const onExploreClick = () => {
        loadSwagger();
    };

    useEffect(() => {
        if (!root) {
            loadSwagger();
        }
    });

    const renderSwagger = () => {
        return root && root.definitions ? (
            <>
                <div className={'d-flex w-100'}>
                    <div className={'col-4'}>
                        <h5>Swagger</h5>
                    </div>
                    <div className={'col-4'}>
                        <h5>Transformed</h5>
                    </div>

                    <div className={'col-4'}>
                        <h5>Typescript</h5>
                    </div>
                </div>

                <hr/>
                <ApiClassesComponent classes={root.classes}/>

                <hr/>
                <ApiModelDefinitionsComponent definitions={root.definitions}/>
            </>
        ) : null;
    };

    return (
        <div className={'p-2'}>
            <div className={'d-flex px-3 pt-1'}>
                <h5>Url&nbsp;to&nbsp;swagger.json:&nbsp;</h5>
                <input type={'text'} className={'w-100'} value={url} onChange={(ev) => setUrl(ev.target.value)}/>
                <button onClick={onExploreClick}>explore</button>
            </div>
            <hr/>

            {renderSwagger()}
        </div>
    );
};

