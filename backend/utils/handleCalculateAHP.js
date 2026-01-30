const sanitizeWeights = (weights) => {
  const REQUIRED_KEYS = ["budget", "scenery", "activity", "weather"];
  const clean = {};

  for (const key of REQUIRED_KEYS) {
    const value = Number(weights[key]);
    clean[key] = Number.isFinite(value) && value > 0 ? value : 1;
  }

  return clean;
};

const buildingPairwiseMatrix = (weights) => {
  const keys = Object.keys(weights);
  const n = keys.length;

  const matrix = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const a = weights[keys[i]];
      const b = weights[keys[j]];
      matrix[i][j] = b !== 0 ? a / b : 1;
    }
  }
  return { matrix, keys };
};

const normalizingMatrix = (matrix) => {
  const n = matrix.length;
  const colSums = Array(n).fill(0);

  // Column sums
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      colSums[j] += matrix[i][j];
    }
  }

  // Normalize
  const normalized = matrix.map((row) =>
    row.map((value, j) => value / colSums[j])
  );

  return normalized;
};

const calculatedAHPWeight = (keys, normalized_matrix) => {
  const n = normalized_matrix.length;

  const weight_array = normalized_matrix.map(
    (row) =>
      row.reduce((sum, val) => sum + (Number.isFinite(val) ? val : 0), 0) / n
  );

  const result = {};
  keys.forEach((key, i) => {
    result[key] = Number(weight_array[i].toFixed(5));
  });
  return result;
};

exports.handleCalculateAHP = (weights) => {
  const clean_weights = sanitizeWeights(weights);
  // console.log("Weight received: ", weights)
  const { matrix, keys } = buildingPairwiseMatrix(clean_weights);

  // console.log("Result of 1st:", matrix, keys);

  const normalized_matrix = normalizingMatrix(matrix);
  console.log(normalized_matrix);

  const AHP_weight = calculatedAHPWeight(keys, normalized_matrix);

  return AHP_weight;
};
