import React from 'react';
import { ISwaggerPlugin } from "../common/swagger-plugins";
interface IProps {
    plugins: ISwaggerPlugin[];
}
declare const Swagger: React.FC<IProps>;
export default Swagger;
