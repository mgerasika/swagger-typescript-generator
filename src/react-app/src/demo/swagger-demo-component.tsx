import React, {useEffect, useMemo, useState} from 'react';
import {DemoAllModelsComponent} from './demo-all-models';
import {DemoAllClassesComponent} from './demo-all-classes';
import {SwaggerDoc} from '../swagger/models/swagger-doc';
import {defaultComponents, ISwaggerComponents} from '../swagger/common/default-components';
import {SwaggerAllClassesExportAdapter} from "../swagger/components/api-class";
import {SwaggerAllUrlsComponent2} from "../swagger/components/urls";
import {DemoAllEnumsComponent} from "./demo-all-enums";
import {DemoAllPathComponent} from "./demo-all-path";
import {ISwaggerDocConfig} from "../swagger/models";
import {BootstrapPanel} from "../components/bootstrap-panel";
import {BootstrapSelect} from "../components/bootstrap-select";
import {dictionary} from "../components/dictionary";
import {SwaggerAllEnumsExportAdapter} from "../swagger/components/enum";
import {defaultUtils, ISwaggerUtils} from "../swagger/common";
import {DiffSingle} from "./diff-single";
import {SwaggerAllModelsExportAdapter} from "../swagger/components/model";
import {SwaggerAllInOneFileAdapter} from "../swagger/components";
import {verify} from "crypto";

const axios = require('axios');

interface IProps {
    apiUrls: string[];
    createComponentsFactory?: (baseComponents: ISwaggerComponents) => ISwaggerComponents;
    createDocumentFactory?: (baseDoc: SwaggerDoc) => SwaggerDoc;
    createUtilsFactory?: (baseUtils: ISwaggerUtils) => ISwaggerUtils;
}

interface IState {
    url: string;
    selectedApi: string;
    selectedPath: string;
    selectedDefinition: string;
    selectedEnum: string;
    root?: SwaggerDoc;
    selectedPanelTitle: string;
}

