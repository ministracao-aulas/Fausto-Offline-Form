import TypeChecker from "../../libs/TiagoF2/libs/TypeChecker";
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
        let isObject = TypeChecker.typeIs(formInputs, 'Object');

        if (!isObject) {
            throw `Error: formInputs must be an Object . [FormSchema.validateForm]`
        }
    }

    getID() {
        return this.schemaId
    }

    async submitForm(formInputs) {
        this.validateForm(formInputs, 'Schema submitForm')
        // TODO: fetch...
        // dispatch event

        let url = this.formSubmitInfo.getUrl();

        // WIP
        await fetch(
            url,
            {
                "headers": this.formSubmitInfo.getHeaders(),
                "method": this.formSubmitInfo.getMethod(),
                ...this.formSubmitInfo.getOptions()
            }
        );
        return true
    }
}
