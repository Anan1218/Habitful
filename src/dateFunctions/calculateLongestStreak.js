

export default calculateLongestStreak = perfectDays => {
    if (perfectDays.length == 0) {
      return 0;
    }
    let longestStreak = 1;
    let currentStreak = 1;
    let prevTime = 0;

    const numMillisecondsInDay = 24 * 60 * 60 * 1000;
    perfectDays = perfectDays.sort((day1, day2) => {
      return day1.getTime() > day2.getTime();
    });
    for (let date of perfectDays) {
      if (date.getTime() - prevTime === numMillisecondsInDay) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }

      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }

      prevTime = date.getTime();
    }

    return longestStreak;
  };