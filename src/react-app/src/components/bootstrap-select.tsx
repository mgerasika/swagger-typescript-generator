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

export const BootstrapSelect = (props: Props) => {
    const renderOptions = () => {
        const items = props.options.map((item, idx) =>
            <option key={`${item.value}${idx}`}
                    value={item.value}>{item.label}</option>)
        return <>{items}</>
    }

    return <>
        <code>{props.label}</code>
        <div style={{paddingBottom: '4px'}}>
            <div className="row">
                {props.label ?
                    <>
                        <div className="col-lg-8 col-md-12">
                            <select className="form-control form-control-sm"
                                    value={props.value}
                                    onChange={(ev) => {
                                        props.onChange(ev as any);
                                    }}>
                                {renderOptions()}
                            </select>
                        </div>
                    </>
                    : <select className="form-control form-control-sm"
                              value={props.value} onChange={(ev) => {
                        props.onChange(ev as any);
                    }}>
                        {renderOptions()}
                    </select>}
            </div>
        </div>
    </>
}