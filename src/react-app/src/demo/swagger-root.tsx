import React, {useEffect, useMemo, useState} from 'react';
import {ApiAllModelDefinitionsComponent} from './api-all-models-definitions';
import {ApiAllClassesComponent} from './api-all-classes';
import {SwaggerDocModel} from '../swagger/model/swagger-doc-model';
import {ISwaggerPlugin} from '../swagger/common/default-plugin';
import {ISwaggerUtils} from "../swagger/common/swagger-utils";
import {createCustomUtilsFactory} from "./custom-utils";
import {DiffComponent} from "./diff";
import {ApiAllClassesExportComponent} from "../swagger/components/api-class";
import {ApiUrlsComponent} from "../swagger/components/urls";
import {AllModelsExportComponent} from "../swagger/components/definitions";
import {ApiAllEnumsComponent} from "./api-all-enums";
import {ApiAllPathComponent} from "./api-all-path";
import {ISwaggerDocModelConfig} from "../swagger/model";
import {hydrate} from "react-dom";
import {SwaggerPanelComponent} from "./swagger-panel";

const axios = require('axios');

interface IProps {
    plugin: ISwaggerPlugin;
    createCustomUtilsFactory: (baseUtils: ISwaggerUtils) => ISwaggerUtils;
}

const compareFn = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)

