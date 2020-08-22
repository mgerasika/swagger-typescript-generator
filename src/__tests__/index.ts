import {SwaggerDoc} from "../react-app/src/swagger/models";
import {defaultComponents, defaultUtils} from "../react-app/src/swagger/common";

const example = require('./example1.json');

describe("example", () => {
    const swaggerDoc = new SwaggerDoc({apiUrl: 'http://example.com', source: example}, defaultUtils, defaultComponents);

    test('has class', () => {
        expect(swaggerDoc.classes[0].name).toBe('PetApi');
    });
})