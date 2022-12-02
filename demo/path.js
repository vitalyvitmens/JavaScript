import path, { dirname, extname } from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("Название файла:", path.basename(__filename));

console.log("Имя директории:", dirname(__filename));

console.log("Расширение файла:", extname(__filename));

console.log("Parse:", path.parse(__filename));

console.log("Parse:", path.parse(__filename).name);

console.log("Join:", path.join(__dirname, "server", "index.html"));
