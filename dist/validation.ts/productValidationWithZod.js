"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const productSchemaValidation = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be string"
    }),
    description: zod_1.z.string({
        required_error: "Description is required",
        invalid_type_error: "Description must be string"
    }),
    price: zod_1.z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be number type"
    }),
    category: zod_1.z.string({
        required_error: "Category is required",
        invalid_type_error: "Category must be string"
    }),
    tags: zod_1.z.array(zod_1.z.string({
        required_error: "Tags item is required",
        invalid_type_error: "Tags item must be string"
    })),
    variants: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.string(),
        value: zod_1.z.boolean()
    })),
    inventory: zod_1.z.object({
        quantity: zod_1.z.number({
            required_error: "Quantity is required",
            invalid_type_error: "Quantity must be Number"
        }),
        inStock: zod_1.z.boolean({
            required_error: "in stock is required",
            invalid_type_error: "in stock must be boolean"
        })
    })
});
