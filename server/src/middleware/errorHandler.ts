import type { NextFunction, Request, Response } from "express";


export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
    console.error("Error message", err?.message);

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    const message =
        statusCode >= 500 ? "An unexpected error occurred" : err?.message || "Request failed";

    res.status(statusCode).json({
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err?.stack }),
    });

}