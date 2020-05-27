import db from "./db.js";
import React from "react";
import LongTermGoal from "../classes/LongTermGoal";

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

export const removeGoal = title => {
  db.remove({ title: title }, {}, function(err, numRemoved) {
    if (err) {
      console.error(err);
    }
  });
};

export const updateGoal = (oldTitle, newTitle) => {
  db.update({ title: oldTitle }, {$set: {title: newTitle}}, {}, function(err, numReplaced) {
    if (err) {
      console.error(err);
    }
  });
};

export const deleteAllGoals = () => {
  db.remove({ type: "goal" }, { multi: true }, function(err, numRemoved) {
    if (err) {
      console.error(err);
    }
  });
};
