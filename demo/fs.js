import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, "test", "text.txt");

// fs.mkdir(path.join(__dirname, "test"), (err) => {
//   if (err) {
//     throw err;
//   }

//   console.log("Папка создана");
// });

// fs.writeFile(filePath, "Hello NodeJS!", (err) => {
//   if (err) {
//     throw err;
//   }

//   console.log("Файл создан!");
// });

// fs.appendFile(filePath, "\nHello Again!", (err) => {
//   if (err) {
//     throw err;
//   }

//   console.log("Текст добавлен!");
// });

fs.readFile(filePath, "utf-8", (err, content) => {
  if (err) {
    throw err;
  }
  console.log(content);

  const data = Buffer.from(content);
  console.log("Content:\n", content);
  console.log("Content:\n", data.toString());
});
