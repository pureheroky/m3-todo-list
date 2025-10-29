import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../models/apiResponse";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response<ApiResponse<null>>,
  _next: NextFunction
) {
  res.status(500).json({ success: false, error: err.message });
}
