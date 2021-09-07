import { capitalize, lowerlize } from "../utils";
import {
  ModelType,
  SwaggerClass,
  SwaggerMethod,
  SwaggerMethodParameter,
  SwaggerModel,
  SwaggerModelProperty,
} from "../models";
import { SwaggerEnum } from "../models/swagger-enum";
import { SwaggerPath } from "../models/swagger-path";

const JS_TYPES = [
  "number",
  "boolean",
  "string",
  "array",
  "file",
  "date",
  "object",
  "void",
];

const getModelName = (name: string) => {
  const newName = `${name}`.replace(/[\[\]\.]/g, "");
  return capitalize(newName);
};

const getMethodName = (name: string) => {
  return `${name}`
    .replace(/[\[\]_\. ]/g, " ")
    .split(" ")
    .map((x, idx) => (idx == 0 ? lowerlize(x) : capitalize(x)))
    .join("");
};

const getEnumName = (name: string) => {
  const newName = `${name}`.replace(/[\[\]\.]/g, "");
  return capitalize(`E${newName}`);
};

const getFileName = (name: string) => {
  name = name.replace(/[\[\]\.]/g, "");
  let words = name.split(/(?=[A-Z])/).map((i: string) => i.toLowerCase());
  words = words.filter((f: string) => !["api", "i"].includes(f));
  return `${words.join("-")}.ts`;
};

const getJsTypeInternal = (type: string, schema: any) => {
  if (type === "integer") {
    return "number";
  }
  if (type === "string" && schema.format === "date-time") {
    return "Date";
  }
  if (type === "array" || schema?.type === "array") {
    const itemType: string =
      schema && schema["items"] ? getJsType(schema["items"]) : "any";
    return `Array<${itemType}>`;
  }
  if (type === "file") {
    return "File";
  }
  if (type && type.indexOf("#") >= 0) {
    const parts = type.split("/");
    return getModelName(`${parts[parts.length - 1]}`);
  }
  return type;
};

const getJsType = (schema: any) => {
  let res: string = "";
  if (schema.$ref) {
    return getJsTypeInternal(schema.$ref, schema);
  }
  if (schema["schema"]) {
    const res = getJsTypeInternal(schema["schema"].$ref, schema["schema"]);
    if (res) {
      return res;
    }
    return getJsTypeInternal(schema["schema"].type, schema["schema"]);
  }
  const itemsRef = schema.items ? schema.items["$ref"] : schema["$ref"];
  if (itemsRef) {
    res = getJsTypeInternal(itemsRef, schema);
  }
  if (!res) {
    const additionalProperties = schema.additionalProperties;
    if (additionalProperties && additionalProperties["type"]) {
      if (additionalProperties["items"]) {
        res = getJsTypeInternal(
          additionalProperties["items"].$ref,
          additionalProperties["items"]
        );
      } else {
        res = getJsTypeInternal(
          additionalProperties["type"],
          additionalProperties
        );
      }
    }
  }
  if (!res) {
    res = getJsTypeInternal(schema.type, schema);
  }
  return res;
};

export interface ISwaggerUtils {
  getClassName: (context: SwaggerClass, name: string) => string;
  getClassFileName: (context: SwaggerClass, name: string) => string;
  getMethodName: (context: SwaggerMethod, name: string) => string;
  getMethodParameterName: (
    context: SwaggerMethodParameter,
    name: string
  ) => string;
  getMethodResponseType: (context: SwaggerMethod, shema: any) => string;
  getMethodParameterType: (
    context: SwaggerMethodParameter,
    shema: any
  ) => string;

  getModelName: (context: SwaggerModel, name: string) => string;
  getModelFileName: (context: SwaggerModel, name: string) => string;
  getModelType: (context: SwaggerModel, schema: any) => string;
  getModelPropertyType: (context: SwaggerModelProperty, schema: any) => string;

  getEnumName: (name: string) => string;
  getEnumFileName: (context: SwaggerEnum, name: string) => string;
  getPathName: (context: SwaggerPath, name: string) => string;

  escapeMethodQueryParameterName: (name: string) => string;
  isArray: (schema: any) => boolean;
  isEnum: (schema: any) => boolean;
  isJsType: (name: string) => boolean;
  getEnumValues: (schema: any) => string[] | undefined;
  getArrayItemType: (schema: any) => string;
  getModelType2: (schema: any) => ModelType;
}

export const defaultUtils: ISwaggerUtils = {
  getClassName: (context: SwaggerClass, key: string) => {
    const parts = key
      .replace(/[\{\}]/g, "")
      .replace(/[-_]/g, "/")
      .split("/");
    const tmpName = parts
      .filter((f) => f != "api")
      .map((s) => capitalize(s))
      .join("");
    return tmpName.endsWith("Api") ? tmpName : tmpName + "Api";
  },
  getPathName: (context: SwaggerPath, key: string) => {
    const parts = key
      .replace(/[\{\}]/g, "")
      .replace(/[-_]/g, "/")
      .split("/");
    const tmpName = parts
      .filter((f) => f !== "api")
      .map((s) => capitalize(s))
      .join("");
    return tmpName.endsWith("Api") ? tmpName : tmpName + "Api";
  },
  getClassFileName: (context: SwaggerClass, name: string) => getFileName(name),
  getMethodName: (context: SwaggerMethod, name: string) => getMethodName(name),
  getMethodParameterName: (context: SwaggerMethodParameter, name: string) =>
    name,
  getMethodResponseType: (context: SwaggerMethod, schema: any) =>
    getJsType(schema),
  getMethodParameterType: (context: SwaggerMethodParameter, schema: any) => {
    return getJsType(schema);
  },

  getModelName: (context: SwaggerModel, name: string) => getModelName(name),
  getModelFileName: (context: SwaggerModel, name: string) => getFileName(name),
  getModelType: (context: SwaggerModel, schema: any) => getJsType(schema),

  getModelPropertyType: (context: SwaggerModelProperty, schema: any) =>
    getJsType(schema),
  getEnumName: (name: string) => getEnumName(name),
  getEnumFileName: (context: SwaggerEnum, name: string) => getFileName(name),
  escapeMethodQueryParameterName: (name: string) =>
    `${name}`.replace(/[\[\]\.]/g, ""),

  isArray: (schema: any): boolean => {
    return (
      (schema && schema.type === "array") || schema?.schema?.type === "array"
    );
  },

  isEnum: (schema: any): boolean => {
    return schema?.items?.enum?.length > 0 || schema?.enum ? true : false;
  },

  isJsType: (name: string) => {
    return (
      JS_TYPES.includes(name.toLowerCase()) ||
      name.toLowerCase().indexOf("array<") == 0
    );
  },
  getArrayItemType: (schema: any) => {
    const type = getJsType(schema);
    if (type && type.indexOf("Array") === 0) {
      return type.replace(/Array/g, "").replace(/[\<\>]/g, "");
    }
    return "";
  },
  getEnumValues: (schema: any) => {
    if (schema.enum) {
      return schema.enum;
    } else if (schema.items?.enum) {
      return schema.items.enum;
    }
  },
  getModelType2: (schema: any): ModelType => {
    return null as any;
  },
};
