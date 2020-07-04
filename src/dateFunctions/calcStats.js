import createMarkedDates from "./createMarkedDates";
import calculateLongestStreak from "./calculateLongestStreak";

const calcStats = (habitDocs, markedDates) => {
    console.log("in calcStats");
  if (habitDocs == []) {
    return;
  }
  let perfectDays = [];
  let partialDays = [];
  let skippedDays = [];
  let daysPast = [];
  const numHabits = habitDocs.length;

  // any Date has to be converted to a unix timestamp with .getTime() because they can only be
  // compared that way.
  for (let habit of habitDocs) {
    for (let completedDay of habit["completedDays"]) {
      completedDay.setHours(0, 0, 0, 0, 0);
      if (!daysPast.includes(completedDay.getTime())) {
        daysPast.push(completedDay.getTime());
      }
    }
    for (let skippedDay of habit["skippedDays"]) {
      skippedDay.setHours(0, 0, 0, 0, 0);
      if (!daysPast.includes(skippedDay.getTime())) {
        daysPast.push(skippedDay.getTime());
      }
    }
  }
  let completedCount = 0;
  for (let day of daysPast) {
    for (let habit of habitDocs) {
      if (habit["completedDays"].map(date => date.getTime()).includes(day)) {
        completedCount++;
      }
    }
    if (completedCount === 0) {
      skippedDays.push(new Date(day));
    } else if (completedCount !== numHabits) {
      partialDays.push(new Date(day));
    } else {
      perfectDays.push(new Date(day));
    }
    completedCount = 0;
  }

  let newMarkedDates = markedDates;
  let formattedDateString;
  let streak = 0;
  if (perfectDays.length > 0) {
    streak = calculateLongestStreak(perfectDays);
  }
  let datesDocs = [
    {
      perfectDays,
      skippedDays,
      partialDays
    }
  ];
  if (perfectDays.length > 0) {
    newMarkedDates = createMarkedDates(
      "perfectDays",
      datesDocs,
      newMarkedDates,
      "#4ee44e"
    );
  }
  if (partialDays.length > 0) {
    newMarkedDates = createMarkedDates(
      "partialDays",
      datesDocs,
      newMarkedDates,
      "#4e99e4"
    );
  }

  if (skippedDays.length > 0) {
    newMarkedDates = createMarkedDates(
      "skippedDays",
      datesDocs,
      newMarkedDates,
      "#e44e4e"
    );
  }
  console.log("end calcStats");
  return {
    markedDates: newMarkedDates,
    perfectCount: perfectDays.length,
    partialCount: partialDays.length,
    skippedCount: skippedDays.length,
    streak: streak
  };
};

export default calcStats;
