import TypeChecker from "../../libs/TiagoF2/libs/TypeChecker";
import UUIDv4 from "../../libs/TiagoF2/libs/UUIDv4"
import FormSubmitInfo from "../FormSubmitInfo";
import CoreValidator from "../CoreValidator";

export default class FormSchema {
    constructor(
        schemaId,
        formValidator,
        formSubmitInfo // Instance of [TODO] FormSubmitInfo
    ) {
        [
            ['schemaId', UUIDv4.checkIfValidUUID(schemaId)],
            ['formValidator', (formValidator instanceof CoreValidator)],
            ['formSubmitInfo', (formSubmitInfo instanceof FormSubmitInfo)],
        ].forEach(item => {
            let [itemName, result] = item;

            if (!result) {
                throw `Invalid '${itemName}'`
            }
        })

        this.schemaId = schemaId
        this.formValidator = formValidator
        this.formSubmitInfo = formSubmitInfo
    }

    // TODO: validar os dados enviados (required, regex rules, length, etc)
    validateForm(formInputs) {
        let isObject = TypeChecker.typeIs(formInputs, 'Object');

        if (!isObject) {
            throw `Error: formInputs must be an Object . [FormSchema.validateForm]`
        }

        this.formValidator.validate(formInputs);
    }

    getID() {
        return this.schemaId
    }

    async submitForm(formInputs) {
        this.validateForm(formInputs);
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
