const UUIDv4 = {
    /**
     * Returns a UUIDv4 as string
     *
     * @returns
     */
    generateUuid: () => {
        return (
            String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
        ).replace(/[xy]/g, (character) => {
            const random = (Math.random() * 16) | 0;
            const value = character === "x" ? random : (random & 0x3) | 0x8;

            return value.toString(16)
        })
    },

    /**
     *
     * @param {string} string
     *
     * @returns boolean
     */
    checkIfValidUUID: (string) => {
        const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

        return regexExp.test(string)
    }
}

/**
    // Uses
    // UuidHelper.generateUuid() // 23a331a5-3c7a-4b68-95cf-5760375f8a5b
    // UuidHelper.checkIfValidUUID('23a331a5-3c7a-4b68-95cf-5760375f8a5b') // true
    // UuidHelper.checkIfValidUUID('23a331a5-3c7a-4b68-95cf') // false
*/

export default UUIDv4
