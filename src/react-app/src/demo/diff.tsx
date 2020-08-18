import React, {ReactNode} from 'react';

interface IProps {
    obj1?: object;
    obj2?: object;
    obj3?: ReactNode;
}

export const DiffComponent: React.FC<IProps> = (props) => {
    return !props.obj1 && !props.obj2 ? (
        <div className={'d-flex w-100'}>
            {props.obj3 && <div className={'col-12'}>
                <pre>
                    {props.obj3}
                </pre>
            </div>}
        </div>
    ):(
             <div className={'d-flex w-100'}>
                {props.obj1 && <div className={'col-4'}>
                <pre style={{fontSize:'12px'}}>
                 {JSON.stringify(props.obj1, null, 2)}
                </pre>
                </div>}

                {props.obj2 && <div className={'col-4'}>
                <pre style={{fontSize:'12px'}}>
                    {JSON.stringify(props.obj2, null, 2)}
                </pre>
                </div>}

                {props.obj3 && <div className={'col-4'}>
                <pre style={{fontSize:'12px'}}>
                    {props.obj3}
                </pre>
                </div>}
            </div>
    );
}

