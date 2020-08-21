import React from 'react';
import {SwaggerEnum} from "../../models/swagger-enum";
import {Namespace, renderTabSymbol} from "../../namespace";

interface IProps {
    swaggerEnum: SwaggerEnum;
}

export const SwaggerEnumContent: React.FC<IProps> = (props) => {
    const {swaggerEnum} = props;

    const renderFields = (tabCount:number) => (props.swaggerEnum.values || []).map((p: string, idx) => {
        const separator = (props.swaggerEnum.values || []).length > idx + 1 ? ',' : null;
        return (<span key={p}>{renderTabSymbol(tabCount)}'{p}' = {idx}{separator}{'\n'}</span>);
    });

    const renderEnum = (tabCount:number) => <>
        enum {swaggerEnum.name} {' {'} {'\n'}
        {renderFields(tabCount+1)}
        {renderTabSymbol(tabCount)}{'}\n'}</>

    const renderEnumIntoNamespaces = () => {
            return <Namespace name={swaggerEnum.namespace as string} >
                {renderEnum(1)}
            </Namespace>
    }
    return (
        <>
            {/*<Comment commment={'This enum used into:' + swaggerEnum.duplicateNamespaces?.join(',')} />*/}
            {swaggerEnum.namespace ? renderEnumIntoNamespaces() : renderEnum(0)}
        </>
    );
};