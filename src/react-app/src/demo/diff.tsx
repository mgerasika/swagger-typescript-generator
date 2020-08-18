import React, {ReactNode} from 'react';

interface IProps {
    obj1: object;
    obj2: object;
    obj3: ReactNode;
}

export const DiffComponent: React.FC<IProps> = (props) => {
    return <div className={'row'}>
        <div className={'col-md-4 col-sm-12'}>
            <div className="form-control-sm pl-0"><code>Swagger</code></div>
                <pre style={{fontSize: '12px'}}>
                 {JSON.stringify(props.obj1, null, 2)}
                </pre>
        </div>

        <div className={'col-md-4 col-sm-12'}>
            <div className="sm pl-0"><code>Transformed</code></div>
                <pre style={{fontSize: '12px'}}>
                    {JSON.stringify(props.obj2, null, 2)}
                </pre>
        </div>

        <div className={'col-md-4 col-sm-12'}>
            <div className="form-control-sm pl-0"><code>Typescript</code></div>
                <pre style={{fontSize: '12px'}}>
                    {props.obj3}
                </pre>
        </div>
    </div>
}

