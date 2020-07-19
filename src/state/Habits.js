import React, { Component } from "react";
import HabitManager from "../classes/HabitManager";
import Habit from "../classes/Habit";

let Habits = {};
let HabitManagers = {};
let HabitComponents = {};
let numCompleted = 0;
let numSkipped = 0;
let updateCompletedFunction = () => {};
const simpleUpdate = (habits) => {
  numCompleted = 0;
  numSkipped = 0;
  for (const habit of habits) {
    if (habit.completed) {
      numCompleted = numCompleted + 1;
    } else {
      numSkipped = numSkipped + 1;
    }
  }
  
  updateCompletedFunction(numCompleted, numSkipped);
}
const changeHabits = (habits, deleteHabit, navigate, updateCompleted) => {
  Habits = habits;
  let formattedHabits = {};
  let formattedHabitComponents = {};
  console.log("in changeHabits");
  numCompleted = 0;
  numSkipped = 0;
  for (const habit of habits) {
    formattedHabits[habit._id] = (
      <HabitManager
        id={habit._id}
        deleteHabit={deleteHabit}
        title={habit.title}
        key={habit._id}
        description={habit.description}
        navigate={navigate}
        completed={habit.completed}
        color={habit.color}
        iconName={habit.iconName}
      />
    );
    formattedHabitComponents[habit._id] = (
      <Habit
        id={habit._id}
        title={habit.title}
        description={habit.description}
        completed={habit.completed}
        color={habit.color}
        iconName={habit.iconName}
      />
    );

    if (habit.completed) {
      numCompleted = numCompleted + 1;
    } else {
      numSkipped = numSkipped + 1;
    }
  }
  
  if (numCompleted === 0 && numSkipped === 0) {
    numCompleted = 0;
    numSkipped = 1;
  }
  
  if (updateCompleted) {
    updateCompletedFunction = updateCompleted;
  }
  
  updateCompletedFunction(numCompleted, numSkipped);
  HabitManagers = formattedHabits;
  HabitComponents = formattedHabitComponents;
  console.log(HabitManagers);
};
export {
  Habits,
  changeHabits,
  HabitManagers,
  HabitComponents,
  numCompleted,
  numSkipped,
  simpleUpdate
};
