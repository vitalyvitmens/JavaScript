# JavaScript

Скачай и установи current version from https://nodejs.org/en/

Запусти от имени админа Windows PowerShell, введи команду: node -v
что бы убедится в установке node js и посмотреть версию
Для запуска файла с расширением .js в терминале выполнить команду: node +название файла можно без расширения,
пример: node index2
пример: node demo/os

Запусти в терминале команду: npm -v
что бы убедится в установке npm (node package manager) и посмотреть версию
далее в терминале проиниацилизируй проект, выполнив команду: npm init
ответив на вопросы создадим файл package.json:
Press ^C at any time to quit.
package name: (sololearn-javascript) sololearn-javascript
version: (1.0.0)
description: Sololearn JavaScript course
entry point: (index.js)
test command:
git repository:
keywords: node, node js
author: vitalyvitmens <vitalyvitmens@gmail.com>
license: (ISC)
About to write to C:\Users\vitaly\Visual Studio Code Projects\sololearn-javascript\package.json:

{
"name": "sololearn-javascript",
"version": "1.0.0",
"description": "Sololearn JavaScript course",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"keywords": [
"node",
"node",
"js"
],
"author": "vitalyvitmens <vitalyvitmens@gmail.com>",
"license": "ISC"
}

Is this OK? (yes) y

<!-- TODO: после строки:  "main": "index.js", -->
<!-- TODO: добавь строку: "type": "module", -->

Если в проекте нет папки node_modules, но есть файл package.json мы можем подтянуть все зависимости выполнив команду: npm i
Устанавливаем пакет chalk выполнив команду: npm i chalk
или команду: npm install chalk
Для установки пакетов для разработки "devDependencies":, пример для пакета nodemon, команда: npm i nodemon -D

Запустить сервер, выполни команду в терминале: node index2
Остановить сервер, выполни команду в терминале: Ctrl + C

Для запуска в хром используй адрес: http://localhost:3000/

Для автообновления страницы сервера при нажатии Ctrl + S добавь в файл packageg.json два скрипта start и dev:
"scripts": {
"start": "node index2.js",
"dev": "nodemon index2.js"
},
и после этого в терминале выполни команду: npm run dev
