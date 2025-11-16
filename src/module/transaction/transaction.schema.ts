import { targetConstructorToSchema } from "class-validator-jsonschema";
import { CreditInCallback } from "../../dto/callback";

const tags = ["Transactions"];
export const creditInSchema = {
  creditIn: { tags, body: targetConstructorToSchema(CreditInCallback) },
};