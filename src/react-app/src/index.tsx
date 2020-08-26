import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {App} from "./App";
import {dependencyInjection} from "./common-client-only/dependency-injection";
import {IRequestService} from "./common-client-only/request-service";
import {IUtilsService, UtilsService} from "./common-client-only/utils-service";
import {RequestService} from "./swagger/common";

dependencyInjection.use<IRequestService>('IRequestService', () => new RequestService())
dependencyInjection.use<IUtilsService>('IUtilsService', () => new UtilsService())
ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
