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

const newResult = [36, 5, 45, 13, 21, 29]
const isPresent = containsResult(results, newResult)

console.log(`Встречалась ли ставка ${newResult} ранее в розыгрыше:`, isPresent) // Выведет true или falseы

// Функция для подсчета частоты каждого числа в массиве результатов
function countNumbersFrequency(results) {
  const frequency2 = {}

  // Подсчет частоты каждого числа
  results.flat().forEach((number) => {
    frequency2[number] = (frequency2[number] || 0) + 1
  })

  // Создание массива из объектов и сортировка по убыванию частоты
  const sortedFrequency = Object.keys(frequency2)
    .map((key) => ({ number: key, count: frequency2[key] }))
    .sort((a, b) => b.count - a.count)

  return sortedFrequency
}

// Пример использования функции
const numberFrequency = countNumbersFrequency(results)
console.log(numberFrequency)

// Функция для нахождения всех уникальных пар чисел
function findTopNumberPairs(results, topN = 10) {
  const pairsFrequency = {}

  // Функция для добавления пары в словарь частот
  function addPairToFrequency(pair) {
    const sortedPair = pair.sort((a, b) => a - b).join('-')
    pairsFrequency[sortedPair] = (pairsFrequency[sortedPair] || 0) + 1
  }

  // Перебор всех тиражей
  results.forEach((draw) => {
    // Перебор всех возможных пар чисел в тираже
    for (let i = 0; i < draw.length; i++) {
      for (let j = i + 1; j < draw.length; j++) {
        addPairToFrequency([draw[i], draw[j]])
      }
    }
  })

  // Преобразование словаря частот в массив и сортировка по убыванию частоты
  const sortedPairs = Object.entries(pairsFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map((pair) => `${pair[0]}: ${pair[1]} раз`)

  return sortedPairs
}

// Пример использования функции
const topPairs = findTopNumberPairs(results)
console.log('Топ 10 пар чисел с самой высокой вероятностью выпадения:')
topPairs.forEach((pair) => console.log(pair))

// Функция для подсчета частоты каждого числа и пар в топ-10 парах
function countFrequencyAndPairs(topPairs) {
  const frequency = {}
  const pairs = {}

  topPairs.forEach((pairWithCount) => {
    const [pair, count] = pairWithCount.split(': ')
    const [num1, num2] = pair.split('-').map(Number)
    const pairCount = parseInt(count.split(' ')[0])

    // Подсчет частоты для каждого числа
    frequency[num1] = (frequency[num1] || 0) + pairCount
    frequency[num2] = (frequency[num2] || 0) + pairCount

    // Сохранение информации о парах
    pairs[pair] = pairCount
  })

  return { frequency, pairs }
}

// Функция для выбора 6 чисел для ставки, учитывая пары
function selectNumbersConsideringPairs(topPairs) {
  const { frequency, pairs } = countFrequencyAndPairs(topPairs)
  const selectedNumbers = []
  const usedPairs = new Set()

  // Сортировка пар по убыванию частоты
  const sortedPairs = Object.entries(pairs).sort((a, b) => b[1] - a[1])

  for (const [pair, _] of sortedPairs) {
    const [num1, num2] = pair.split('-').map(Number)

    // Добавление чисел из пары, если они еще не были выбраны и не образуют полную пару с уже выбранными числами
    if (!selectedNumbers.includes(num1) && !usedPairs.has(num1)) {
      selectedNumbers.push(num1)
      usedPairs.add(num2) // Добавляем второе число пары в использованные, чтобы избежать его повторного выбора
    }
    if (!selectedNumbers.includes(num2) && !usedPairs.has(num2)) {
      selectedNumbers.push(num2)
      usedPairs.add(num1) // Аналогично для первого числа пары
    }

    // Остановка выбора, когда набрано 6 чисел
    if (selectedNumbers.length >= 6) {
      break
    }
  }

  // Если выбрано меньше 6 чисел, добавляем оставшиеся наиболее частые числа
  if (selectedNumbers.length < 6) {
    const sortedNumbers = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .map((entry) => Number(entry[0]))

    for (const number of sortedNumbers) {
      if (!selectedNumbers.includes(number) && !usedPairs.has(number)) {
        selectedNumbers.push(number)
      }
      if (selectedNumbers.length >= 6) {
        break
      }
    }
  }

  return selectedNumbers
}

// Пример использования функции
const numbersForBet = selectNumbersConsideringPairs(topPairs)
console.log('Выбранные числа для ставки:', numbersForBet.join(', '))

// Функция для нахождения всех уникальных троек чисел
function findTopTriplets(results, topN = 10) {
  const tripletsFrequency = {}

  // Функция для добавления тройки в словарь частот
  function addTripletToFrequency(triplet) {
    const sortedTriplet = triplet.sort((a, b) => a - b).join('-')
    tripletsFrequency[sortedTriplet] =
      (tripletsFrequency[sortedTriplet] || 0) + 1
  }

  // Перебор всех тиражей
  results.forEach((draw) => {
    // Перебор всех возможных троек чисел в тираже
    for (let i = 0; i < draw.length; i++) {
      for (let j = i + 1; j < draw.length; j++) {
        for (let k = j + 1; k < draw.length; k++) {
          addTripletToFrequency([draw[i], draw[j], draw[k]])
        }
      }
    }
  })

  // Преобразование словаря частот в массив и сортировка по убыванию частоты
  const sortedTriplets = Object.entries(tripletsFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map((triplet) => `${triplet[0]}: ${triplet[1]} раз`)

  return sortedTriplets
}

// Пример использования функции
const topTriplets = findTopTriplets(results)
console.log('Топ 10 троек чисел с самой высокой вероятностью выпадения:')
topTriplets.forEach((triplet) => console.log(triplet))

// Функция для подсчета частоты каждого числа в топ-10 троек
function countFrequencyInTriplets(topTriplets) {
  const frequency = {}

  topTriplets.forEach((tripletWithCount) => {
    const [triplet, count] = tripletWithCount.split(': ')
    const numbers = triplet.split('-').map(Number)
    const tripletCount = parseInt(count.split(' ')[0])

    // Подсчет частоты для каждого числа в тройке
    numbers.forEach((number) => {
      frequency[number] = (frequency[number] || 0) + tripletCount
    })
  })

  return frequency
}

// Функция для выбора 6 чисел для ставки
function selectNumbersForBetFromTriplets(topTriplets) {
  const frequency = countFrequencyInTriplets(topTriplets)
  const sortedNumbers = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0])

  // Выбор первых 6 уникальных чисел
  return sortedNumbers.slice(0, 6)
}

// Пример использования функции
const numbersForBet2 = selectNumbersForBetFromTriplets(topTriplets)
console.log('Выбранные числа для ставки:', numbersForBet2.join(', '))
