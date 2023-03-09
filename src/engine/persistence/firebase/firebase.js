import { addDoc, collection } from "firebase/firestore";
import { firestore } from ".";

export async function addFirebase(value) {
    console.log(value);
    
    try {
        await addDoc(collection(firestore, 'events'), {
            title: value.title,
            price: value.extendedProps.price,
            date: value.date,
        })
    } catch (error) {
        console.log(error);
    }
}