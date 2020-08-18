import React, {useEffect, useMemo, useState} from 'react';
import {DemoApiAllModelDefinitionsComponent} from './api-all-models-definitions';
import {DemoApiAllClassesComponent} from './api-all-classes';
import {SwaggerDocModel} from '../swagger/model/swagger-doc-model';
import {ISwaggerPlugin} from '../swagger/common/default-plugin';
import {ISwaggerUtils} from "../swagger/common/swagger-utils";
import {createCustomUtilsFactory} from "./custom-utils";
import {DiffComponent} from "./diff";
import {ApiAllClassesExportComponent} from "../swagger/components/api-class";
import {ApiUrlsComponent} from "../swagger/components/urls";
import {AllModelsExportComponent} from "../swagger/components/definitions";
import {DemoApiAllEnumsComponent} from "./api-all-enums";
import {DemoApiAllPathComponent} from "./api-all-path";
import {ISwaggerDocModelConfig} from "../swagger/model";
import {SwaggerPanelComponent} from "../components/swagger-panel";
import {Select} from "../components/select";
import {dictionary} from "../components/dictionary";
import {AllEnumsExportComponent} from "../swagger/components/enum-definition";

const axios = require('axios');

interface IProps {
    plugin: ISwaggerPlugin;
    createCustomUtilsFactory: (baseUtils: ISwaggerUtils) => ISwaggerUtils;
}


interface IState {
    url: string;
    selectedApi: string;
    selectedPath: string;
    selectedDefinition: string;
    selectedEnum: string;
    root?: SwaggerDocModel;
    selectedPanelTitle: string;
}

