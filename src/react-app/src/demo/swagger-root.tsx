import React, {useEffect, useState} from 'react';
import {ApiModelDefinitionsComponent} from './api-model-definitions';
import {ApiClassesComponent} from './api-classes';
import {ISwaggerDocConfig, SwaggerDoc} from '../swagger/model/swagger-doc';
import {ISwaggerContextProps, SwaggerContext} from '../swagger/common/swagger-context';
import {ISwaggerPlugin} from '../swagger/components/plugin';

const axios = require('axios');

interface IProps {
    plugins: ISwaggerPlugin;
}

export const SwaggerRootComponent: React.FC<IProps> = (props) => {
    const [url, setUrl] = useState('http://192.168.235.1:84/swagger/docs/v1');
    const [root, setRoot] = useState<SwaggerDoc>();

    const loadSwagger = () => {
        axios.get(url, {headers: {'Access-Control-Allow-Origin': 'http://localhost:3000/'}})
            .then((response: any) => {
                const config: ISwaggerDocConfig = {
                    source: response.data,
                    apiFolderPath: '../gen/api',
                    modelFolderPath: '../gen/model'
                };
                setRoot(new SwaggerDoc(config));
            })
            .catch((error: string) => {
                console.log('load swagger error ' + error);
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

    const getContextValue = (): ISwaggerContextProps => {
        return {
            plugin: props.plugins
        };
    };

    return (
        <div className={'p-2'}>
            <div className={'d-flex px-3 pt-1'}>
                <h5>Url&nbsp;to&nbsp;swagger.json:&nbsp;</h5>
                <input type={'text'} className={'w-100'} value={url} onChange={(ev) => setUrl(ev.target.value)}/>
                <button onClick={onExploreClick}>explore</button>
            </div>
            <hr/>

            <SwaggerContext.Provider value={getContextValue()}>
                {renderSwagger()}
            </SwaggerContext.Provider>
        </div>
    );
};

