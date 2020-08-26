import React from 'react';
import {SwaggerEnum} from "../../models/swagger-enum";
import {Namespace, renderTabSymbol} from "../../namespace";

interface IProps {
    swaggerEnum: SwaggerEnum;
    tabCount?:number;
}

export const SwaggerEnumContent: React.FC<IProps> = (props) => {
    const {swaggerEnum} = props;

    const renderFields = (tabCount: number) => (props.swaggerEnum.enumValues || []).map((enumKey: string, idx) => {
        const separator = (props.swaggerEnum.enumValues || []).length > idx + 1 ? ',' : null;
        return (<span key={enumKey}>{renderTabSymbol(tabCount)}{enumKey} = {'<any>'}'{enumKey}'{separator}{'\n'}</span>);
    });

    const renderEnum = (tabCount: number) => <>
        {renderTabSymbol(tabCount)}export enum {swaggerEnum.name} {' {'} {'\n'}
        {renderFields(tabCount + 1)}
        {renderTabSymbol(tabCount)}{'}\n'}</>


    return (
        <>
            {/*<Comment commment={'This enum used into:' + swaggerEnum.duplicateNamespaces?.join(',')} />*/}
            {renderEnum( props.tabCount || 0)}
        </>
    );
};