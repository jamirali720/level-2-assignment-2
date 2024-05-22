import { Response } from "express";

export const successResponse = (
  res: Response,
  { message = "success", data = {} || null },
) => {
  res.json({
    success: true,
    message,
    data,
  });
};
