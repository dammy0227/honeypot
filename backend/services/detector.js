const detectAttack = (input) => {
  const patterns = {
    xss: /<script.*?>|onerror=|onload=|alert\(/i,
    sqli: /(\bUNION\b|\bSELECT\b|\bINSERT\b|\bDROP\b|--|')/i
  };

  for (const [type, regex] of Object.entries(patterns)) {
    if (regex.test(JSON.stringify(input))) {
      return type.toUpperCase();
    } 
  }

  return "Normal";
};

module.exports = { detectAttack };
