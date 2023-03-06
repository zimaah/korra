import ReactDOM from 'react-dom';
import React from 'react';
import DemoApp from './components/calendar/calendar';
import { persistence } from './engine/persistence';

const add = await persistence.add()
console.log(add);

const remove = await persistence.remove(0).catch((err) => {
    console.log("error", err)
})
console.log(`remove`, remove);

const get = await persistence.get(20)
console.log(get);

const getAll = await persistence.getAll()
console.log(getAll);

ReactDOM.render(<DemoApp/>, document.getElementById("app"));