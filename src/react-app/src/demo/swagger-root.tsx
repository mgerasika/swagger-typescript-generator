import React, {useEffect, useMemo, useState} from 'react';
import {ApiModelDefinitionsComponent} from './api-model-definitions';
import {ApiClassesComponent} from './api-classes';
import {ISwaggerDocModelConfig, SwaggerDocModel} from '../swagger/model/swagger-doc-model';
import {ISwaggerPlugin} from '../swagger/common/default-plugin';
import {ISwaggerUtils} from "../swagger/common/swagger-utils";
import {createCustomUtilsFactory} from "./custom-utils";
import {DiffComponent} from "./diff";
import {ApiAllClassesExportComponent} from "../swagger/components/api-class";
import {ApiUrlsComponent} from "../swagger/components/urls";
import {AllModelsExportComponent} from "../swagger/components/definitions";

const axios = require('axios');

interface IProps {
    plugin: ISwaggerPlugin;
    createCustomUtilsFactory:(baseUtils:ISwaggerUtils) => ISwaggerUtils;
}

export const SwaggerRootComponent: React.FC<IProps> = (props) => {
    //https://flipdish-yellow-team.azurewebsites.net/swagger/docs/private-v1.0
    //https://flipdish-yellow-team.azurewebsites.net/swagger/docs/v1.0
    const swaggerUrl = 'https://flipdish-yellow-team.azurewebsites.net/swagger/docs/v1.0'//https://petstore.swagger.io/v2/swagger.json';
    const [url, setUrl] = useState(swaggerUrl);
    const [selectedApi, setSelectedApi] = useState(window.localStorage.getItem('selectedApi') || '');
    const [selectedDefinition, setSelectedDefinition] = useState(window.localStorage.getItem('selectedDefinition') || '');
    const [root, setRoot] = useState<SwaggerDocModel>();

    const loadSwagger = () => {
        axios.get(url)
            .then((response: any) => {
                const config: ISwaggerDocModelConfig = {
                    apiUrl:'https://petstore.swagger.io',
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

    const renderAllClassesExport = root ? <ApiAllClassesExportComponent classes={root.classes} /> : null;
    const renderAllUrlsExport = root ? <ApiUrlsComponent classes={root.classes} /> : null;
    const renderAllModelsExport = root ? <AllModelsExportComponent definitions={root.definitions} /> : null;

    const selectedApiObjects = useMemo(()=>{
        if(root && selectedApi === 'ALL') {
            return root.classes;
        }
        return root ? root.classes.filter(c=> c.name === selectedApi) : [];
    },[root,selectedApi])

    const selectedDefinitionObjects = useMemo(()=>{
        if(root && selectedDefinition === 'ALL') {
            return root.definitions;
        }
        return root ? root.definitions.filter(c=>c.name === selectedDefinition) : [];
    },[root,selectedDefinition])

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
                {root && <><ApiClassesComponent classes={selectedApiObjects}/><hr/></>}

                {root && <><ApiModelDefinitionsComponent definitions={selectedDefinitionObjects}/><hr/></>}

                <hr />
                <h5 className={'pl-3'}>All APIs exports:</h5>
                <DiffComponent key={'index.ts'}  obj3={renderAllClassesExport}/>
                <hr/>

                <h5 className={'pl-3'}>All definitions exports:</h5>
                <DiffComponent key={'index.ts'} obj3={renderAllModelsExport}/>
                <hr/>
                <h5 className={'pl-3'}>Urls:</h5>
                <DiffComponent key={'index.ts'}  obj3={renderAllUrlsExport}/>
                <hr/>
            </>
        ) : null;
    };

    const renderApiMethodOptions = () => {
        if(!root) {
            return null;
        }
        const items = root.classes.map(item => <option key={item.name} value={item.name}>{item.name}</option>)
        return <>{items}</>
    }

    const renderApiDefinitions = () => {
        if(!root) {
            return null;
        }
        const items = root.definitions.map(item => <option key={item.name} value={item.name}>{item.name}</option>)
        return <>{items}</>
    }

    return (
        <div className={'p-2'}>
            <div className={'d-flex px-3 pt-1 py-2'}>
                <h5 style={{width:'300px'}}>Url&nbsp;to&nbsp;swagger.json:&nbsp;</h5>
                <input type={'text'} className={'w-100'} value={url} onChange={(ev) => setUrl(ev.target.value)}/>
                <button onClick={onExploreClick}>explore</button>
            </div>
            <div className={'d-flex px-3 pt-1 py-2'}>
                <div className={'d-flex w-50'}>
                    <h5 style={{width:'340px'}}>Api method:</h5>
                    <select className={'w-100'} value={selectedApi} onChange={(ev) => {
                        window.localStorage.setItem('selectedApi',ev.target.value);
                        setSelectedApi(ev.target.value);
                    }}>
                        <option value=''></option>
                        <option value='ALL'>ALL</option>
                        {renderApiMethodOptions()}
                    </select>
                </div>
                <div className={'d-flex w-50 pl-3'}>
                    <h5 style={{width:200}}>Definitions:</h5>
                    <select className={'w-100'} value={selectedDefinition} onChange={(ev) => {
                        window.localStorage.setItem('selectedDefinition',ev.target.value);
                        setSelectedDefinition(ev.target.value)
                    }}>
                        <option value=''></option>
                        <option value='ALL'>ALL</option>
                        {renderApiDefinitions()}
                    </select>
                </div>

            </div>
            <hr/>

            {renderSwagger()}
        </div>
    );
};

