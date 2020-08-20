import React, {useEffect, useMemo, useState} from 'react';
import {DemoAllModelsComponent} from './demo-all-models';
import {DemoAllClassesComponent} from './demo-all-classes';
import {SwaggerDoc} from '../swagger/models/swagger-doc';
import {defaultComponents, ISwaggerComponents} from '../swagger/common/default-components';
import {ISwaggerUtils} from "../swagger/common/swagger-utils";
import {SwaggerAllClassesExportAdapter} from "../swagger/components/api-class";
import {SwaggerAllUrlsComponent} from "../swagger/components/urls";
import {DemoAllEnumsComponent} from "./demo-all-enums";
import {DemoAllPathComponent} from "./demo-all-path";
import {ISwaggerDocConfig} from "../swagger/models";
import {SwaggerPanelComponent} from "../components/swagger-panel";
import {Select} from "../components/select";
import {dictionary} from "../components/dictionary";
import {SwaggerAllEnumsExportAdapter} from "../swagger/components/enum";
import {defaultUtils} from "../swagger/common";
import {DiffSingle} from "./diff-single";
import {SwaggerAllModelsExportAdapter} from "../swagger/components/model";

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
                if(props.createDocumentFactory) {
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
                <Select value={state.url} onChange={(ev) => {
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

    const renderAllClassesExport = state.root ?
        <SwaggerAllClassesExportAdapter doc={state.root} swaggerClasses={state.root.classes}/> : null;
    const renderAllUrlsExport = state.root ? <SwaggerAllUrlsComponent doc={state.root} classes={state.root.classes}/> : null;
    const renderAllModelsExport = state.root ?
        <SwaggerAllModelsExportAdapter doc={state.root} models={state.root.definitions}/> : null;
    const renderAllEnumsExport = state.root ?
        <SwaggerAllEnumsExportAdapter doc={state.root} enums={state.root.enums}/> : null;
    const renderSwagger = () => {
        return state.root && state.root.definitions ? (
            <>
                <SwaggerPanelComponent
                    title="Api"
                    activeTitle={state.selectedPanelTitle}
                    onClick={handleSelectedPanelTitleChange}
                    renderSettings={() =>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <Select label="Api class" value={state.selectedApi} onChange={(ev) => {
                                    window.localStorage.setItem('selectedApi', ev.target.value);
                                    setState({
                                        ...state,
                                        selectedApi: ev.target.value
                                    })
                                }} options={dictionary.getClassesOptions(state.root)}/>
                            </div>
                        </div>
                    }
                    renderContent={() =>
                        <>
                            <DemoAllClassesComponent classes={selectedApiObjects}/>
                        </>}
                />

                <SwaggerPanelComponent
                    title="Model"
                    activeTitle={state.selectedPanelTitle}
                    onClick={handleSelectedPanelTitleChange}
                    renderSettings={() =>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <Select label="Definition" value={state.selectedDefinition}
                                        onChange={(ev) => {
                                            window.localStorage.setItem('selectedDefinition', ev.target.value);
                                            setState({
                                                ...state,
                                                selectedDefinition: ev.target.value
                                            })
                                        }} options={dictionary.getApiDefinitionsOptions(state.root)}/>

                            </div>
                        </div>
                    }
                    renderContent={() =>
                        <>
                            <DemoAllModelsComponent
                                definitions={selectedDefinitionObjects}/>
                        </>}
                />

                <SwaggerPanelComponent
                    title="Enums"
                    activeTitle={state.selectedPanelTitle}
                    onClick={handleSelectedPanelTitleChange}
                    renderSettings={() =>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <Select label="Enum" value={state.selectedEnum} onChange={(ev) => {
                                    window.localStorage.setItem('selectedEnum', ev.target.value);
                                    setState({
                                        ...state,
                                        selectedEnum: ev.target.value
                                    })
                                }} options={dictionary.getEnumOptions(state.root)}/>
                            </div>
                        </div>}
                    renderContent={() =>
                        <>
                            <DemoAllEnumsComponent
                                enums={selectedEnumObjects}/>
                        </>}
                />

                <SwaggerPanelComponent
                    title="Path"
                    activeTitle={state.selectedPanelTitle}
                    onClick={handleSelectedPanelTitleChange}
                    renderSettings={() =>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <Select label="Path" value={state.selectedPath} onChange={(ev) => {
                                    window.localStorage.setItem('selectedPath', ev.target.value);
                                    setState({
                                        ...state,
                                        selectedPath: ev.target.value
                                    })
                                }} options={dictionary.getPathOptions(state.root)}/>
                            </div>
                        </div>}

                    renderContent={() =>
                        <>
                            <DemoAllPathComponent
                                paths={selectedPathsObjects}/>
                        </>}
                />


                <SwaggerPanelComponent
                    title="All APIs exports"
                    renderContent={() => <DiffSingle key={'index.ts'} obj={renderAllClassesExport}/>}
                    activeTitle={state.selectedPanelTitle} onClick={handleSelectedPanelTitleChange}/>

                <SwaggerPanelComponent
                    title="All models exports"
                    renderContent={() => <DiffSingle obj={renderAllModelsExport}/>}
                    activeTitle={state.selectedPanelTitle} onClick={handleSelectedPanelTitleChange}/>

                <SwaggerPanelComponent
                    title="All enums exports"
                    renderContent={() => <DiffSingle obj={renderAllEnumsExport}/>}
                    activeTitle={state.selectedPanelTitle} onClick={handleSelectedPanelTitleChange}/>

                <SwaggerPanelComponent
                    title="Urls"
                    renderContent={() => <DiffSingle obj={renderAllUrlsExport}/>}
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

