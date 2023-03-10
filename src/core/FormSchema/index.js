import UUIDv4 from "../../libs/TiagoF2/libs/UUIDv4"
import FormSubmitInfo from "../FormSubmitInfo";

export default class FormSchema {
    constructor(
        schemaId,
        formRules,
        formSubmitInfo // Instance of [TODO] FormSubmitInfo
    ) {
        [
            ['schemaId', UUIDv4.checkIfValidUUID(schemaId)],
            ['formRules', TypeChecker.typeIs(formRules, 'object')],
            ['formSubmitInfo', (formSubmitInfo instanceof FormSubmitInfo)],
        ].forEach(item => {
            let [itemName, result] = item;

            if (!result) {
                throw `Invalid '${itemName}'`
            }
        })

        this.schemaId = schemaId
        this.formRules = formRules
        this.formSubmitInfo = formSubmitInfo
    }

    // TODO: validar os dados enviados (required, regex rules, length, etc)
    validateForm(formInputs) {
        if (! TypeChecker.typeIs(formInputs, 'Object')) {
            throw `Error: [FormSchema.validateForm] formInputs must be an Object`
        }
    }

    getID() {
        return this.schemaId
    }

    async submitForm(formInputs) {
        this.validateForm(formInputs)
        // TODO: fetch...
        // dispatch event

        // WIP
        await fetch("https://jsonplaceholder.typicode.com/posts/1", {
            "headers": this.formSubmitInfo.getHeaders(),
            "method": this.formSubmitInfo.getMethod(),
            ...this.formSubmitInfo.getOptions()
        });
        return true
    }
}
