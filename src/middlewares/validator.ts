import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
class Validator {
  public contentValidationRules = () => {
    return [
      check("paragraph", "paragraph is required").not().isEmpty(),
      check("numberOfSentence", "Number of sentence is required").not().isEmpty(),
    ];
  };
  public validateContent = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let messages: string[] = [];
      errors.array().forEach(error => {
        messages.push(error.msg);
      });

      return res.status(500).send({ msg: messages });
    }
    next();
  };
}

export { Validator };
