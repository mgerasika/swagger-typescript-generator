import {ISelectOption} from "./bootstrap-select";
import {SwaggerDoc} from "../swagger/models";
import {customizationArray} from "../demo/customisation";

const compareFn = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)

const EMPTY_OPTION = {label: '', value: ''};
const ALL_OPTION = {label: 'ALL', value: 'ALL'};
export const dictionary = {
    getClassesOptions: (root: SwaggerDoc | undefined): ISelectOption[] => {
        if (!root) {
            return [];
        }
        const items = root.classes.sort((a, b) => compareFn(a.name, b.name))
            .map(item => ({label: item.name, value: item.name})) as ISelectOption[];
        return [EMPTY_OPTION, ALL_OPTION, ...items];
    },

    getUrlOptions: (urls: string[]): ISelectOption[] => {
        return urls.map(item => ({label: item, value: item}));
    },

    getCustomizationOptions: (): ISelectOption[] => {
        const items = customizationArray.map(item => ({label: item.methodName, value: item.methodName}));
        return [EMPTY_OPTION,...items];
    },

    getModelOptions: (root: SwaggerDoc | undefined): ISelectOption[] => {
        if (!root) {
            return [];
        }
        const items = root.models.sort((a, b) => compareFn(a.name, b.name))
            .map(item => ({label: item.name, value: item.name})) as ISelectOption[];
        return [EMPTY_OPTION, ALL_OPTION, ...items];
    },

    getEnumOptions: (root: SwaggerDoc | undefined): ISelectOption[] => {
        if (!root) {
            return [];
        }
        const items = root.enums.sort((a, b) => compareFn(a.getFullName, b.getFullName))
            .map(item => ({label: item.getFullName, value: item.getFullName})) as ISelectOption[];
        return [EMPTY_OPTION, ALL_OPTION, ...items];
    },

    getPathOptions: (root: SwaggerDoc | undefined): ISelectOption[] => {
        if (!root) {
            return [];
        }
        const items = root.paths.sort((a, b) => compareFn(a.name, b.name))
            .map(item => ({label: item.name, value: item.name})) as ISelectOption[];
        return [ EMPTY_OPTION, ALL_OPTION, ...items];
    }
};