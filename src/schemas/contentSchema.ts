import { Model, model, Schema } from "mongoose";

export interface IParagraph {
  id?: string;
  paragraph: string;
  numberOfSentence: number;
  sentence: Array<string>;
}
const ContentSchema: Schema = new Schema(
  {
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
  },

  { timestamps: true },
);

export const Content: Model<IParagraph> = model("Content", ContentSchema);
