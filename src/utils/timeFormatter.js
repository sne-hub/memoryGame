const timeFormatter = (timer) => {
  return `${timer.hours.toString().padStart(2, "0")}:${timer.minutes
    .toString()
    .padStart(2, "0")}:${timer.seconds.toString().padStart(2, "0")}`;
};

export default timeFormatter;
