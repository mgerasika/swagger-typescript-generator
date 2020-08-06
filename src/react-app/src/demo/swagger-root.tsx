import React, {useEffect, useMemo, useState} from 'react';
import {ApiAllModelDefinitionsComponent} from './api-all-models-definitions';
import {ApiAllClassesComponent} from './api-all-classes';
import {ISwaggerDocModelConfig, SwaggerDocModel} from '../swagger/model/swagger-doc-model';
import {ISwaggerPlugin} from '../swagger/common/default-plugin';
import {ISwaggerUtils} from "../swagger/common/swagger-utils";
import {createCustomUtilsFactory} from "./custom-utils";
import {DiffComponent} from "./diff";
import {ApiAllClassesExportComponent} from "../swagger/components/api-class";
import {ApiUrlsComponent} from "../swagger/components/urls";
import {AllModelsExportComponent} from "../swagger/components/definitions";
import {ApiAllEnumsComponent} from "./api-all-enums";
import {ApiAllPathComponent} from "./api-all-path";
import 'bootstrap/dist/css/bootstrap.css';

const axios = require('axios');

interface IProps {
    plugin: ISwaggerPlugin;
    createCustomUtilsFactory:(baseUtils:ISwaggerUtils) => ISwaggerUtils;
}

export const SwaggerRootComponent: React.FC<IProps> = (props) => {
    const apiUrls = [
        'https://petstore.swagger.io/v2/swagger.json',
        'https://flipdish-yellow-team.azurewebsites.net/swagger/docs/private-v1.0',
        'https://flipdish-yellow-team.azurewebsites.net/swagger/docs/v1.0'
    ];
    const [url, setUrl] = useState(window.localStorage.getItem('url') ||apiUrls[0]);
    const [selectedApi, setSelectedApi] = useState(window.localStorage.getItem('selectedApi') || '');
    const [selectedPath, setSelectedPath] = useState(window.localStorage.getItem('selectedPath') || '');
    const [selectedDefinition, setSelectedDefinition] = useState(window.localStorage.getItem('selectedDefinition') || '');
    const [selectedEnum, setSelectedEnum] = useState(window.localStorage.getItem('selectedEnum') || '');
    const [root, setRoot] = useState<SwaggerDocModel>();

    const loadSwagger = () => {
        axios.get(url)
            .then((response: any) => {
                const config: ISwaggerDocModelConfig = {
                    apiUrl:'https://petstore.swagger.io',
                    source: response.data,
                    modelImportPath: '../api-model',
                    enumImportPath: '../api-enum',
                    plugin: props.plugin,
                    showPrivateFieldsForDebug:false,
                    createCustomUtilsFactory: createCustomUtilsFactory
                };
                setRoot(new SwaggerDocModel(config));
            })
    };
    const onExploreClick = () => {
        loadSwagger();
    };

    useEffect(() => {
        if (!root) {
            loadSwagger();
        }
    });

    useEffect(() => {
        loadSwagger();
    },[url]);

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

    const selectedEnumObjects = useMemo(()=>{
        if(root && selectedEnum === 'ALL') {
            return root.enums;
        }
        return root ? root.enums.filter(c=>c.name === selectedEnum) : [];
    },[root,selectedEnum])

    const selectedPathsObjects = useMemo(()=>{
        if(root && selectedPath === 'ALL') {
            return root.paths;
        }
        return root ? root.paths.filter(c=>c.name === selectedPath) : [];
    },[root,selectedPath])

    const renderAllClassesExport = root ? <ApiAllClassesExportComponent classes={root.classes} /> : null;
    const renderAllUrlsExport = root ? <ApiUrlsComponent classes={root.classes} /> : null;
    const renderAllModelsExport = root ? <AllModelsExportComponent definitions={root.definitions} /> : null;

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
                {root && <><ApiAllPathComponent paths={selectedPathsObjects}/><hr/></>}

                {root && <><ApiAllClassesComponent classes={selectedApiObjects}/><hr/></>}

                {root && <><ApiAllModelDefinitionsComponent definitions={selectedDefinitionObjects}/><hr/></>}

                {root && <><ApiAllEnumsComponent enums={selectedEnumObjects}/><hr/></>}

                <hr />
                <h5 className={'pl-3'}>All APIs exports:</h5>
                <DiffComponent key={'index.ts'}  obj3={renderAllClassesExport}/>
                <hr/>

                <h5 className={'pl-3'}>All definitions exports:</h5>
                <DiffComponent obj3={renderAllModelsExport}/>
                <hr/>
                <h5 className={'pl-3'}>Urls:</h5>
                <DiffComponent  obj3={renderAllUrlsExport}/>
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

    const renderUrlOptions = () => {
        const items = apiUrls.map(item => <option key={item} value={item}>{item}</option>)
        return <>{items}</>
    }

    const renderApiDefinitionsOptions = () => {
        if(!root) {
            return null;
        }
        const items = root.definitions.map(item => <option key={item.name} value={item.name}>{item.name}</option>)
        return <>{items}</>
    }

    const renderEnumOptions = () => {
        if(!root) {
            return null;
        }
        const items = root.enums.map((item,idx) => <option key={`${item.name}_${idx}`} value={item.name}>{item.name}</option>)
        return <>{items}</>
    }

    const renderPathOptions = () => {
        if(!root) {
            return null;
        }
        const items = root.paths.map((item,idx) => <option key={`${item.name}_${idx}`} value={item.name}>{item.name}</option>)
        return <>{items}</>
    }

    return (
        <div className={'p-2'}>
            <div className={'d-flex px-3 pt-1 py-2'}>
                <h5 style={{width:'300px'}}>Url&nbsp;to&nbsp;swagger.json:&nbsp;</h5>
                <select className={'w-100'} value={url} onChange={(ev) => {
                    window.localStorage.setItem('url',ev.target.value);
                    setUrl(ev.target.value);
                }}>
                    {renderUrlOptions()}
                </select>
                <button onClick={onExploreClick}>explore</button>
            </div>
            <div className={'d-flex px-3 pt-1 py-2'}>
                <div className={'d-flex w-25'}>
                    <h5>Paths:&nbsp;</h5>
                    <select className={'w-100'} value={selectedPath} onChange={(ev) => {
                        window.localStorage.setItem('selectedPath',ev.target.value);
                        setSelectedPath(ev.target.value);
                    }}>
                        <option value='ALL'>ALL</option>
                        <option value=''></option>
                        {renderPathOptions()}
                    </select>
                </div>
                <div className={'d-flex w-25'}>
                    <h5>Api&nbsp;method:&nbsp;</h5>
                    <select className={'w-100'} value={selectedApi} onChange={(ev) => {
                        window.localStorage.setItem('selectedApi',ev.target.value);
                        setSelectedApi(ev.target.value);
                    }}>
                        <option value='ALL'>ALL</option>
                        <option value=''></option>
                        {renderApiMethodOptions()}
                    </select>
                </div>
                <div className={'d-flex w-25 pl-3'}>
                    <h5 style={{width:200}}>Definitions:</h5>
                    <select className={'w-100'} value={selectedDefinition} onChange={(ev) => {
                        window.localStorage.setItem('selectedDefinition',ev.target.value);
                        setSelectedDefinition(ev.target.value)
                    }}>
                        <option value='ALL'>ALL</option>
                        <option value=''></option>
                        {renderApiDefinitionsOptions()}
                    </select>
                </div>

                <div className={'d-flex w-25 pl-3'}>
                    <h5 style={{width:200}}>Enums:</h5>
                    <select className={'w-100'} value={selectedEnum} onChange={(ev) => {
                        window.localStorage.setItem('selectedEnum',ev.target.value);
                        setSelectedEnum(ev.target.value)
                    }}>
                        <option value='ALL'>ALL</option>
                        <option value=''></option>
                        {renderEnumOptions()}
                    </select>
                </div>

            </div>
            <hr/>

            {renderSwagger()}
        </div>
    );
};

