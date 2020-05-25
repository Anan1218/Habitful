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


export const getGoals = (callbackFunction) => {
  console.log("getGoals called1");
  db.find({ type: "goal" }, function(err, docs) {
    if (err) {
      console.error(err);
    }
    // console.log(docs);
    console.log("getGoals called");
    
    return callbackFunction(docs)
  });

  
 
  
};

