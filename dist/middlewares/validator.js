"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const express_validator_1 = require("express-validator");
class Validator {
    constructor() {
        this.contentValidationRules = () => {
            return [
                (0, express_validator_1.check)("paragraph", "paragraph is required").not().isEmpty(),
                (0, express_validator_1.check)("numberOfSentence", "Number of sentence is required").not().isEmpty(),
            ];
        };
        this.validateContent = (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                let messages = [];
                errors.array().forEach(error => {
                    messages.push(error.msg);
                });
                return res.status(500).send({ msg: messages });
            }
            next();
        };
    }
}
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map