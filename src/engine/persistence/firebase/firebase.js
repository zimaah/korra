import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { firestore } from ".";

export async function addFirebase(value) {
    try {
        const event = {
            title: value.title,
            price: Number.parseFloat(value.extendedProps.price),
            date: value.date,
            distance: value.extendedProps.distance,
            eventLink: value.extendedProps.eventLink,
            equipment: value.extendedProps.equipment,
            observation: value.extendedProps.observation
        }

        console.log(`value`, value)
        console.log(`event`, event)

        if (value.extendedProps.firebaseId) {
            const eventRef = doc(firestore, "events", value.extendedProps.firebaseId)
            console.log(eventRef);
            return updateDoc(eventRef, event)
        }

        await addDoc(collection(firestore, 'events'), event)
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