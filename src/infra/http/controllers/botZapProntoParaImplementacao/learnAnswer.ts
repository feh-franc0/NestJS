// Função para remover pontuação e converter para minúsculas
function preprocessMessage (message: string): string {
  return message.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}

// Função para calcular a similaridade entre duas strings
function calculateSimilarity (str1: string, str2: string): number {
  const words1: string[] = str1.split(' ');
  const words2: string[] = str2.split(' ');

  let commonWords: number = 0;

  for (let word1 of words1) {
    for (let word2 of words2) {
      if (word1 === word2) {
        commonWords++;
      }
    }
  }

  return commonWords / Math.max(words1.length, words2.length);
}

// Função para calcular a distância de Levenshtein entre duas strings
function levenshteinDistance (str1: string, str2: string): number {
  const m: number = str1.length;
  const n: number = str2.length;
  const dp: number[][] = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

// Função para calcular a pontuação da correspondência
function calculateScore (userWords: string[], qaWords: string[]): number {
  let score: number = 0;

  for (let i = 0; i < userWords.length - 1; i++) {
    const bigram: string = userWords[i] + ' ' + userWords[i + 1];
    if (qaWords.includes(bigram)) {
      score++;
    }
  }

  return score;
}

// Função para encontrar a resposta mais adequada
function findBestResponse (userMessage: string, qaPairs: { message_person: string; message_bot: string; }[]): string {
  let bestMatch: { index: number; score: number; } = { index: -1, score: 0 };

  const userWords: string[] = preprocessMessage(userMessage).split(' ');

  qaPairs.forEach((pair, index) => {
    const qaWords: string[] = preprocessMessage(pair.message_person).split(' ');
    const score: number = calculateScore(userWords, qaWords);
    if (score > bestMatch.score) {
      bestMatch = { index, score };
    }
  });

  // Defina um limite de pontuação abaixo do qual não consideraremos uma correspondência adequada
  const scoreThreshold: number = 1; // Ajuste conforme necessário

  if (bestMatch.score >= scoreThreshold) {
    return qaPairs[bestMatch.index].message_bot;
  } else {
    let bestSimilarity: number = 0;
    let bestDistance: number = Infinity;
    let bestResponse: string = "Desculpe, eu não entendi. Como posso ajudar?";

    qaPairs.forEach(pair => {
      const similarity: number = calculateSimilarity(userMessage, pair.message_person);
      const distance: number = levenshteinDistance(userMessage, pair.message_person);
      if (similarity > bestSimilarity || (similarity === bestSimilarity && distance < bestDistance)) {
        bestSimilarity = similarity;
        bestDistance = distance;
        bestResponse = pair.message_bot;
      }
    });

    return bestResponse;
  }
}

export { findBestResponse };
