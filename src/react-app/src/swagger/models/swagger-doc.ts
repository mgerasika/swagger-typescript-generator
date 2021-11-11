import { ISwaggerModel, SwaggerModel } from './swagger-model';
import { ISwaggerClass, SwaggerClass } from './swagger-class';
import { defaultUtils, ISwaggerUtils, uniqueItems } from '../common';
import { ISwaggerEnum, SwaggerEnum } from './swagger-enum';
import { ISwaggerPath, SwaggerPath } from './swagger-path';
import { ISwaggerDocConfig } from './swagger-doc-config';
import { SwaggerBasePrivateProps } from './swagger-base-private-props';
import { ObjectEx } from './object-ex';

export interface ISwaggerDoc {
    models: ISwaggerModel[];
    classes: ISwaggerClass[];
    paths: ISwaggerPath[];
    enums: ISwaggerEnum[];
}
interface PrivateProps extends SwaggerBasePrivateProps<null> {
    config: ISwaggerDocConfig;
}
export class SwaggerDoc extends ObjectEx<PrivateProps> implements ISwaggerDoc {
    public models: SwaggerModel[] = [];
    public classes: SwaggerClass[] = [];
    public paths: SwaggerPath[] = [];
    public enums: SwaggerEnum[] = [];
    public utils: ISwaggerUtils = defaultUtils;

    public constructor(config: ISwaggerDocConfig, utils: ISwaggerUtils) {
        super();

        this.config = config;
        this.utils = utils;

        const { source } = config;

        if (source.paths) {
            this.paths = Object.keys(source.paths).reduce((accum: SwaggerPath[], key) => {
                const obj = source.paths[key];
                accum.push(new SwaggerPath(this, key, obj));
                return accum;
            }, []);
        }

        if (source.definitions) {
            this.models = Object.keys(source.definitions).reduce((accum: SwaggerModel[], key) => {
                const obj = source.definitions[key];
                accum.push(new SwaggerModel(this, key, obj));
                return accum;
            }, []);
        }
        if (source.components?.schemas) {
            this.models = Object.keys(source.components?.schemas).reduce(
                (accum: SwaggerModel[], key) => {
                    const obj = source.components?.schemas[key];
                    accum.push(new SwaggerModel(this, key, obj));
                    return accum;
                },
                [],
            );
        }

        if (source.tags && source.tags.length) {
            this.classes = source.tags.map((tag: any) => {
                const paths = this.paths.filter((f) => f.tags.includes(tag.name));
                return new SwaggerClass(this, tag.name, tag, paths);
            }, []);
        } else {
            const tags = (this.paths.map((p) => p.tags) as any).flat();
            const uniqueTags = uniqueItems(tags, (t) => t) as string[];
            this.classes = uniqueTags.map((tag: string) => {
                const paths = this.paths.filter((f) => f.tags.includes(tag));
                const source = paths.map((p) => p.source);
                return new SwaggerClass(this, tag, source, paths);
            }, []);

            const newClasses: SwaggerClass[] = this.paths
                .filter((f) => !f.tags.length)
                .map((p) => {
                    return new SwaggerClass(this, p.name, p.source, [p]);
                })
                .filter((f) => f);

            this.classes = uniqueItems([...newClasses, ...this.classes], (i) => i.name);
        }

        this.init();
    }

    public addEnums() {
        this.models.forEach((def) => {
            if (def.isEnum) {
                const enumModel = new SwaggerEnum(
                    this,
                    def.name,
                    {
                        modelDef: def,
                    },
                    def.source,
                );
                this.enums.push(enumModel);
            }
        });

        // enums
        this.models.forEach((def) => {
            def.properties.forEach((defProp) => {
                if (defProp.modelType.isEnum) {
                    const enumModel = new SwaggerEnum(
                        this,
                        defProp.name,
                        {
                            modelDef: def,
                            modelPropDef: defProp,
                        },
                        defProp.source,
                    );
                    this.enums.push(enumModel);
                }
            });
        });

        this.classes.forEach((cl) => {
            cl.methods.forEach((meth) => {
                meth.parameters.forEach((par) => {
                    if (par.modelType.isEnum) {
                        const enumModel = new SwaggerEnum(
                            this,
                            par.name,
                            { methodPropertyDef: par },
                            meth.source,
                        );
                        this.enums.push(enumModel);
                    }
                });
            });
        });
        // TODO optimize
        const uniqueEnums = uniqueItems(this.enums, (e) => e.name + JSON.stringify(e.enumValues));
        uniqueEnums.forEach((uniqueEnum) => {
            const similarEnums = this.enums.filter(
                (f) => JSON.stringify(f.enumValues) === JSON.stringify(uniqueEnum.enumValues),
            );
            const newNamespace = similarEnums.map((m) => m.namespace).filter((f) => f);
            uniqueEnum.duplicateNamespaces.push(...(newNamespace as any).flat());
            uniqueEnum.duplicateNamespaces = uniqueItems(uniqueEnum.duplicateNamespaces, (k) => k);

            const newKeys = similarEnums.map((m) => m.keys).filter((f) => f);
            uniqueEnum.keys.push(...(newKeys as any).flat());
            uniqueEnum.keys = uniqueItems(uniqueEnum.keys, (k) => k);
        });
        this.enums = uniqueEnums;
    }

    public init() {
        this.addEnums();
        this.enums = uniqueItems(this.enums, (e) => e.getFullName);

        this.paths.forEach((cl) => cl.init());
        this.enums.forEach((cl) => cl.init());
        this.models.forEach((def) => def.init());
        this.classes.forEach((cl) => cl.init());

        this.models = this.models.filter((f) => !f.isEnum);
    }

    public get doc(): SwaggerDoc {
        return this;
    }

    public get config(): ISwaggerDocConfig {
        return this.getPrivate('config');
    }

    public set config(value: ISwaggerDocConfig) {
        this.setPrivate('config', value);
    }
}
