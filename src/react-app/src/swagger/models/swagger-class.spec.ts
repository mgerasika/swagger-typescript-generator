import {defaultComponents, defaultUtils} from "../common";
import {SwaggerDoc} from "./swagger-doc";

describe("swagger class", () => {
    let swaggerDoc = null as any;

    beforeEach(() => {
        swaggerDoc = new SwaggerDoc({apiUrl: 'http://example.com', source: json}, defaultUtils, defaultComponents);
    })

    test('has correct class name', () => {
        expect(swaggerDoc.classes[0].name).toBe('PetApi');
    });
})

const json = {
    "swagger": "2.0",
    "paths": {
        "/pet/findByStatus": {
            "get": {
                "tags": [
                    "pet"
                ],
                "summary": "Finds Pets by status",
                "description": "Multiple status values can be provided with comma separated strings",
                "operationId": "findPetsByStatus",
                "produces": [
                    "application/json",
                    "application/xml"
                ],
                "parameters": [
                    {
                        "name": "status",
                        "in": "query",
                        "description": "Status values that need to be considered for filter",
                        "required": true,
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "available",
                                "pending",
                                "sold"
                            ],
                            "default": "available"
                        },
                        "collectionFormat": "multi"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Pet"
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid status value"
                    }
                },
                "security": [
                    {
                        "petstore_auth": [
                            "write:pets",
                            "read:pets"
                        ]
                    }
                ]
            }
        }
    }
}