import db from "./db.js";

export const addHabit = (title, description, iconName, color) => {
  const newHabit = {
    type: "habit",
    title: title,
    description: description,
    completedDays: [],
    skippedDays: [],
    completed: false,
    iconName: iconName,
    color: color
  };
  db.insert(newHabit, function(err, newDocs) {
    if (err) {
      console.error(err);
    }
  });
};

export const getHabits = (callbackFunction, performStartup) => {
  db.find({ type: "habit" }, function(err, docs) {
    if (err) {
      console.error(err);
    }
    return callbackFunction(docs, performStartup);
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

export const addSkipped = (id, newDates, callbackFunction) => {
  db.update(
    { _id: id, type: "habit" },
    { $addToSet: { skippedDays: { $each: newDates } } },
    {},
    function(err, numReplaced) {
      if (err) {
        console.error(err);
      }
      if (callbackFunction) {
        callbackFunction();
      }
      
    }
  );
};

export const addCompleted = (id, newDates, callbackFunction) => {
  console.log("in addCompleted");
  db.update(
    { _id: id, type: "habit" },
    { $addToSet: { completedDays: { $each: newDates } } },
    {},
    function(err, numReplaced) {
      if (err) {
        console.error(err);
      }
      if (callbackFunction) {
        callbackFunction();
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

export const removeSkipped = (id, date, callbackFunction) => {
  
  db.find({type: 'habit', _id: id}, function(err, docs) {
    if (err) {
      console.error(err);
    }
    let newDates = [];
    for(let skippedDate of docs[0]["skippedDays"]) {
      if (skippedDate.getTime() != date.getTime()) {
        newDates.push(skippedDate);
      }
    }
    db.update({type: 'habit', _id: id}, {$set:  {skippedDays: newDates}}, function(err, numReplaced) {
      console.log("in removeSkipped: "+numReplaced);
      if (err) {
        console.error(err);
      }
      if (callbackFunction) {
        callbackFunction();
      }
      
    })
  })
}
export const removeCompleted = (id, date, callbackFunction) => {
  db.find({type: 'habit', _id: id}, function(err, docs) {
    if (err) {
      console.error(err);
    }
    let newDates = [];
    for(let completedDate of docs[0]["completedDays"]) {
      if (completedDate.getTime() !== date.getTime()) {
        newDates.push(completedDate);
      }
    }
    db.update({type: 'habit', _id: id}, {$set: {completedDays: newDates}}, function(err, numReplaced) {
      console.log("in removeCompleted: "+numReplaced);
      if (err) {
        console.error(err);
      }
      if (callbackFunction) {
        callbackFunction();
      }
      
    })
  })
}
