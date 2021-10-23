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
exports.ContentController = void 0;
const contentService_1 = require("../services/contentService");
const cache_1 = require("../utils/cache");
class ContentController {
    constructor() {
        /**
         * Get list of paragraph
         * @route GET/:slug
         * @param req
         * @param res
         * @returns http response
         */
        this.getParagraph = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const paragraph = req.params.slug;
                const response = yield this.authorService.getParagraph(paragraph);
                if (response) {
                    return res.status(200).send({ message: "success", payload: response });
                }
                else {
                    return res.status(404).send({ message: "No record found" });
                }
            }
            catch (err) {
                res.status(500).send({
                    message: "Error occured while retriving  the data " + err.message,
                });
            }
        });
        /**
         * create a paragraph
         * @route POST/:paragraph/:numberOfSentence
         * @param req
         * @param res
         * @returns http response
         */
        this.createParagraph = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const paragraph = req.body.paragraph;
                const numberOfSentence = req.body.numberOfSentence;
                if (paragraph === undefined || numberOfSentence === undefined) {
                    return res.status(200).send({ message: "paragraph and numberOfSentence is required" });
                }
                const isExists = yield this.authorService.isParagraphExists(paragraph);
                if (!isExists) {
                    const response = yield this.authorService.createParagraph(paragraph, numberOfSentence);
                    if (response) {
                        return res.status(201).send({ message: "success", payload: response });
                    }
                    else {
                        return res.status(500).send({ message: "Error occured while creating the paragraph" });
                    }
                }
                else {
                    return res.status(200).send({ message: `${paragraph} is already exists` });
                }
            }
            catch (err) {
                res.status(500).send({
                    message: "Error occured while creating the paragraph " + err.message,
                });
            }
        });
        /**
         * create a paragraph
         * @route DELETE/:slug
         * @param req
         * @param res
         * @returns http response
         */
        this.deleteParagraph = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const paragraph = req.params.slug;
                const isExists = yield this.authorService.isParagraphExists(paragraph);
                if (paragraph === undefined) {
                    return res.status(200).send({ message: "paragraph is required" });
                }
                if (isExists) {
                    const response = yield this.authorService.deleteParagraph(paragraph);
                    return res.status(200).send({ message: "success" });
                }
                else {
                    return res.status(204).send({ message: `No record found in database by ${paragraph}` });
                }
            }
            catch (err) {
                res.status(500).send({
                    message: "Error occured while deleting paragraph " + err.message,
                });
            }
        });
        /**
         * create a sentence
         * @route POST/:slug/:sentence/:idx
         * @param req
         * @param res
         * @returns http response
         */
        this.createSentence = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const paragraph = req.params.slug;
                const index = parseInt(req.params.idx);
                const sentence = req.body.sentence;
                if (sentence === undefined) {
                    return res.status(200).send({ message: "Sentence is required" });
                }
                const isExists = yield this.authorService.isParagraphExists(paragraph);
                if (isExists) {
                    const numSentence = isExists.numberOfSentence;
                    if (index < numSentence) {
                        const response = yield this.authorService.createSentence(paragraph, index, sentence);
                        if (response) {
                            const len = response.sentence.length;
                            if (len === numSentence) {
                                const complete = len === numSentence ? true : false;
                                const newResponse = yield this.authorService.updateSentence(paragraph, complete);
                                return res.status(201).send({ message: "success", payload: newResponse });
                            }
                            return res.status(200).send({ message: "success", payload: response });
                        }
                        else {
                            return res.status(500).send({ message: "Error occured while creating sentence" });
                        }
                    }
                    else {
                        return res.status(400).send({
                            message: `idx [${index}] is greater than the sentence creation limit ${numSentence}`,
                        });
                    }
                }
                else {
                    return res.status(404).send({ message: `No record found in database by ${paragraph}` });
                }
            }
            catch (err) {
                res.status(500).send({
                    message: "Error occured while creating sentence " + err.message,
                });
            }
        });
        /**
         * delete a sentence
         * @route DELETE/:slug/:idx
         * @param req
         * @param res
         * @returns http response
         */
        this.deleteSentence = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const paragraph = req.params.slug;
                const index = parseInt(req.params.idx);
                if (paragraph === undefined || index === undefined) {
                    return res.status(200).send({ message: "paragraph and index is required" });
                }
                const isExists = yield this.authorService.isParagraphExists(paragraph);
                if (isExists) {
                    const newSentence = isExists.sentence.splice(0, index);
                    const complete = false;
                    const response = yield this.authorService.deleteSentence(paragraph, newSentence, complete);
                    return res.status(200).send({ message: "success", payload: response });
                }
                else {
                    return res.status(204).send({ message: `No record found in database by ${paragraph}` });
                }
            }
            catch (err) {
                res.status(500).send({
                    message: "Error occured while creating sentence " + err.message,
                });
            }
        });
        this.authorService = new contentService_1.AuthorService();
        this.cache = new cache_1.Cache();
    }
}
exports.ContentController = ContentController;
//# sourceMappingURL=contentController.js.map