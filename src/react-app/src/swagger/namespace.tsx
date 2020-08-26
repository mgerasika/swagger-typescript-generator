import React, {ReactNode} from "react";

interface IProps {
    name: string;
    children: ReactNode;
}

export const renderTabSymbol = (count: number) => {
    const result = Array.from(Array(count).keys()).map((_, idx) => <React.Fragment key={idx}>{'\t'}</React.Fragment>)
    return <>{result}</>
}
export const Namespace = (props: IProps) => {
    return <>
        export namespace {props.name}
        {' {'} {'\n\t'}{props.children}
        {'}\n'}</>
}