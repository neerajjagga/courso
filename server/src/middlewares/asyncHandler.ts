import { NextFunction, Request, Response } from "express"

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    }
}