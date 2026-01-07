exports.validate_number = (value, name = "score") => {
  const num = Number(value);

  if (!Number.isFinite(num)) {
    throw new Error(
      `[Score Validation Error] ${name} must be a finite number. Received: ${value}`
    );
  }

  return num;
};
