import { results } from "./result.js"

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
