import { results } from './result.js'

// Функция для подсчета частоты каждого числа
function countFrequency(numbers) {
  const frequency = {}

  numbers.forEach((row) => {
    row.forEach((number) => {
      if (!frequency[number]) {
        frequency[number] = 0
      }
      frequency[number]++
    })
  })

  return frequency
}

// Функция для получения наиболее часто выпадающих чисел
function getMostFrequentNumbers(frequency) {
  const sortedNumbers = Object.entries(frequency).sort((a, b) => b[1] - a[1])
  return sortedNumbers.slice(0, 6).map((number) => parseInt(number[0]))
}

// Вычисляем частоту и получаем "горячие" числа
const frequency = countFrequency(results)
const hotNumbers = getMostFrequentNumbers(frequency)

console.log('Наиболее вероятные числа для следующего розыгрыша:', hotNumbers)

// Функция для проверки, содержится ли результат в массиве
function containsResult(draws, result) {
  // Сортируем результат для последующего сравнения
  const sortedResult = result.slice().sort((a, b) => a - b)

  // Проверяем каждый розыгрыш на соответствие результату
  return draws.some((draw) => {
    const sortedDraw = draw.slice().sort((a, b) => a - b)
    return sortedDraw.every((num, index) => num === sortedResult[index])
  })
}

const newResult = [10, 25, 31, 32, 42, 49]
const isPresent = containsResult(results, newResult)

console.log(`Встречалась ли ставка ${newResult} ранее в розыгрыше:`, isPresent) // Выведет true или falseы
