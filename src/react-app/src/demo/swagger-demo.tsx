import React from 'react';
import {Swagger} from "../swagger/ui/swagger";
import {customPlugins} from "./custom-plugins";

export const SwaggerDemo: React.FC = () => {
    return (
        <div>
            <Swagger plugins={customPlugins}/>
        </div>
    );
}
