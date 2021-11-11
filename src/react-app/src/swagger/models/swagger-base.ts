import { SwaggerDoc } from './swagger-doc';
import { ISwaggerDocConfig } from './swagger-doc-config';
import { SwaggerBasePrivateProps } from './swagger-base-private-props';
import { ObjectEx } from './object-ex';

export abstract class SwaggerBase<
    TParent,
    TPrivateProps extends SwaggerBasePrivateProps<TParent>,
> extends ObjectEx<TPrivateProps> {
    init() {}

    public get utils() {
        return this.doc.utils;
    }

    public get doc(): SwaggerDoc {
        return (this.parent as any).doc;
    }

    public get config(): ISwaggerDocConfig {
        return this.doc.config;
    }

    public get source() {
        return this.getPrivate('_source');
    }

    public set source(val) {
        this.setPrivate('_source', val);
    }

    public get parent(): TParent {
        return this.getPrivate('_parent');
    }

    public set parent(val) {
        this.setPrivate('_parent', val);
    }
}
