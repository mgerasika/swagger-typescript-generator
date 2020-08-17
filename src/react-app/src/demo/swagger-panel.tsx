import React, {ReactNode, useEffect, useMemo, useState} from 'react';
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

const axios = require('axios');

interface IProps {
    title:string;
    activeTitle:string;
    onClick:(name:string) =>void;
    renderSettings?:()=>ReactNode;
    renderContent:()=>ReactNode;
}

export const SwaggerPanelComponent: React.FC<IProps> = (props) => {
    return  <div className="card mb-1" style={{cursor:'pointer'}}>
        <div  className="card-header py-1" id="headingOne" onClick={() => {
            if(props.title !== props.activeTitle) {
                props.onClick(props.title)
            }
            else {
                props.onClick('');
            }

        }} >
            <label>{props.title}</label>
        </div>

        {props.title === props.activeTitle ? <div className="collapse show" >
            <div className="card-body">
                {props.renderSettings?  <>{props.renderSettings()}<hr/></> : null}

                {props.renderContent()}
            </div>
        </div> : null}
    </div>


};

