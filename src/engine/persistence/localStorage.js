export function addLocalStorage(value) {
    return new Promise((resolve) => {
        const events = JSON.parse(localStorage.getItem('events')) || []
        const event = {
            id: events.length,
            ...value
        }
        events.push(event)
        localStorage.setItem('events', JSON.stringify(events))
        resolve(true)
    })
}

export function removeLocalStorage(id) {
    return new Promise((resolve, reject) => {
            const events = JSON.parse(localStorage.getItem('events'))

            const index = events.findIndex((ev) => {
                return ev.id === id;
            })

            if (index == -1) {
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
        resolve(event)
    })
}

export function getAllLocalStorage() {
    return new Promise((resolve) => {
        const events = JSON.parse(localStorage.getItem('events')) || []
        resolve(events)
    })
}