export const SwaggerDemoComponent: React.FC<IProps> = (props) => {
    const [state, setState] = useState<IState>({
        url: window.localStorage.getItem('url') ? window.localStorage.getItem('url') as string : props.apiUrls.length ? props.apiUrls[0] : 'https://petstore.swagger.io/v2/swagger.json',
        selectedApi: window.localStorage.getItem('selectedApi') || '',
        selectedPath: window.localStorage.getItem('selectedPath') || '',
        selectedDefinition: window.localStorage.getItem('selectedDefinition') || '',
        selectedEnum: window.localStorage.getItem('selectedEnum') || '',
        selectedPanelTitle: window.localStorage.getItem('selectedPanelTitle') || 'Api',
    });

    const loadSwagger = () => {
        axios.get(state.url)
            .then((response: any) => {
                const utils = props.createUtilsFactory ? props.createUtilsFactory(defaultUtils) : defaultUtils;
                const config: ISwaggerDocConfig = {
                    apiUrl: state.url,
                    source: response.data,
                    modelImportPath: '../api-model',
                    enumImportPath: '../api-enum',
                    showPrivateFieldsForDebug: false,
                };
                const plugin = props.createComponentsFactory ? props.createComponentsFactory(defaultComponents) : defaultComponents;
                let doc = new SwaggerDoc(config, utils, plugin);
                if (props.createDocumentFactory) {
                    doc = props.createDocumentFactory(doc);
                    doc.init();
                }
                setState({
                    ...state,
                    root: doc
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

    const selectedApiObject = useMemo(() => {
        if (state.root && state.selectedApi === 'ALL') {
            return state.root.classes;
        }
        return state.root ? state.root.classes.filter(c => c.name === state.selectedApi) : [];
    }, [state.root, state.selectedApi])

    const selectedDefinitionObject = useMemo(() => {
        if (state.root && state.selectedDefinition === 'ALL') {
            return state.root.definitions;
        }
        return state.root ? state.root.definitions.filter(c => c.name === state.selectedDefinition) : [];
    }, [state.root, state.selectedDefinition])

    const selectedEnumObject = useMemo(() => {
        if (state.root && state.selectedEnum === 'ALL') {
            return state.root.enums;
        }
        return state.root ? state.root.enums.filter(c => c.fullName === state.selectedEnum) : [];
    }, [state.root, state.selectedEnum])

    const selectedPathsObject = useMemo(() => {
        if (state.root && state.selectedPath === 'ALL') {
            return state.root.paths;
        }
        return state.root ? state.root.paths.filter(c => c.name === state.selectedPath) : [];
    }, [state.root, state.selectedPath])


    const handleSelectedPanelTitleChange = (t: string) => {
        window.localStorage.setItem('selectedPanelTitle', t);
        setState({
            ...state,
            selectedPanelTitle: t
        })
    }
    const renderHeader = () => {
        return <div className="row mb-2" style={{width: '99%'}}>
            <div className="col-sm-12 col-md-5 col-lg-3">
                    <pre style={{textAlign: 'left', lineHeight: '28px'}} className="m-0 p-0">
                        <a href="https://github.com/mgerasika/swagger-typescript-generator">swagger-typescript-generator</a>
                    </pre>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-8 ml-3">
                <BootstrapSelect value={state.url} onChange={(ev) => {
                    window.localStorage.setItem('url', ev.target.value);
                    setState({
                        ...state,
                        root: undefined,
                        url: ev.target.value
                    })
                }} options={dictionary.getUrlOptions(props.apiUrls)}/>
            </div>
        </div>
    }


    const renderSwagger = () => {
        const {root} = state;
        return root ? (
            <>
                <BootstrapPanel
                    title="Api"
                    activeTitle={state.selectedPanelTitle}
                    onClick={handleSelectedPanelTitleChange}
                    renderSettings={() =>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <BootstrapSelect
                                    label="Api class"
                                    value={state.selectedApi}
                                    onChange={(ev) => {
                                    window.localStorage.setItem('selectedApi', ev.target.value);
                                    setState({
                                        ...state,
                                        selectedApi: ev.target.value
                                    })
                                }} options={dictionary.getClassesOptions(state.root)}/>
                            </div>
                        </div>
                    }
                    renderContent={() => <DemoAllClassesComponent classes={selectedApiObject}/>}
                />

                <BootstrapPanel
                    title="Model"
                    activeTitle={state.selectedPanelTitle}
                    onClick={handleSelectedPanelTitleChange}
                    renderSettings={() =>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <BootstrapSelect
                                    label="Definition"
                                    value={state.selectedDefinition}
                                    onChange={(ev) => {
                                        window.localStorage.setItem('selectedDefinition', ev.target.value);
                                        setState({
                                            ...state,
                                            selectedDefinition: ev.target.value
                                        })
                                    }} options={dictionary.getModelOptions(state.root)}/>

                            </div>
                        </div>
                    }
                    renderContent={() =>  <DemoAllModelsComponent  definitions={selectedDefinitionObject}/>}
                />

                <BootstrapPanel
                    title="Enums"
                    activeTitle={state.selectedPanelTitle}
                    onClick={handleSelectedPanelTitleChange}
                    renderSettings={() =>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <BootstrapSelect
                                    label="Enum"
                                    value={state.selectedEnum}
                                    onChange={(ev) => {
                                    window.localStorage.setItem('selectedEnum', ev.target.value);
                                    setState({
                                        ...state,
                                        selectedEnum: ev.target.value
                                    })
                                }} options={dictionary.getEnumOptions(state.root)}/>
                            </div>
                        </div>}
                    renderContent={() => <DemoAllEnumsComponent enums={selectedEnumObject}/>}
                />

                <BootstrapPanel
                    title="Path"
                    activeTitle={state.selectedPanelTitle}
                    onClick={handleSelectedPanelTitleChange}
                    renderSettings={() =>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <BootstrapSelect label="Path" value={state.selectedPath} onChange={(ev) => {
                                    window.localStorage.setItem('selectedPath', ev.target.value);
                                    setState({
                                        ...state,
                                        selectedPath: ev.target.value
                                    })
                                }} options={dictionary.getPathOptions(state.root)}/>
                            </div>
                        </div>}

                    renderContent={() => <DemoAllPathComponent  paths={selectedPathsObject}/>}
                />

                <BootstrapPanel
                    title="All in one file"
                    renderContent={() => <DiffSingle key={'index.ts'}
                                                     obj={<SwaggerAllInOneFileAdapter doc={root}/>}/>}
                    activeTitle={state.selectedPanelTitle} onClick={handleSelectedPanelTitleChange}/>

                <BootstrapPanel
                    title="All APIs exports"
                    renderContent={() => <DiffSingle key={'index.ts'}
                                                     obj={<SwaggerAllClassesExportAdapter doc={root}
                                                                                          swaggerClasses={root.classes}/>}/>}
                    activeTitle={state.selectedPanelTitle} onClick={handleSelectedPanelTitleChange}/>

                <BootstrapPanel
                    title="All models exports"
                    renderContent={() => <DiffSingle
                        obj={<SwaggerAllModelsExportAdapter doc={root} models={root.definitions}/>}/>}
                    activeTitle={state.selectedPanelTitle} onClick={handleSelectedPanelTitleChange}/>

                <BootstrapPanel
                    title="All enums exports"
                    renderContent={() => <DiffSingle
                        obj={<SwaggerAllEnumsExportAdapter doc={root} enums={root.enums}/>}/>}
                    activeTitle={state.selectedPanelTitle} onClick={handleSelectedPanelTitleChange}/>

                <BootstrapPanel
                    title="Urls"
                    renderContent={() => <DiffSingle
                        obj={<SwaggerAllUrlsComponent2 doc={root} classes={root.classes}/>}/>}
                    activeTitle={state.selectedPanelTitle} onClick={handleSelectedPanelTitleChange}/>
            </>
        ) : null;
    };


    const renderLoader = () => {
        return <div className="spinner-border text-secondary position-absolute" role="status"
                    style={{left: '50%', top: '50%'}}>
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

