import db from "./db.js";

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

export const getGoals = (callbackFunction) => {
  db.find({ type: "goal" }, function(err, docs) {
    if (err) {
      console.error(err);
    }
    console.log(docs);
    console.log("getGoals called");
    callbackFunction(docs)
  });
};
