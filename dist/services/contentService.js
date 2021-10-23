"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorService = void 0;
const contentSchema_1 = require("../schemas/contentSchema");
class AuthorService {
    constructor() {
        /**
         *@param paragraph
         * @returns
         */
        this.getParagraph = (paragraph) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.content.findOne({ paragraph });
            }
            catch (err) {
                console.error(err);
            }
        });
        /**
         *
         * @param paragraph
         * numSentences
         * @returns
         */
        this.createParagraph = (paragraph, numberOfSentence) => __awaiter(this, void 0, void 0, function* () {
            try {
                const content = new this.content({ paragraph, numberOfSentence });
                return yield content.save();
            }
            catch (err) {
                console.error(err);
            }
        });
        /**
         *
         * @param paragraph
         * @returns
         */
        this.deleteParagraph = (paragraph) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.content.findOneAndDelete({ paragraph });
            }
            catch (err) {
                console.error(err);
            }
        });
        /**
         *
         * @param paragraph
         * numberOfSentence
         * sentence
         * @returns
         */
        this.createSentence = (paragraph, index, sentence) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.content.findOneAndUpdate({ paragraph }, { $push: { sentence } }, { new: true, upsert: true });
            }
            catch (err) {
                console.error(err);
            }
        });
        /**
         *
         * @param complete
         * numberOfSentence
         * sentence
         * @returns
         */
        this.updateSentence = (paragraph, complete) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.content.findOneAndUpdate({ paragraph }, { $set: { complete } }, { new: true });
            }
            catch (err) {
                console.error(err);
            }
        });
        /**
         *
         * @param paragraph
         * numberOfSentence
         * @returns
         */
        this.deleteSentence = (paragraph, sentence, complete) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.content.findOneAndUpdate({ paragraph }, { $set: { sentence, complete } }, { new: true });
            }
            catch (err) {
                console.error(err);
            }
        });
        /**
         *
         * @param paragraph
         * @returns
         */
        this.isParagraphExists = (paragraph) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.content.findOne({ paragraph });
            }
            catch (err) {
                console.error(err);
            }
        });
        this.content = contentSchema_1.Content;
    }
}
exports.AuthorService = AuthorService;
//# sourceMappingURL=contentService.js.map