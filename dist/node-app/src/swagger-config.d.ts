import { ISwaggerPlugin } from "../../swagger/common/swagger-plugins";
export interface ISwaggerConfig {
    plugins: ISwaggerPlugin[];
    swaggerInputJson: Object;
    modelFilesOutDir: string;
    apiFilesOutDir: string;
}
