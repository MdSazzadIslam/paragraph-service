import { Request, Response } from "express";
import { AuthorService } from "../services/contentService";
import { Cache } from "../utils/cache";

class ContentController {
  public authorService: AuthorService;
  public cache: Cache;

  constructor() {
    this.authorService = new AuthorService();
    this.cache = new Cache();
  }
  /**
   * Get list of paragraph
   * @route GET/:slug
   * @param req
   * @param res
   * @returns http response
   */
  public getParagraph = async (req: Request, res: Response) => {
    try {
      const paragraph: string = req.params.slug;

      const response = await this.authorService.getParagraph(paragraph);
      if (response) {
        return res.status(200).send({ message: "success", payload: response });
      } else {
        return res.status(404).send({ message: "No record found" });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error occured while retriving  the data " + err.message,
      });
    }
  };

  /**
   * create a paragraph
   * @route POST/:paragraph/:numberOfSentence
   * @param req
   * @param res
   * @returns http response
   */
  public createParagraph = async (req: Request, res: Response) => {
    try {
      const paragraph: string = req.body.paragraph;
      const numberOfSentence: number = req.body.numberOfSentence;

      if (paragraph === undefined || numberOfSentence === undefined) {
        return res.status(200).send({ message: "paragraph and numberOfSentence is required" });
      }
      const isExists = await this.authorService.isParagraphExists(paragraph);
      if (!isExists) {
        const response = await this.authorService.createParagraph(paragraph, numberOfSentence);
        if (response) {
          return res.status(201).send({ message: "success", payload: response });
        } else {
          return res.status(500).send({ message: "Error occured while creating the paragraph" });
        }
      } else {
        return res.status(200).send({ message: `${paragraph} is already exists` });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error occured while creating the paragraph " + err.message,
      });
    }
  };

  /**
   * create a paragraph
   * @route DELETE/:slug
   * @param req
   * @param res
   * @returns http response
   */
  public deleteParagraph = async (req: Request, res: Response) => {
    try {
      const paragraph: string = req.params.slug;
      const isExists = await this.authorService.isParagraphExists(paragraph);
      if (paragraph === undefined) {
        return res.status(200).send({ message: "paragraph is required" });
      }
      if (isExists) {
        const response = await this.authorService.deleteParagraph(paragraph);
        return res.status(200).send({ message: "success" });
      } else {
        return res.status(204).send({ message: `No record found in database by ${paragraph}` });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error occured while deleting paragraph " + err.message,
      });
    }
  };

  /**
   * create a sentence
   * @route POST/:slug/:sentence/:idx
   * @param req
   * @param res
   * @returns http response
   */
  public createSentence = async (req: Request, res: Response) => {
    try {
      const paragraph: string = req.params.slug;
      const index: number = parseInt(req.params.idx);
      const sentence: string = req.body.sentence;
      if (sentence === undefined) {
        return res.status(200).send({ message: "Sentence is required" });
      }

      const isExists = await this.authorService.isParagraphExists(paragraph);

      if (isExists) {
        const numSentence: number = isExists.numberOfSentence;
        if (index < numSentence) {
          const response = await this.authorService.createSentence(paragraph, index, sentence);
          if (response) {
            const len: number = response.sentence.length;
            if (len === numSentence) {
              const complete: boolean = len === numSentence ? true : false;
              const newResponse = await this.authorService.updateSentence(paragraph, complete);
              return res.status(201).send({ message: "success", payload: newResponse });
            }
            return res.status(200).send({ message: "success", payload: response });
          } else {
            return res.status(500).send({ message: "Error occured while creating sentence" });
          }
        } else {
          return res.status(400).send({
            message: `idx [${index}] is greater than the sentence creation limit ${numSentence}`,
          });
        }
      } else {
        return res.status(404).send({ message: `No record found in database by ${paragraph}` });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error occured while creating sentence " + err.message,
      });
    }
  };

  /**
   * delete a sentence
   * @route DELETE/:slug/:idx
   * @param req
   * @param res
   * @returns http response
   */
  public deleteSentence = async (req: Request, res: Response) => {
    try {
      const paragraph: string = req.params.slug;
      const index: number = parseInt(req.params.idx);
      if (paragraph === undefined || index === undefined) {
        return res.status(200).send({ message: "paragraph and index is required" });
      }
      const isExists = await this.authorService.isParagraphExists(paragraph);
      if (isExists) {
        const newSentence = isExists.sentence.splice(0, index);
        const complete: boolean = false;
        const response = await this.authorService.deleteSentence(paragraph, newSentence, complete);
        return res.status(200).send({ message: "success", payload: response });
      } else {
        return res.status(204).send({ message: `No record found in database by ${paragraph}` });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error occured while creating sentence " + err.message,
      });
    }
  };
}

export { ContentController };
