export class Validator {
    /**
     *
     * @param {Array} itemsToCheck
     * @param {?Function} everyChecker
     *
     * @returns boolean
     */
    static isValid(itemsToCheck, everyChecker = null) {
        if (!(
            [
                TypeChecker.typeIs(itemsToCheck, 'Array'),
                TypeChecker.typeIs(everyChecker, 'Function') || TypeChecker.typeIs(everyChecker, 'Null'),
            ].every((item) => item)
        )) {
            throw `"rules" and "data" must be an Array`
        }

        everyChecker = TypeChecker.typeIs(everyChecker, 'Null') ? (item) => item : everyChecker

        return itemsToCheck.every(everyChecker)
    }

    /**
     *
     * @param {Array} rules
     * @param {Array} data
     *
     * @returns boolean
     */
    static validate(rules, data) {
        if (!(
            [
                TypeChecker.typeIs(rules, 'Array'),
                TypeChecker.typeIs(data, 'Array'),
            ].every((item) => item)
        )) {
            throw `"rules" and "data" must be an Array`
        }
    }
}
