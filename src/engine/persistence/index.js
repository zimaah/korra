import { addLocalStorage, getAllLocalStorage, getLocalStorage, removeLocalStorage } from './localStorage';
import { addFirebase } from './firebase/firebase';

// localStorage or firebase
const ENGINE = 'firebase';
let addFunction = () => {};
let removeFunction = () => {};
let getFunction = () => {};
let getAllFunction = () => {};

switch (ENGINE) {
    case 'localStorage': {
        addFunction = (value) => { return addLocalStorage(value) };
        removeFunction = (value) => { return removeLocalStorage(value) };
        getFunction = (value) => { return getLocalStorage(value) };
        getAllFunction = (value) => { return getAllLocalStorage(value) };
        break
    }
    default: addFunction = addFirebase
}

export const persistence = {
    add: addFunction,
    remove: removeFunction,
    get: getFunction,
    getAll: getAllFunction
}