/* 
You're embarking on a construction project, aiming to create a wooden fence using discarded wood pieces.
Your plan is to utilize there pieces as the planks that make up your fence. An intrinsic rule that you must follow is that every plank in your fence must be the same length.
There is a possibility that you have two smaller pieces of wood whose total length equal the required plank length. In this scenario, you can bind them together to birth a fully-grown plank.
Yet one must remember that the permit only allows fusing two pieces of wood together to form a plank, as adding a third would cpmpromise the fence's strength. Also, there are restrictions on the tools, allowing you only a hammer and nails; this denies you there opportunity to reduce the sizes of the wood pieces (since you don't have access to a saw)
Comming to your arsenal, you have an array named 'wood' at your disposal. Each entry inthis array represents the length of the individual wood pieces you have in you possession.
Setting food on this journey, your objective is to maximize the length of the fence you construct, i.e., to have as many planks on your fence as possible. You have the freedom to determine the length of the planks, and subsequently, the height of the fence. Moreover, you have the liberty to choose how you can assemble the pieces of wood from your collection.
Inquire yourself, what's the maximum number of planks that you can incorporate intro your wooden fence? This indeed is the answer you seek
Example 1:
Input: [22,12,13,22,22,22,14,22,17,22]
Output: 6
Explanation: The optimal planks 22 length can be used. We have six pieses of wood that can be used as plancs. Other remaining planks, thete is no combination of any two planks wich lead to 22.

Example 2:
Input: [8,13,7,13,5,13,4,13,6,13]
Output: 7
Explanation: You can use 5 planks of length 13. Then 2 planks can be combined 8+5=13 and 2 other planks 7+6=13. Wich will give you 7 planks in total.

Constaraints

var solution = function(wood) {
	// write your solution here
	return -1
	}
		
	 !README:
	 !DO NOT CHANGE the code below, we use it to test your solution
	 
	 const k = readline().split(' ').map(n => parseInt(n))
	 const output = solution(k)
	 console.log(output)
*/

import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

var solution = function (wood) {
  let count = {}
  let planks = 0

  // Подсчитываем количество каждого куска дерева
  for (let piece of wood) {
    if (count[piece]) {
      count[piece]++
    } else {
      count[piece] = 1
    }
  }

  // Находим максимальное количество досок
  for (let length in count) {
    let numPieces = count[length]
    // Используем целые куски дерева
    planks += Math.floor(numPieces / 2)
    count[length] = numPieces % 2
  }

  // Проверяем возможность объединения двух кусков дерева для создания доски
  for (let length in count) {
    if (count[length] > 0) {
      for (let otherLength in count) {
        if (
          count[otherLength] > 0 &&
          parseInt(length) + parseInt(otherLength) === parseInt(length)
        ) {
          planks++
          count[length]--
          count[otherLength]--
          break
        }
      }
    }
  }

  return planks
}

/**
 * README:
 * DO NOT CHANGE the code below, we use it to test your solution
 */

rl.question('Enter wood pieces: ', (input) => {
  const k = JSON.parse(input)
  const output = solution(k)
  console.log(output)
  rl.close()
})
