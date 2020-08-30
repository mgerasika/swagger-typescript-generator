import {ISwaggerModel, SwaggerModel} from './swagger-model';
import {ISwaggerClass, SwaggerClass} from './swagger-class';
import {defaultComponents, defaultUtils, ISwaggerComponents, ISwaggerUtils, uniqueItems} from "../common";
import {ISwaggerEnum, SwaggerEnum} from "./swagger-enum";
import {ISwaggerPath, SwaggerPath} from "./swagger-path";
import {ISwaggerDocConfig} from "./swagger-doc-config";
import {SwaggerBase} from "./swagger-base";
import {SwaggerBasePrivateProps} from "./swagger-base-private-props";
import {ObjectEx} from "./object-ex";

export interface ISwaggerDoc {
    definitions: ISwaggerModel[];
    classes: ISwaggerClass[];
    paths: ISwaggerPath[];
    enums: ISwaggerEnum[];
}
interface PrivateProps extends SwaggerBasePrivateProps<null>{
    config:ISwaggerDocConfig;
}
export class SwaggerDoc extends ObjectEx<PrivateProps> implements ISwaggerDoc {
    public definitions: SwaggerModel[] = [];
    public classes: SwaggerClass[] = [];
    public paths: SwaggerPath[] = [];
    public enums: SwaggerEnum[] = [];
    public utils: ISwaggerUtils = defaultUtils;
    public components: ISwaggerComponents = defaultComponents;

    public constructor(config: ISwaggerDocConfig, utils: ISwaggerUtils, components: ISwaggerComponents) {
        super();

        this.config = config;
        this.utils = utils;
        this.components = components;

        const {source} = config;

        if (source.paths) {
            this.paths = Object.keys(source.paths).reduce((accum: SwaggerPath[], key) => {
                const obj = source.paths[key];
                accum.push(new SwaggerPath(this, key, obj));
                return accum;
            }, []);
        }

        if (source.definitions) {
            this.definitions = Object.keys(source.definitions).reduce((accum: SwaggerModel[], key) => {
                const obj = source.definitions[key];
                accum.push(new SwaggerModel(this, key, obj));
                return accum;
            }, []);
        }

        if (source.tags) {
            this.classes = source.tags.map((tag: any) => {
                const paths = this.paths.filter(f => f.tags.includes(tag.name));
                return new SwaggerClass(this, tag.name, tag, paths);
            }, []);
        } else {
            const tags = (this.paths.map(p => p.tags) as any).flat();
            const uniqueTags = uniqueItems(tags, (t) => t) as string[];
            this.classes = uniqueTags.map((tag: string) => {
                const paths = this.paths.filter(f => f.tags.includes(tag));
                const source = paths.map(p => p.source);
                return new SwaggerClass(this, tag, source, paths);
            }, []);
        }


        this.init();
    }

    public clone() {
        const res = new SwaggerDoc(this.config,this.utils,this.components);
        this.copyTo(res);
        return res;
    }

    public addEnums() {
        // enums
        this.definitions.forEach(def => {
            def.properties.forEach(defProp => {
                if (defProp.isEnum) {
                    const enumModel = new SwaggerEnum(this, defProp.name, {
                        modelDef: def,
                        modelPropDef: defProp
                    }, defProp.source);
                    this.enums.push(enumModel);
                }
            })
        })

        this.classes.forEach(cl => {
            cl.methods.forEach(meth => {
                meth.parameters.forEach(par => {
                    if (par.isEnum) {
                        const enumModel = new SwaggerEnum(this, par.name, {methodPropertyDef: par}, meth.source);
                        this.enums.push(enumModel);
                    }
                })
            })
        })
        // // TODO optimize
        // const uniqueEnums = uniqueItems(this.enums, (e) => e.name + JSON.stringify(e.values));
        // uniqueEnums.forEach(uniqueEnum => {
        //     const similarEnums = this.enums.filter(f => JSON.stringify(f.values) === JSON.stringify(uniqueEnum.values));
        //     const newNamespace = similarEnums.map(m => m.namespace).filter(f=>f);
        //     uniqueEnum.duplicateNamespaces.push(...((newNamespace as any).flat()));
        //     uniqueEnum.duplicateNamespaces = uniqueItems(uniqueEnum.duplicateNamespaces, k => k);
        //
        //     const newKeys = similarEnums.map(m => m.keys).filter(f=>f);
        //     uniqueEnum.keys.push(...((newKeys as any).flat()));
        //     uniqueEnum.keys = uniqueItems(uniqueEnum.keys, k => k);
        // })
        // this.enums = uniqueEnums;
    }

    public init() {
        this.addEnums();

        this.paths.forEach(cl => cl.init());
        this.enums.forEach(cl => cl.init());
        this.definitions.forEach(def => def.init());
        this.classes.forEach(cl => cl.init());

        this.enums = uniqueItems(this.enums, (e) => e.fullName);
    }

    public get doc(): SwaggerDoc {
        return this;
    }

    public get config(): ISwaggerDocConfig {
        return this.getPrivate('config')
    }

    public set config(value: ISwaggerDocConfig) {
        this.setPrivate('config',value);
    }
}

