export function addLocalStorage(value) {
    return new Promise((resolve) => {
        const events = JSON.parse(localStorage.getItem('events')) || []
        const event = {
            id: events.length,
            ...value
        }
        console.log('LocalStoragePersistence:Add', event)
        events.push(event)
        localStorage.setItem('events', JSON.stringify(events))
        resolve(true)
    })
}

export function removeLocalStorage(id) {
    return new Promise((resolve, reject) => {
        console.log('LocalStoragePersistence:Remove', id)
            const events = JSON.parse(localStorage.getItem('events'))

            const index = events.findIndex((ev) => {
                return ev.id === id;
            })

            if (index == -1) {
                console.log("index", index);
                reject(false)
            } else {
                events.splice(index, 1)
                localStorage.setItem('events', JSON.stringify(events))
                resolve(true)
            }
    })
}

export function getLocalStorage(id) {
    return new Promise((resolve) => {
        const events = JSON.parse(localStorage.getItem('events'))
        
        const index = events.findIndex((ev) => {
            return ev.id === id;
        })
        if (index === -1) resolve(false)
        
        const event = events.splice(index, 1)[0];
        console.log('LocalStoragePersistence:Get', event)
        resolve(event)
    })
}

export function getAllLocalStorage() {
    return new Promise((resolve) => {
        const events = JSON.parse(localStorage.getItem('events')) || []
        console.log('LocalStoragePersistence:GetAll', events)
        resolve(events)
    })
}