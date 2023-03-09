import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { firestore } from ".";

export async function addFirebase(value) {
    console.log(value);
    
    try {
        await addDoc(collection(firestore, 'events'), {
            title: value.title,
            price: Number.parseFloat(value.extendedProps.price),
            date: value.date,
        })
    } catch (error) {
        console.log(error);
    }
}

export async function getAllFirebase() {
    try {
        const events = [];
        const q = query(collection(firestore, "events"));
        const qSnapshot = await getDocs(q);

        qSnapshot.forEach((doc) => {
            events.push({
                firebaseId: doc.id,
                ...doc.data()
            });
        });
        console.log(events);
        return events;
    } catch (error) {
        console.log(error);
    }
}