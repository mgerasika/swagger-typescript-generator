import React, {ReactNode} from 'react';

interface IProps {
    obj1: object;
    obj2: object;
    obj3: ReactNode;
}

const Diff: React.FC<IProps> = (props) => {
    return (
        <>
            <div className={'d-flex w-100'}>
                <div className={'col-4'}>
                <pre>
                 {JSON.stringify(props.obj1, null, 4)}
                </pre>
                </div>
                <div className={'col-4'}>
                <pre>
                    {JSON.stringify(props.obj2, null, 4)}
                </pre>
                </div>

                <div className={'col-4'}>
                <pre>
                    {props.obj3}
                </pre>
                </div>
            </div>
        </>
    );
}

export default Diff;


