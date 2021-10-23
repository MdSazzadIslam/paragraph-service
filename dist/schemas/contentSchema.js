"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const mongoose_1 = require("mongoose");
const ContentSchema = new mongoose_1.Schema({
    paragraph: {
        type: String,
        required: [true, "Paragraph is required"],
        unique: true,
    },
    numberOfSentence: {
        type: Number,
    },
    sentence: [
        {
            type: String,
        },
    ],
    complete: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.Content = (0, mongoose_1.model)("Content", ContentSchema);
//# sourceMappingURL=contentSchema.js.map