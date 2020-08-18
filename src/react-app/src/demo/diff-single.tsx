import React, {ReactNode} from 'react';

interface IProps {
    obj: ReactNode;
}

export const DiffSingle: React.FC<IProps> = (props) => {
   return (
        <div className={'d-flex w-100'}>
            {props.obj && <div className={'col-12'}>
                <pre>
                    {props.obj}
                </pre>
            </div>}
        </div>
    )
}


