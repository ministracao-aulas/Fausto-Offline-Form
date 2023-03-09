const StorageManager = {
    getAllItems: (objectParentName) => {
        if (!('localStorage' in window)) {
            throw 'localStorage not found'
        }

        let objectParentData = window.localStorage.getItem(objectParentName)
        try {
            objectParentData = objectParentData ? JSON.parse(objectParentData) : []

            if (objectParentData.constructor.name != 'Array') {
                return []
            }

            return objectParentData
        } catch (error) {
            console.error(error)
            return null
        }
    },
    pushItem: (objectParentName, objectData) => {
        if (!('localStorage' in window)) {
            throw 'localStorage not found'
        }

        let objectParentData = window.localStorage.getItem(objectParentName)
        try {
            objectParentData = objectParentData ? JSON.parse(objectParentData) : []

            if (objectParentData.constructor.name != 'Array') {
                objectParentData = []
            }

            objectParentData.push(objectData)

            window.localStorage.setItem(objectParentName, JSON.stringify(objectParentData))
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }
}

export default StorageManager
