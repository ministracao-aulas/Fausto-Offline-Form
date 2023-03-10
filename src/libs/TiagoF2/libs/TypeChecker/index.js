class TypeChecker {
    static ucFirst(word) {
        if (!word || word.constructor.name != 'String') {
            return ''
        }

        let letters = (String(word)).split('')
        letters[0] = String(letters.at(0)).toUpperCase()
        return letters.join('')
    }

    static getTypeFromError (errorMessage) {
        // 'TypeError: XXX has no properties'
        try {
            errorMessage = String(errorMessage)

            if (errorMessage === '') {
                return 'EmptyString'
            }

            return (((errorMessage.split(' has no properties')).shift())
                .split(' ')).pop()

        } catch (error) {
            return 'UnknownType'
        }
    }

    static getType(item) {
        try {
            let type = (item).constructor.name

            return (type === 'Number') && isNaN(type) ? 'NaN' : type
        } catch (error) {
            return this.ucFirst(this.getTypeFromError(error))
        }
    }

    static firtLetterIsLower(word) {
        if (!word || word.constructor.name != 'String') {
            return false
        }

        let letters = (String(word)).split('')
        let firstLetter = String(letters.at(0))

        return firstLetter && (letters[0] === firstLetter.toLowerCase())
    }

    static typeIs(item, itemTypeIs) {
        if (this.getType(itemTypeIs) === "String") {
            if (this.firtLetterIsLower(itemTypeIs)) {
                return this.getType(item) === this.ucFirst(itemTypeIs)
            }

            return this.getType(item) === itemTypeIs
        }

        if (this.getType(itemTypeIs) === "Function") {
            let isNativeFunction = (String(itemTypeIs)).includes('native code')

            if (isNativeFunction) {
                return (item instanceof itemTypeIs)
            }

            let itemTypeIsAsString = String(itemTypeIs)

            return this.getType(item) === itemTypeIs
        }

        return this.getType(item) == this.getType(itemTypeIs)
    }

    static typeIsIn(item, types = []) {
        if (this.getType(types) != 'Array') {
            return false
        }

        return types.includes(this.getType(item))
    }
}

export default TypeChecker
