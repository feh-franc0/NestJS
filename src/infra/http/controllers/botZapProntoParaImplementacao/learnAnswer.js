// Função para remover pontuação e converter para minúsculas
function preprocessMessage(message) {
  return message.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
}

// Função para calcular a similaridade entre duas strings
function calculateSimilarity(str1, str2) {
  const words1 = str1.split(' ')
  const words2 = str2.split(' ')

  let commonWords = 0

  for (const word1 of words1) {
    for (const word2 of words2) {
      if (word1 === word2) {
        commonWords++
      }
    }
  }

  return commonWords / Math.max(words1.length, words2.length)
}

// Função para calcular a distância de Levenshtein entre duas strings
function levenshteinDistance(str1, str2) {
  const m = str1.length
  const n = str2.length
  const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0))

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j
      } else if (j === 0) {
        dp[i][j] = i
      } else if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1])
      }
    }
  }

  return dp[m][n]
}

// Função para calcular a pontuação da correspondência
function calculateScore(userWords, qaWords) {
  let score = 0

  for (let i = 0; i < userWords.length - 1; i++) {
    const bigram = userWords[i] + ' ' + userWords[i + 1]
    if (qaWords.includes(bigram)) {
      score++
    }
  }

  return score
}

// Função para encontrar a resposta mais adequada
function findBestResponse(userMessage, qaPairs) {
  let bestMatch = { index: -1, score: 0 }

  const userWords = preprocessMessage(userMessage).split(' ')

  qaPairs.forEach((pair, index) => {
    const qaWords = preprocessMessage(pair.message_person).split(' ')
    const score = calculateScore(userWords, qaWords)
    if (score > bestMatch.score) {
      bestMatch = { index, score }
    }
  })

  // Defina um limite de pontuação abaixo do qual não consideraremos uma correspondência adequada
  const scoreThreshold = 1 // Ajuste conforme necessário

  if (bestMatch.score >= scoreThreshold) {
    return qaPairs[bestMatch.index].message_bot
  } else {
    let bestSimilarity = 0
    let bestDistance = Infinity
    let bestResponse = 'Desculpe, eu não entendi. Como posso ajudar?'

    qaPairs.forEach((pair) => {
      const similarity = calculateSimilarity(userMessage, pair.message_person)
      const distance = levenshteinDistance(userMessage, pair.message_person)
      if (
        similarity > bestSimilarity ||
        (similarity === bestSimilarity && distance < bestDistance)
      ) {
        bestSimilarity = similarity
        bestDistance = distance
        bestResponse = pair.message_bot
      }
    })

    return bestResponse
  }
}

module.exports = {
  findBestResponse,
}
