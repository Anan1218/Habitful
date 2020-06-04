import db from "./db.js";
import React from "react";

export const addGoal = title => {
  const newGoal = {
    type: "goal",
    habitCount: 0,
    habits: [],
    toDoCount: 0,
    toDos: [],
    title: title
  };
  db.insert(newGoal, function(err, newDocs) {
    if (err) {
      console.error(err);
    }
  });
};

export const getGoals = callbackFunction => {
  db.find({ type: "goal" }, function(err, docs) {
    if (err) {
      console.error(err);
    }
    return callbackFunction(docs);
  });
};

export const removeGoal = id => {
  db.remove({ _id: id, type: "goal" }, {}, function(err, numRemoved) {
    if (err) {
      console.error(err);
    }
  });
};

export const updateGoal = (
  id,
  newTitle,
  habits,
  habitCount,
  toDos,
  toDoCount
) => {
  db.update(
    { _id: id, type: "goal" },
    { $set: { title: newTitle, habits: habits, habitCount: habitCount , toDos: toDos, toDoCount: toDoCount} },
    {},
    function(err, numReplaced) {
      if (err) {
        console.error(err);
      }
    }
  );
};

export const deleteAllGoals = () => {
  db.remove({ type: "goal" }, { multi: true }, function(err, numRemoved) {
    if (err) {
      console.error(err);
    }
  });
};
