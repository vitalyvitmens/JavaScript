//! Задача на рефакторинг кода
import React, { useState, useEffect } from "react";

const PleaseReviewTitle = () => {
  const [count, setCount] = useState(1);
  const [items, setItems] = useState([{ id: 1 }]);

  useEffect(() => {
    const handleClick = () => {
      const intervalId = setInterval(() => console.log(count), 1000);
      return () => clearInterval(intervalId);
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [count]);

  const handleButtonClick = () => {
    setCount((prevCount) => prevCount + 1);
    setItems((prevItems) => [...prevItems, { id: prevCount + 1 }]);
  };

  return (
    <React.Fragment>
      Current count: {count}
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.id}</li>
        ))}
      </ul>
      <button onClick={handleButtonClick}>add one</button>
    </React.Fragment>
  );
};

export default PleaseReviewTitle;

//! Задача на контекст
var a = {
  firstName: "Bill",
  lastName: "Ivanov",
  sayName: function () {
    console.log(this.firstName);
  },
  sayLastName: () => {
    console.log(this.lastName);
  },
};

// Вызов метода объекта a
a.sayName(); // 'Bill'

// Присваивание метода переменной
var b = a.sayName;
b(); // undefined, так как контекст потерян

// Привязка контекста к функции
a.sayName.bind({ firstName: "Boris" })(); // 'Boris'

// Вызов метода объекта a
a.sayName(); // 'Bill'

// Вызов стрелочной функции
a.sayLastName(); // undefined, так как стрелочная функция не имеет своего контекста и this указывает на глобальный объект

// Привязка контекста к функции
a.sayName.bind({ firstName: "Boris" }).bind({ firstName: "Tom" })(); // 'Boris', так как bind можно применить только один раз

// Привязка контекста к стрелочной функции не работает
a.sayLastName.bind({ lastName: "Petrov" })(); // undefined, так как стрелочная функция не имеет своего контекста

//! Задача на event loop (порядок вывода значений)
console.log("start"); // 1. Сразу выводится 'start'

setTimeout(() => console.log("timeout"), 0); // 8. Выводится предпоследним, так как это макрозадача

new Promise((resolve, reject) => {
  console.log("promise constructor"); // 2. Сразу выводится 'promise constructor'

  setTimeout(() => console.log("timeout2"), 0); // 9. Выводится последним, так как это макрозадача

  reject();
})
  .then(() => console.log("promise")) // 0. Не выполняется, так как промис отклонен
  .catch(() => console.log("promise1")) // 4. Выполняется первым из микрозадач, выводится 'promise1'
  .catch(() => console.log("promise2")) // 5. Выполняется вторым из микрозадач, выводится 'promise2'
  .then(() => console.log("promise3")) // 6. Выполняется третьим из микрозадач, выводится 'promise3'
  .then(() => console.log("promise4")); // 7. Выполняется четвертым из микрозадач, выводится 'promise4'

console.log("final"); // 3. Сразу выводится 'final'

// 1. start
// 2. promise constructor
// 3. final
// 4. promise1
// 5. promise2
// 6. promise3
// 7. promise4
// 8. timeout
// 9. timeout2

//! Задача написать полифил, который реализует метод some для массива
// [2, 5, 8, 1, 4].mySome((el) => el > 10); --------> false
// [12, 5, 8, 1, 4].mySome((el) => el > 10); --------> true

Array.prototype.mySome = function (callback) {
  // Проходим по каждому элементу массива
  for (let i = 0; i < this.length; i++) {
    // Если callback возвращает true для любого элемента, возвращаем true
    if (callback(this[i], i, this)) {
      return true;
    }
  }
  // Если ни один элемент не удовлетворяет условию, возвращаем false
  return false;
};

//! Реализовать функцию parse, которая будет преобразовывать CSV-данные в нужный формат:
/*
Input:

id, firstName, LastName, quote
42e9f,Linus,Torvalds,Talk is cheap. Show me the code.

4f5e4,Joel,Spolsky,It’s harder to read code than to write it.

Expected output:
{
id: '42e9f',
firstName: 'Linus',
lastName: 'Torvalds',
quote: ‘Talk is cheap. Show me the code.'
},
{
id: '4fSe4',
firstName: 'Joel',
lastName: 'Spolsky',
quote: ‘It’s harder to read code than to write it.'
}
*/ 
function parse(csv) {
  // Разделяем строки по новой строке
  const lines = csv.trim().split("\n");

  // Извлекаем заголовки
  const headers = lines[0].split(",");

  // Проходим по каждой строке данных
  const result = lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj = {};

    // Создаем объект с ключами из заголовков и значениями из строки
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index].trim();
    });

    return obj;
  });

  // Форматируем результат в нужный вид
  result.forEach((item) => {
    console.log(`id: '${item.id}',`);
    console.log(`firstName: '${item.firstName}',`);
    console.log(`lastName: '${item.lastName}',`);
    console.log(`quote: '${item.quote}'`);
    console.log("");
  });
}

// Пример использования
const csvData = `
id,firstName,lastName,quote
42e9f,Linus,Torvalds,Talk is cheap. Show me the code.
4f5e4,Joel,Spolsky,It’s harder to read code than to write it.
`;

parse(csvData);

// Этот код выполняет следующие шаги:
// 1. Разделяет входные данные на строки.
// 2. Извлекает заголовки из первой строки.
// 3. Проходит по каждой строке данных, создавая объект с ключами из заголовков и значениями из строки.
// 4. Форматирует и выводит результат в нужном виде.