export const SwaggerRootComponent: React.FC<IProps> = (props) => {
    const apiUrls = [
        'https://petstore.swagger.io/v2/swagger.json',
        'https://flipdish-yellow-team-qa.azurewebsites.net/swagger/docs/private-v1.0',
        'https://flipdish-yellow-team-qa.azurewebsites.net/swagger/docs/v1.0'
    ];

    const [state, setState] = useState<IState>({
        url: window.localStorage.getItem('url') || apiUrls[0],
        selectedApi: window.localStorage.getItem('selectedApi') || '',
        selectedPath: window.localStorage.getItem('selectedPath') || '',
        selectedDefinition: window.localStorage.getItem('selectedDefinition') || '',
        selectedEnum: window.localStorage.getItem('selectedEnum') || '',
        selectedPanelTitle: window.localStorage.getItem('selectedPanelTitle') || 'Api',
    });

    const loadSwagger = () => {
        axios.get(state.url)
            .then((response: any) => {
                const config: ISwaggerDocModelConfig = {
                    apiUrl: 'https://petstore.swagger.io',
                    source: response.data,
                    modelImportPath: '../api-model',
                    enumImportPath: '../api-enum',
                    plugin: props.plugin,
                    showPrivateFieldsForDebug: false,
                    createCustomUtilsFactory: createCustomUtilsFactory
                };
                setState({
                    ...state,
                    root: new SwaggerDocModel(config)
                });
            })
    };


    useEffect(() => {
        if (!state.root) {
            loadSwagger();
        }
    });

    useEffect(() => {
        loadSwagger();
    }, [state.url]);

    const selectedApiObjects = useMemo(() => {
        if (state.root && state.selectedApi === 'ALL') {
            return state.root.classes;
        }
        return state.root ? state.root.classes.filter(c => c.name === state.selectedApi) : [];
    }, [state.root, state.selectedApi])

    const selectedDefinitionObjects = useMemo(() => {
        if (state.root && state.selectedDefinition === 'ALL') {
            return state.root.definitions;
        }
        return state.root ? state.root.definitions.filter(c => c.name === state.selectedDefinition) : [];
    }, [state.root, state.selectedDefinition])

    const selectedEnumObjects = useMemo(() => {
        if (state.root && state.selectedEnum === 'ALL') {
            return state.root.enums;
        }
        return state.root ? state.root.enums.filter(c => c.name === state.selectedEnum) : [];
    }, [state.root, state.selectedEnum])

    const selectedPathsObjects = useMemo(() => {
        if (state.root && state.selectedPath === 'ALL') {
            return state.root.paths;
        }
        return state.root ? state.root.paths.filter(c => c.name === state.selectedPath) : [];
    }, [state.root, state.selectedPath])

    const renderHeaderTitles = () => {
        return <div className={'d-flex w-100'}>
            <div className={'col-4'}>
                <div className="form-control-sm pl-0">Swagger</div>
            </div>
            <div className={'col-4'}>
                <div className="form-control-sm pl-0">Transformed</div>
            </div>

            <div className={'col-4'}>
                <div className="form-control-sm pl-0">Typescript</div>
            </div>
        </div>
    }
    const handleSelectedPanelTitleChange = (t: string) => {
        window.localStorage.setItem('selectedPanelTitle', t);
        setState({
            ...state,
            selectedPanelTitle: t
        })
    }
    const renderHeader = () => {
        return <>
            <div className="w-75 mb-2">
                <div className="row justify-content-between">
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <pre style={{textAlign:'left',lineHeight:'28px'}} className="m-0 p-0">
                            <a href="https://github.com/mgerasika/swagger-typescript-generator">swagger-typescript-generator</a>
                        </pre>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-8">
                        <Select value={state.url} onChange={(ev) => {
                            window.localStorage.setItem('url', ev.target.value);
                            setState({
                                ...state,
                                root:undefined,
                                url: ev.target.value
                            })
                        }} options={dictionary.getUrlOptions(apiUrls)}/>
                    </div>
                </div>
            </div>
        </>
    }

    const renderAllClassesExport = state.root ? <ApiAllClassesExportComponent classes={state.root.classes}/> : null;
    const renderAllUrlsExport = state.root ? <ApiUrlsComponent classes={state.root.classes}/> : null;
    const renderAllModelsExport = state.root ? <AllModelsExportComponent definitions={state.root.definitions}/> : null;
    const renderAllEnumsExport = state.root ? <AllEnumsExportComponent enums={state.root.enums}/> : null;
    const renderSwagger = () => {
        return state.root && state.root.definitions ? (
            <>
                <SwaggerPanelComponent
                    title="Api"
                    activeTitle={state.selectedPanelTitle}
                    onClick={handleSelectedPanelTitleChange}
                    renderSettings={() =>
                        <div className="col-auto w-25">
                            <Select label="Api class" value={state.selectedApi} onChange={(ev) => {
                                window.localStorage.setItem('selectedApi', ev.target.value);
                                setState({
                                    ...state,
                                    selectedApi: ev.target.value
                                })
                            }} options={dictionary.getClassesOptions(state.root)}/>
                        </div>
                    }
                    renderContent={() =>
                        <>
                            {renderHeaderTitles()}
                            <DemoApiAllClassesComponent classes={selectedApiObjects}/>
                        </>}
                />

                <SwaggerPanelComponent
                    title="Model"
                    activeTitle={state.selectedPanelTitle}
                    onClick={handleSelectedPanelTitleChange}
                    renderSettings={() =>
                        <div className="col-auto w-25">
                            <Select label="Definition" value={state.selectedDefinition}
                                    onChange={(ev) => {
                                        window.localStorage.setItem('selectedDefinition', ev.target.value);
                                        setState({
                                            ...state,
                                            selectedDefinition: ev.target.value
                                        })
                                    }} options={dictionary.getApiDefinitionsOptions(state.root)}/>

                        </div>
                    }
                    renderContent={() =>
                        <>
                            {renderHeaderTitles()}
                            <DemoApiAllModelDefinitionsComponent
                                definitions={selectedDefinitionObjects}/>
                        </>}
                />

                <SwaggerPanelComponent
                    title="Enums"
                    activeTitle={state.selectedPanelTitle}
                    onClick={handleSelectedPanelTitleChange}
                    renderSettings={() =>
                        <div className="col-auto w-25">
                            <Select label="Enum" value={state.selectedEnum} onChange={(ev) => {
                                window.localStorage.setItem('selectedEnum', ev.target.value);
                                setState({
                                    ...state,
                                    selectedEnum: ev.target.value
                                })
                            }} options={dictionary.getEnumOptions(state.root)}/>

                        </div>}
                    renderContent={() =>
                        <>
                            {renderHeaderTitles()}
                            <DemoApiAllEnumsComponent
                                enums={selectedEnumObjects}/>
                        </>}
                />

                <SwaggerPanelComponent
                    title="Path"
                    activeTitle={state.selectedPanelTitle}
                    onClick={handleSelectedPanelTitleChange}
                    renderSettings={() =>
                        <div className="col-auto w-25">
                            <Select label="Path" value={state.selectedPath} onChange={(ev) => {
                                window.localStorage.setItem('selectedPath', ev.target.value);
                                setState({
                                    ...state,
                                    selectedPath: ev.target.value
                                })
                            }} options={dictionary.getPathOptions(state.root)}/>
                        </div>}

                    renderContent={() =>
                        <>
                            {renderHeaderTitles()}<DemoApiAllPathComponent
                            paths={selectedPathsObjects}/>
                        </>}
                />


                <SwaggerPanelComponent
                    title="All APIs exports"
                    renderContent={() => <DiffComponent key={'index.ts'} obj3={renderAllClassesExport}/>}
                    activeTitle={state.selectedPanelTitle} onClick={handleSelectedPanelTitleChange}/>

                <SwaggerPanelComponent
                    title="All models exports"
                    renderContent={() => <DiffComponent obj3={renderAllModelsExport}/>}
                    activeTitle={state.selectedPanelTitle} onClick={handleSelectedPanelTitleChange}/>

                <SwaggerPanelComponent
                    title="All enums exports"
                    renderContent={() => <DiffComponent obj3={renderAllEnumsExport}/>}
                    activeTitle={state.selectedPanelTitle} onClick={handleSelectedPanelTitleChange}/>

                <SwaggerPanelComponent
                    title="Urls"
                    renderContent={() => <DiffComponent obj3={renderAllUrlsExport}/>}
                    activeTitle={state.selectedPanelTitle} onClick={handleSelectedPanelTitleChange}/>
            </>
        ) : null;
    };

    const renderLoader = () =>{
        return <div className="spinner-border text-secondary position-absolute" role="status" style={{left:'50%',top:'50%'}}>
            <span className="sr-only">Loading...</span>
        </div>
    }

    return (
        <div className={'p-2'}>
            {!state.root && renderLoader()}

            {renderHeader()}

            {renderSwagger()}
        </div>
    );
};

