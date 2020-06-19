import db from "./db.js";

// TODO make sure all documents are created when the app is first opened

export const getLastDateOpened = callback => {
  db.find({ type: "lastDateOpened" }, function(err, docs) {
    if (err) {
      console.error(err);
    }
    callback(docs);
  });
};

export const setLastDateOpened = date => {
  db.update(
    { type: "lastDateOpened" },
    { $set: { lastDateOpened: date } },
    function(err, numUpdated) {
      if (err) {
        console.error(err);
      }
    }
  );
};

export const addLastDateOpenedDoc = () => {
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0, 0);
  db.insert({ lastDateOpened: currentDate, type: "lastDateOpened" }, function(
    err,
    newDocs
  ) {
    if (err) {
      console.error(err);
    }
  });
};

export const getDates = callback => {
  db.find({ type: "dates" }, function(err, docs) {
    if (err) {
      console.error(err);
    }
    callback(docs);
  });
};

export const addDate = (status, date) => {
  let updateDoc = {};
  switch (status) {
    case "partial":
      updateDoc = { $addToSet: { partialDays: date } };
      break;
    case "skipped":
      updateDoc = { $addToSet: { skippedDays: date } };
      break;
    case "perfect":
      updateDoc = { $addToSet: { perfectDays: date } };
      break;
  }

  db.update({ type: "dates" }, updateDoc, function(err, numUpdated) {
    if (err) {
      console.error(err);
    }
  });
};

export const addPartialDay = dates => {
  db.update(
    { type: "dates" },
    { $addToSet: { partialDays: { $each: dates } } },
    function(err, numUpdated) {
      if (err) {
        console.error(err);
      }
    }
  );
};

export const addSkippedDay = dates => {
  db.update(
    { type: "dates" },
    { $addToSet: { skippedDays: { $each: dates } } },
    function(err, numUpdated) {
      if (err) {
        console.error(err);
      }
    }
  );
};

export const addPerfectDay = dates => {
  db.update(
    { type: "dates" },
    { $addToSet: { perfectDays: { $each: dates } } },
    function(err, numUpdated) {
      if (err) {
        console.error(err);
      }
    }
  );
};
export const addDatesDoc = () => {
  db.insert(
    { perfectDays: [], partialDays: [], skippedDays: [], type: "dates" },
    function(err, newDocs) {
      if (err) {
        console.error(err);
      }
    }
  );
};

export const destroyEverything = () => {
  db.remove({}, { multi: true }, function(err, numRemoved) {
    if (err) {
      console.error(err);
    }
  });
};

export const removeSkippedDay = (date) => {
  db.find({type: 'dates'}, function(err, docs) {
    if (err) {
      console.error(err);
    }
    let newDates = [];
    for(let skippedDate of docs[0]["skippedDays"]) {
      if (skippedDate.getTime() != date.getTime()) {
        newDates.push(skippedDate);
      }
    }
    db.update({type: 'dates'}, {$set:  {skippedDays: newDates}}, function(err, numReplaced) {
      if (err) {
        console.error(err);
      }
    })
  })
}

export const removePartialDay = (date) => {
  db.find({type: 'dates'}, function(err, docs) {
    if (err) {
      console.error(err);
    }
    let newDates = [];
    for(let partialDate of docs[0]["partialDays"]) {
      if (partialDate.getTime() != date.getTime()) {
        newDates.push(partialDate);
      }
    }
    db.update({type: 'dates'}, {$set:  {partialDays: newDates}}, function(err, numReplaced) {
      if (err) {
        console.error(err);
      }
    })
  })
}

export const removePerfectDay = (date) => {
  db.find({type: 'dates'}, function(err, docs) {
    if (err) {
      console.error(err);
    }
    let newDates = [];
    for(let perfectDate of docs[0]["perfectDays"]) {
      if (perfectDate.getTime() != date.getTime()) {
        newDates.push(perfectDate);
      }
    }
    db.update({type: 'dates'}, {$set:  {perfectDays: newDates}}, function(err, numReplaced) {
      if (err) {
        console.error(err);
      }
    })
  })
}