import db from "./db.js";

export const addHabit = (title, description) => {
  const newHabit = {
    type: "habit",
    title: title,
    description: description,
    completedDays: [],
    skippedDays: [],
    completed: false
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

export const getHabit = (habitID, callbackFunction) => {
  db.find({ type: "habit", _id: habitID }, function(err, docs) {
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

// TODO add 'completed' field (true or false)
export const updateHabit = (id, newFields, newDates) => {
  console.log("in  updateHabit");
  console.log(id);
  console.log(newFields);
  console.log(newDates);
  db.update(
    { _id: id, type: "habit" },
    { $set: newFields, $addToSet: newDates },
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
