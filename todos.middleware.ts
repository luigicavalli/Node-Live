import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const schema = Joi.object({
  id: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
  todo: Joi.string().required(),
  completed: Joi.boolean().required(),
});

export const VALIDATE_BODY = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ errors: error.details.map((message) => message) });
  }
  next();
};
