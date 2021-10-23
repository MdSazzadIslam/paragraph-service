import { Content, IParagraph } from "../schemas/contentSchema";

class AuthorService {
  private content;
  constructor() {
    this.content = Content;
  }
  /**
   *@param paragraph
   * @returns
   */
  public getParagraph = async (paragraph: string): Promise<IParagraph> => {
    try {
      return await this.content.findOne({ paragraph });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   *
   * @param paragraph
   * numSentences
   * @returns
   */
  public createParagraph = async (
    paragraph: string,
    numberOfSentence: number,
  ): Promise<IParagraph> => {
    try {
      const content = new this.content({ paragraph, numberOfSentence });
      return await content.save();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   *
   * @param paragraph
   * @returns
   */
  public deleteParagraph = async (paragraph: string): Promise<IParagraph> => {
    try {
      return await this.content.findOneAndDelete({ paragraph });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   *
   * @param paragraph
   * numberOfSentence
   * sentence
   * @returns
   */
  public createSentence = async (
    paragraph: string,
    index: number,
    sentence: string,
  ): Promise<IParagraph> => {
    try {
      return await this.content.findOneAndUpdate(
        { paragraph },
        { $push: { sentence } },
        { new: true, upsert: true },
      );
    } catch (err) {
      console.error(err);
    }
  };

  /**
   *
   * @param complete
   * numberOfSentence
   * sentence
   * @returns
   */
  public updateSentence = async (paragraph: string, complete: boolean): Promise<IParagraph> => {
    try {
      return await this.content.findOneAndUpdate(
        { paragraph },
        { $set: { complete } },
        { new: true },
      );
    } catch (err) {
      console.error(err);
    }
  };

  /**
   *
   * @param paragraph
   * numberOfSentence
   * @returns
   */
  public deleteSentence = async (
    paragraph: string,
    sentence: Array<string>,
    complete: boolean,
  ): Promise<IParagraph> => {
    try {
      return await this.content.findOneAndUpdate(
        { paragraph },
        { $set: { sentence, complete } },
        { new: true },
      );
    } catch (err) {
      console.error(err);
    }
  };

  /**
   *
   * @param paragraph
   * @returns
   */
  public isParagraphExists = async (paragraph: string): Promise<IParagraph> => {
    try {
      return await this.content.findOne({ paragraph });
    } catch (err) {
      console.error(err);
    }
  };
}

export { AuthorService };
