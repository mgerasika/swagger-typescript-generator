import React from 'react';

interface IProps {
    commment: string;
}

export const Comment = (props: IProps) => {
    return <>{'/* '}{props.commment}{'*/\n'}</>;
}