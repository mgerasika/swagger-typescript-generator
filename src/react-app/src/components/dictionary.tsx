import {ISelectOption} from "./select";
import {SwaggerDocModel} from "../swagger/model";

const compareFn = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)

export const dictionary = {
    getClassesOptions: (root:SwaggerDocModel | undefined): ISelectOption[] => {
        if (!root) {
            return [];
        }
        const items = root.classes.sort((a, b) => compareFn(a.name, b.name))
            .map(item => ({label: item.name, value: item.name}))  as ISelectOption[];
        return [{label: '', value: ''}, {label: 'ALL', value: 'ALL'}, ...items];
    },

    getUrlOptions: (urls:string[]): ISelectOption[] => {
        return urls.map(item => ({label: item, value: item}));
    },

    getApiDefinitionsOptions: (root:SwaggerDocModel| undefined): ISelectOption[] => {
        if (!root) {
            return [];
        }
        const items = root.definitions.sort((a, b) => compareFn(a.name, b.name))
            .map(item => ({label: item.name, value: item.name}))  as ISelectOption[];
        return [{label: '', value: ''}, {label: 'ALL', value: 'ALL'}, ...items];
    },

    getEnumOptions: (root:SwaggerDocModel| undefined): ISelectOption[] => {
        if (!root) {
            return [];
        }
        const items = root.enums.sort((a, b) => compareFn(a.name, b.name))
            .map(item => ({label: item.name, value: item.name}))  as ISelectOption[];
        return [{label: '', value: ''}, {label: 'ALL', value: 'ALL'}, ...items];
    },

    getPathOptions: (root:SwaggerDocModel| undefined): ISelectOption[] => {
        if (!root) {
            return [];
        }
        const items = root.paths.sort((a, b) => compareFn(a.name, b.name))
            .map(item => ({label: item.name, value: item.name}))  as ISelectOption[];
        return [{label: '', value: ''}, {label: 'ALL', value: 'ALL'}, ...items];
    }
};