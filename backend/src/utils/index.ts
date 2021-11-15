import fs from "fs";
const readline = require("readline");

export async function processFileLineByLine(
  filename: string,
  cb: (line: string) => Promise<void>
): Promise<void> {
  if (!fs.existsSync(filename)) throw new Error("file doesn't exist");

  const stream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    await cb(line);
  }
}
