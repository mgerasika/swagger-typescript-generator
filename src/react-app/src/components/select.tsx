import React from "react";

export interface ISelectOption {
    label: string;
    value: string;
}

interface Props {
    label?: string;
    value: string;
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    options: ISelectOption[];
}

export const Select = (props: Props) => {
    const renderOptions = () => {
        const items = props.options.map(item => <option key={item.value} value={item.value}>{item.label}</option>)
        return <>{items}</>
    }
    return <>
        <div className="row">
            {props.label ?
                <>
                    <label htmlFor="staticEmail"
                           className="col-lg-4 col-md-12 col-form-label form-control-sm">{props.label}</label>
                    <div className="col-lg-8 col-md-12">
                        <select className="form-control form-control-sm" id="inlineFormCustomSelect1"
                                value={props.value} onChange={(ev) => {
                            props.onChange(ev as any);
                        }}>
                            {renderOptions()}
                        </select>
                    </div>
                </> : <select className="form-control form-control-sm" id="inlineFormCustomSelect1"
                              value={props.value} onChange={(ev) => {
                    props.onChange(ev as any);
                }}>
                    {renderOptions()}
                </select>}
        </div>
    </>
}