export type SwaggerBasePrivateProps<TParent> = {
    _parent: TParent;
    _source: any;
} & ObjectPrivateProps;

export type ObjectPrivateProps = {
    uniqueID:string;
}