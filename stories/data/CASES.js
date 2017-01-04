module.exports = new Array(1001).join('_').split('')
  .map((a, i) => {
    const padded = new Array(5).join('0') + i;
    return padded.substring(padded.length - 5);
  });
