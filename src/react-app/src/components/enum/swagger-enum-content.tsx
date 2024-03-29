import React from 'react';
import { SwaggerEnum } from '../../swagger';
import { renderTabSymbol } from '../namespace';
import { SwaggerEnumFieldAdapter } from './swagger-enum-field';

interface IProps {
    swaggerEnum: SwaggerEnum;
    tabCount?: number;
}

export interface IEnumField {
    name: string;
    value: string;
}

export interface ISwaggerEnumContentProps extends IProps {}

export const SwaggerEnumContentAdapter: React.FC<ISwaggerEnumContentProps> = (props) => {
    const fields: IEnumField[] = (props.swaggerEnum.enumValues || []).map(
        (enumKey: string, idx) => {
            return {
                name: enumKey,
                value: enumKey,
            } as IEnumField;
        },
    );

    const { swaggerEnum } = props;

    const renderFields = (tabCount: number) =>
        fields.map((field: IEnumField, idx) => {
            const separator = (props.swaggerEnum.enumValues || []).length > idx + 1 ? ',' : null;
            return (
                <span key={field.name}>
                    {renderTabSymbol(tabCount)}
                    <SwaggerEnumFieldAdapter enumField={field} swaggerEnum={swaggerEnum} />
                    {separator}
                    {'\n'}
                </span>
            );
        });

    const renderEnum = (tabCount: number) => (
        <>
            {renderTabSymbol(tabCount)}export enum {swaggerEnum.name} {' {'} {'\n'}
            {renderFields(tabCount + 1)}
            {renderTabSymbol(tabCount)}
            {'}\n'}
        </>
    );

    return (
        <>
            {/*<Comment commment={'This enum used into:' + swaggerEnum.duplicateNamespaces?.join(',')} />*/}
            {renderEnum(props.tabCount || 0)}
        </>
    );
};
