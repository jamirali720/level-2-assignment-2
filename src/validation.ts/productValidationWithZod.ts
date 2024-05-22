import { z } from "zod";

const productSchemaValidation = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be string",
  }),
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be string",
  }),
  price: z.number({
    required_error: "Price is required",
    invalid_type_error: "Price must be number type",
  }),
  category: z.string({
    required_error: "Category is required",
    invalid_type_error: "Category must be string",
  }),
  tags: z.array(
    z.string({
      required_error: "Tags item is required",
      invalid_type_error: "Tags item must be string",
    }),
  ),
  variants: z.array(
    z.object({
      type: z.string({
        required_error: " Variant type is required",
        invalid_type_error: "Variant type must be string",
      }),
      value: z.string({
        required_error: "Variant value is required",
        invalid_type_error: "Variant value must be string",
      }),
    }),
  ),
  inventory: z.object({
    quantity: z.number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be Number",
    }),
    inStock: z.boolean({
      required_error: "in stock is required",
      invalid_type_error: "in stock must be boolean",
    }),
  }),
});

export default productSchemaValidation;
