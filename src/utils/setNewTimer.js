const newTimer = (prevTime) => {
  const newSeconds = prevTime.seconds + 1;
  if (newSeconds === 60) {
    const newMinutes = prevTime.minutes + 1;
    if (newMinutes === 60) {
      return { hours: prevTime.hours + 1, minutes: 0, seconds: 0 };
    }
    return { ...prevTime, minutes: newMinutes, seconds: 0 };
  }
  return { ...prevTime, seconds: newSeconds };
};
export default newTimer