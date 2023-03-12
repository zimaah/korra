import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { firestore } from ".";

export async function addFirebase(value) {    
    try {
        console.log(`value`, value);
        if (value.extendedProps.firebaseId) {
            const eventRef = doc(firestore, "events", value.extendedProps.firebaseId)
            console.log(eventRef);
            return updateDoc(eventRef, value)
        }

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
                firebaseRef: doc.ref,
                ...doc.data()
            });
        });
        return events;
    } catch (error) {
        console.log(error);
    }
}

export async function removeFirebase(ref) {
    try {
        console.log(ref, ref.path);
        return deleteDoc(doc(firestore, ref.path))
    } catch (error) {
        console.log(error);
    }   
}