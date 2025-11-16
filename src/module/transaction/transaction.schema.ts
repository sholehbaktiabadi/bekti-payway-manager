import { targetConstructorToSchema } from "class-validator-jsonschema";
import { IncomingCreditCallback } from "../../dto/callback";

const tags = ["Transactions"];
export const incomingCreditSchema = {
  creditIn: { tags, body: targetConstructorToSchema(IncomingCreditCallback) },
};