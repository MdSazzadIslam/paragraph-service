import { Router } from "express";
import { ContentController } from "../controllers/contentController";
import { Validator } from "../middlewares/validator";
class ContentRoute {
  public contentController: ContentController;
  public router: Router;
  public validator: Validator;
  constructor() {
    this.contentController = new ContentController();
    this.router = Router();
    this.configRoutes();
    this.validator = new Validator();
  }

  public configRoutes() {
    this.router.get("/paragraph/:slug", this.contentController.getParagraph);
    this.router.post("/paragraph", this.contentController.createParagraph);
    this.router.delete("/paragraph/:slug", this.contentController.deleteParagraph);
    this.router.post("/paragraph/:slug/sentence/:idx", this.contentController.createSentence);
    this.router.delete("/paragraph/:slug/sentence/:idx", this.contentController.deleteSentence);
  }
}
export { ContentRoute };
