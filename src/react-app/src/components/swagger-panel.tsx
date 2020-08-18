import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import {DemoApiAllModelDefinitionsComponent} from '../demo/api-all-models-definitions';
import {DemoApiAllClassesComponent} from '../demo/api-all-classes';
import {SwaggerDocModel} from '../swagger/model/swagger-doc-model';
import {ISwaggerPlugin} from '../swagger/common/default-plugin';
import {ISwaggerUtils} from "../swagger/common/swagger-utils";
import {createCustomUtilsFactory} from "../demo/custom-utils";
import {DiffComponent} from "../demo/diff";
import {ApiAllClassesExportComponent} from "../swagger/components/api-class";
import {ApiUrlsComponent} from "../swagger/components/urls";
import {AllModelsExportComponent} from "../swagger/components/definitions";
import {DemoApiAllEnumsComponent} from "../demo/api-all-enums";
import {DemoApiAllPathComponent} from "../demo/api-all-path";
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
    const isExpanded = props.title === props.activeTitle;
    return  <div className="card mb-1" style={{cursor:'pointer'}}>
        <div  className="card-header py-1" id="headingOne" onClick={() => {
            if(props.title !== props.activeTitle) {
                props.onClick(props.title)
            }
            else {
                props.onClick('');
            }

        }} >
            <div className="form-control-sm py-0 px-0" style={{height:'auto'}}>{props.title}

            <div style={{float:'right'}}>
                {isExpanded ? <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down" fill="currentColor"
                                   xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg> :
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-right" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg> }
            </div>
            </div>
        </div>

        {isExpanded ? <div className="collapse show" >
            <div className="card-body">
                {props.renderSettings?  <>{props.renderSettings()}<hr/></> : null}

                {props.renderContent()}
            </div>
        </div> : null}
    </div>


};

