import { Response } from "express";

export const successResponse = (
  res: Response,
  { message = "success", data }: { message: string; data?: object | string },
) => {
  res.json({
    success: true,
    message,
    data,
  });
};