interface ISelectItem {
    name: string;
    value: string;
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
        selectedPanelTitle: window.localStorage.getItem('selectedPanelTitle') || '',
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
    const onExploreClick = () => {
        loadSwagger();
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

    const renderAllClassesExport = state.root ? <ApiAllClassesExportComponent classes={state.root.classes}/> : null;
    const renderAllUrlsExport = state.root ? <ApiUrlsComponent classes={state.root.classes}/> : null;
    const renderAllModelsExport = state.root ? <AllModelsExportComponent definitions={state.root.definitions}/> : null;

    const renderHeaderTitles = () => {
        return <div className={'d-flex w-100'}>
            <div className={'col-4'}>
                <label>Swagger</label>
            </div>
            <div className={'col-4'}>
                <label>Transformed</label>
            </div>

            <div className={'col-4'}>
                <label>Typescript</label>
            </div>
        </div>
    }
    const handleSelectdPanelTitleChange = (t: string) => {
        setState({
            ...state,
            selectedPanelTitle: t
        })
    }
    const renderHeader = () => {
        const h6Style = {marginBottom: 0, lineHeight: '28px', width: '200px'};
        const selectStyle = {width: '200px'};
        return <>
            <div className="form-row align-items-center">
                <div className="col-auto my-1 w-100">
                    <label className="mr-sm-2" htmlFor="inlineFormCustomSelect1">Url:</label>
                    <select className="form-control" id="inlineFormCustomSelect1" value={state.url} onChange={(ev) => {
                        window.localStorage.setItem('url', ev.target.value);
                        setState({
                            ...state,
                            url: ev.target.value
                        })
                    }}>
                        {renderUrlOptions()}
                    </select>
                </div>
            </div>
        </>
    }

    const renderSwagger = () => {
        return state.root && state.root.definitions ? (
            <>
                <SwaggerPanelComponent title="Path"
                                       renderSettings={() =>
                                           <div className="col-auto my-1 w-25">
                                               <label className="mr-sm-2"
                                                      htmlFor="inlineFormCustomSelect1">Path:</label>
                                               <select className="form-control" id="inlineFormCustomSelect1"
                                                       value={state.selectedPath}
                                                       onChange={(ev) => {
                                                           window.localStorage.setItem('selectedPath', ev.target.value);
                                                           setState({
                                                               ...state,
                                                               selectedPath: ev.target.value
                                                           })
                                                       }}>
                                                   <option value='ALL'>ALL</option>
                                                   <option value=''></option>
                                                   {renderPathOptions()}
                                               </select>
                                           </div>}

                                       renderContent={() => <>{renderHeaderTitles()}<ApiAllPathComponent
                                           paths={selectedPathsObjects}/></>} activeTitle={state.selectedPanelTitle}
                                       onClick={handleSelectdPanelTitleChange}/>

                <SwaggerPanelComponent
                    renderSettings={() => <div className="col-auto my-1 w-25">
                        <label className="mr-sm-2" htmlFor="inlineFormCustomSelect1">Api class:</label>
                        <select className="form-control" id="inlineFormCustomSelect1" value={state.selectedApi}
                                onChange={(ev) => {
                                    window.localStorage.setItem('selectedApi', ev.target.value);
                                    setState({
                                        ...state,
                                        selectedApi: ev.target.value
                                    })
                                }}>
                            <option value='ALL'>ALL</option>
                            <option value=''></option>
                            {renderApiMethodOptions()}
                        </select>
                    </div>}
                    title="Api" renderContent={() => <>{renderHeaderTitles()}
                    <ApiAllClassesComponent classes={selectedApiObjects}/></>} activeTitle={state.selectedPanelTitle}
                    onClick={handleSelectdPanelTitleChange}/>

                <SwaggerPanelComponent title="Model"
                                       renderSettings={() => <div className="col-auto my-1 w-25">
                                           <label className="mr-sm-2"
                                                  htmlFor="inlineFormCustomSelect1">Definition:</label>
                                           <select className="form-control" id="inlineFormCustomSelect1"
                                                   value={state.selectedDefinition}
                                                   onChange={(ev) => {
                                                       window.localStorage.setItem('selectedDefinition', ev.target.value);
                                                       setState({
                                                           ...state,
                                                           selectedDefinition: ev.target.value
                                                       })
                                                   }}>
                                               <option value='ALL'>ALL</option>
                                               <option value=''></option>
                                               {renderApiDefinitionsOptions()}
                                           </select>
                                       </div>
                                       }
                                       renderContent={() => <>{renderHeaderTitles()}<ApiAllModelDefinitionsComponent
                                           definitions={selectedDefinitionObjects}/></>}
                                       activeTitle={state.selectedPanelTitle} onClick={handleSelectdPanelTitleChange}/>

                <SwaggerPanelComponent
                    renderSettings={() => <div className="col-auto my-1 w-25">
                        <label className="mr-sm-2" htmlFor="inlineFormCustomSelect1">Enum:</label>
                        <select className="form-control" id="inlineFormCustomSelect1" value={state.selectedEnum}
                                onChange={(ev) => {
                                    window.localStorage.setItem('selectedEnum', ev.target.value);
                                    setState({
                                        ...state,
                                        selectedEnum: ev.target.value
                                    })
                                }}>
                            <option value='ALL'>ALL</option>
                            <option value=''></option>
                            {renderEnumOptions()}
                        </select>
                    </div>}
                    title="Enums" renderContent={() => <>{renderHeaderTitles()}<ApiAllEnumsComponent
                    enums={selectedEnumObjects}/></>} activeTitle={state.selectedPanelTitle}
                    onClick={handleSelectdPanelTitleChange}/>


                <SwaggerPanelComponent title="All APIs exports" renderContent={() => <DiffComponent key={'index.ts'}
                                                                                                    obj3={renderAllClassesExport}/>}
                                       activeTitle={state.selectedPanelTitle} onClick={handleSelectdPanelTitleChange}/>

                <SwaggerPanelComponent title="All definitions exports"
                                       renderContent={() => <DiffComponent obj3={renderAllModelsExport}/>}
                                       activeTitle={state.selectedPanelTitle} onClick={handleSelectdPanelTitleChange}/>

                <SwaggerPanelComponent title="Urls" renderContent={() => <DiffComponent obj3={renderAllUrlsExport}/>}
                                       activeTitle={state.selectedPanelTitle} onClick={handleSelectdPanelTitleChange}/>
            </>
        ) : null;
    };

    const renderApiMethodOptions = () => {
        if (!state.root) {
            return null;
        }
        const items = state.root.classes.sort((a, b) => compareFn(a.name, b.name)).map(item => <option key={item.name}
                                                                                                       value={item.name}>{item.name}</option>)
        return <>{items}</>
    }

    const renderUrlOptions = () => {
        const items = apiUrls.map(item => <option key={item} value={item}>{item}</option>)
        return <>{items}</>
    }

    const renderApiDefinitionsOptions = () => {
        if (!state.root) {
            return null;
        }
        const items = state.root.definitions.sort((a, b) => compareFn(a.name, b.name)).map(item =>
            <option key={item.name} value={item.name}>{item.name}</option>)
        return <>{items}</>
    }

    const renderEnumOptions = () => {
        if (!state.root) {
            return null;
        }
        const items = state.root.enums.sort((a, b) => compareFn(a.name, b.name)).map((item, idx) =>
            <option key={`${item.name}_${idx}`} value={item.name}>{item.name}</option>)
        return <>{items}</>
    }

    const renderPathOptions = () => {
        if (!state.root) {
            return null;
        }
        const items = state.root.paths.sort((a, b) => compareFn(a.name, b.name)).map((item, idx) =>
            <option key={`${item.name}_${idx}`} value={item.name}>{item.name}</option>)
        return <>{items}</>
    }


    return (
        <div className={'p-2'}>
            {renderHeader()}

            {renderSwagger()}
        </div>
    );
};

