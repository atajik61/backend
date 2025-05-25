import fs from "fs";

export const getProverbs = () => {
  return JSON.parse(fs.readFileSync("proverbs.json", "utf-8"));
};
export const saveProverbs = (proverbs) => {
  fs.writeFileSync("proverbs.json", JSON.stringify(proverbs, null, 2));
};
