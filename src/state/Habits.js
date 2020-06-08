import React, { Component } from "react";
import HabitManager from "../classes/HabitManager";
import Habit from "../classes/Habit";

let Habits = {};
let HabitManagers = {};
let HabitComponents = {};

const changeHabits = (habits, deleteHabit, editHabit, navigate) => {
  Habits = habits;
  let formattedHabits = {};
  let formattedHabitComponents = {};
  for (const habit of habits) {
    formattedHabits[habit._id] = (
      <HabitManager
        id={habit._id}
        deleteHabit={deleteHabit}
        editHabit={editHabit}
        title={habit.title}
        key={habit.title}
        description={habit.description}
        navigate={navigate}
      />
    );
    formattedHabitComponents[habit._id] = <Habit title={habit.title} />
  }
  HabitManagers = formattedHabits;
  HabitComponents = formattedHabitComponents;
};
export { Habits, changeHabits, HabitManagers, HabitComponents };

