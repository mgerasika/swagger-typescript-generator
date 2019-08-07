import React, {useEffect, useState} from 'react';
import Definitions from "./definitions";
import ApiClasses from "./api-classes";
import {SwaggerDoc} from "../model/swagger-doc";
import {ISwaggerPlugin} from "../common/swagger-plugins";
import {ISwaggerContextProps, SwaggerContext} from "../common/swagger-context";

const axios = require('axios');

interface IProps {
    plugins: ISwaggerPlugin[];
}

const Swagger: React.FC<IProps> = (props) => {
    const [url, setUrl] = useState("http://192.168.1.72:84/swagger/docs/v1");
    const [root, setRoot] = useState<SwaggerDoc>();

    const loadSwagger = () => {
        axios.get(url, {headers: {'Access-Control-Allow-Origin': 'http://localhost:3000/'}})
            .then((response: any) => {
                setRoot(new SwaggerDoc(response.data));
            })
            .catch((error: string) => {
                console.log(error);
            });
    }
    const onExploreClick = () => {
        loadSwagger();
    }

    useEffect(() => {
        if (!root) {
            loadSwagger();
        }
    })

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
                <ApiClasses paths={root.classes}/>

                <hr/>
                <Definitions definitions={root.definitions}/>
            </>
        ) : null;
    }

    const getContextValue = (): ISwaggerContextProps => {
        return {
            plugins: props.plugins
        }
    }

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
    )
}

export default Swagger;


