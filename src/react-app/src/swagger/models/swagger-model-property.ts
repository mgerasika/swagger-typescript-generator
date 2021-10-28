import { SwaggerBase } from "./swagger-base";
import { SwaggerModel } from "./swagger-model";
import { SwaggerBasePrivateProps } from "./swagger-base-private-props";
import { ModelType } from "./model-type";

interface PrivateProps extends SwaggerBasePrivateProps<SwaggerModel> {}
export class SwaggerModelProperty extends SwaggerBase<
  SwaggerModel,
  PrivateProps
> {
  public name: string = "";

  public modelType: ModelType;
  public required?: boolean;
  public maxNumber?: number;
  public minNumber?: number;
  public description?: string;

  public constructor(
    parent: SwaggerModel,
    name: string,
    source: any,
    required?: boolean
  ) {
    super();

    this.source = source;
    this.parent = parent;
    this.modelType = new ModelType(this.config);

    this.name = name;
    this.maxNumber = source.maximum !== undefined ? source.maximum : undefined;
    this.minNumber = source.minimum !== undefined ? source.minimum : undefined;
    this.description =
      source.description !== undefined ? source.description : undefined;
		this.modelType.isEnum = this.utils.isEnum(source) ? true : undefined;
    this.modelType.type = this.utils.getModelPropertyType(this, source);
    this.modelType.isJsType = this.utils.isJsType(this.modelType.type);
    this.modelType.isArray = this.utils.isArray(source) ? true : undefined;
    this.required = required;
    if (this.modelType.isEnum) {
      this.modelType.enumValues = this.utils.getEnumValues(source);
    }
    if (this.modelType.isArray) {
      const type = this.utils.getArrayItemType(source);
      this.modelType.arrayItemType = type || undefined;
    }
  }

  public init() {
    if (this.modelType.isEnum) {
      this.initEnumRef();
    }
    if (!this.modelType.isEnum && !this.modelType.isJsType) {
      this.initModelRef();
    }
  }

  private initEnumRef() {
    const fullName = this.parent.name + "." + this.utils.getEnumName(this.name);
    const enumName = this.utils.getEnumName(this.name);
    let enumRef = this.doc.enums.find(
      (f) =>
        f.getFullName === fullName ||
        f.getFullName === this.name ||
        f.name === enumName
    );
    if (enumRef) {
      this.modelType.enumRef = enumRef;
    } else {
      console.error(
        "Enum not found [model property] = " +
          this.name +
          ", [fullName=]" +
          fullName +
          " [model name] = " +
          this.parent.name,
        this,
        this.doc.enums
      );
    }
  }

  private initModelRef() {
    const modelRef = this.doc.models.find(
      (f) =>
        f.name === this.modelType.type ||
        f.name === this.modelType.arrayItemType
    );
    if (modelRef) {
      this.modelType.modelRef = modelRef;
    } else {
      console.error(
        "Model not found into swagger-def-model " + this.modelType.type,
        this.doc.models
      );
    }
  }
}
