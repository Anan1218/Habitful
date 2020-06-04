import db from "./db.js";

export const addHabit = (title, description, goalID) => {
  const newHabit = {
    type: "habit",
    goal: goalID,
    title: title,
    description: description,
    completedDays: [],
    skippedDays: []
  };
  db.insert(newHabit, function(err, newDocs) {
    if (err) {
      console.error(err);
    }
  });
};

export const getHabits = callbackFunction => {
  db.find({ type: "habit" }, function(err, docs) {
    if (err) {
      console.error(err);
    }
    return callbackFunction(docs);
  });
};

export const removeHabit = id => {
  db.remove({ _id: id, type: "habit" }, {}, function(err, numRemoved) {
    if (err) {
      console.error(err);
    }
  });
};

export const updateHabit = (oldTitle, newTitle, newDescription, newGoalID) => {
  db.update(
    { title: oldTitle },
    { $set: { title: newTitle, description: newDescription, goal: newGoalID } },
    {},
    function(err, numReplaced) {
      if (err) {
        console.error(err);
      }
    }
  );
};

export const deleteAllHabits = () => {
  db.remove({ type: "habit" }, { multi: true }, function(err, numRemoved) {
    if (err) {
      console.error(err);
    }
  });
};
