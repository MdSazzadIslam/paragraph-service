"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRoute = void 0;
const express_1 = require("express");
const contentController_1 = require("../controllers/contentController");
const validator_1 = require("../middlewares/validator");
class ContentRoute {
    constructor() {
        this.contentController = new contentController_1.ContentController();
        this.router = (0, express_1.Router)();
        this.configRoutes();
        this.validator = new validator_1.Validator();
    }
    configRoutes() {
        this.router.get("/paragraph/:slug", this.contentController.getParagraph);
        this.router.post("/paragraph", this.contentController.createParagraph);
        this.router.delete("/paragraph/:slug", this.contentController.deleteParagraph);
        this.router.post("/paragraph/:slug/sentence/:idx", this.contentController.createSentence);
        this.router.delete("/paragraph/:slug/sentence/:idx", this.contentController.deleteSentence);
    }
}
exports.ContentRoute = ContentRoute;
//# sourceMappingURL=contentRoute.js.map