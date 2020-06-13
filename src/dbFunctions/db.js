import Datastore from 'react-native-local-mongodb';

const db = new Datastore({ filename: 'asyncStorageKey', autoload: true });
export default db;

// Format of all data

// # Goal
//    {
        // type: "goal",
        // habitCount: Number,
        // habits: Number[], // array of numbers with _id field of habit
        // toDoCount: Number,
        // toDos: Number[] // array of numbers with _id field of to do
        // title: String
//    }

// # To Do
// # Habit