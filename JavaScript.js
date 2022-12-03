import chalk from "chalk";
import { text } from "./data.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

console.log(chalk.green(text));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);
console.log(__filename);
