import fs from "fs";
import path from "path";

// fs.mkdir(path.join(__dirname, "test"), (err) => {
//   if (err) {
//     throw err;
//   }

//   console.log("Папка создана");
// });

// import filePath from path.join(__dirname, "test", "text.txt");

const filePath = path.join("demo", "test", "text.txt");

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

  //   const data = Buffer.from(content);
  //   console.log("Content:", content);
  //   console.log("Content:", data.toString());
});
