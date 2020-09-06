import {SwaggerDoc} from "../swagger/models";

export const exampleDocumentFactory = (doc:SwaggerDoc) : SwaggerDoc => {
    // doc.enums.forEach(e =>{
    //     const name = e.name.substr(1); // Remove first 'E' symbol
    //     e.name = `${name}Enum`;
    // })
    return doc;
}