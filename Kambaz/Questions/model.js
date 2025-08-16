import mongoose from "mongoose";
import schema from "./schema.js";

const questionModel = mongoose.model("QuestionsModel", schema);
export default questionModel;
