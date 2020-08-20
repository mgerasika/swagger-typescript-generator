import React, {useEffect, useRef} from "react";

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
    const ref = useRef<any>();
    const renderOptions = () => {
        const items = props.options.map(item => <option key={item.value} value={item.value}>{item.label}</option>)
        return <>{items}</>
    }

    useEffect(() => {
        ref.current.value = props.value;
    }, [props.value]);
    return <>
        <div className="row">
            {props.label ?
                <>
                    <label
                        className="col-lg-4 col-md-12 col-form-label form-control-sm">{props.label}
                    </label>
                    <div className="col-lg-8 col-md-12">

                        <select ref={ref} className="form-control form-control-sm"
                                value={props.value} onChange={(ev) => {
                            props.onChange(ev as any);
                        }}>
                            {renderOptions()}
                        </select>
                    </div>
                </>
                : <select ref={ref} className="form-control form-control-sm"
                          value={props.value} onChange={(ev) => {
                    props.onChange(ev as any);
                }}>
                    {renderOptions()}
                </select>}
        </div>
    </>
}