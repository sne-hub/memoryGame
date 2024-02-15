const winningMessageFormatter = (timer, numberOfMoves) => {
  let seconds = "";
  let minutes = "";
  let hours = "";

  if (timer.seconds > 1 || timer.seconds === 0) {
    seconds = `${timer.seconds} seconds`;
  }
  if (timer.seconds === 1) {
    seconds = `${timer.seconds} second`;
  }
  if (timer.minutes > 1) {
    minutes = `${timer.minutes} minutes`;
  }
  if (timer.minutes === 1) {
    minutes = `${timer.minutes} minute`;
  }
  if (timer.hours > 1) {
    hours = `${timer.hours} hours`;
  }
  if (timer.hours === 1) {
    hours = `${timer.hours} hour`;
  }
  if (!timer.minutes) {
    return `congrats! you won in ${seconds} with ${numberOfMoves} moves`;
  }
  if (!timer.hours) {
    return `congrats! you won in ${minutes} and ${seconds} with ${numberOfMoves} moves`;
  } else {
    return `congrats! you won in ${hours}, ${minutes} and ${seconds} with ${numberOfMoves} moves`;
  }
};

export default winningMessageFormatter;
