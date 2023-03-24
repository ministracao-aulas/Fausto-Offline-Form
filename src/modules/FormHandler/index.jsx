import User from "../../Entities/User";
import StorageManager from "../../helpers/storageHandler";
import TypeChecker from "../../libs/TiagoF2/libs/TypeChecker";
import UUIDv4 from "../../libs/TiagoF2/libs/UUIDv4";
import FormSchema from "../../core/FormSchema/index.js";
import { Validator } from "../../libs/TiagoF2/libs/Validator";

/**
 * WIP
 * TODO:
 * - Fazer dispatch de eventos (stored on db|submited|fail|fail on response|invalid)
 *
 * */
 /**
  * @param {object} formData
  * @param {FormSchema} formSchema
  * @param {User} user
  *
 * @returns { //TODO *  status:  error|stored|submited * message: ... * success: ... * errors: ... * }
 */
export default class FormHandler {
    static async submitForm(
        formData,
        formSchema, // TODO: validar se é intancia da classe FormSchema
        user
    ) {
        let paramIsValid = Validator.isValid([
            TypeChecker.typeIs(formData, 'Object'),
            formSchema instanceof FormSchema,
            user instanceof User,
        ])

        let statusFail = (message, errors) => {
            return {
                status: 'error',
                message: message,
                success: false,
                errors: errors
            }
        }

        let statusSuccess = (status, message, data = [], errors = []) => {
            return {
                status: status,
                message: message,
                success: true,
                data: data,
                errors: errors,
            }
        }

        if (!paramIsValid) {
            return statusFail('Dados inválidos', ['The params for "FormHandler.submitForm" are invalid'])
        }

        // TODO: validar aqui se os dados enviados são válidos
        try {
            formSchema.validateForm(formData)
        } catch (error) {
            // dispatch event 'error'
            return statusFail('Dados inválidos', [error])
        }

        let formToStore = {
            formDataId: UUIDv4.generateUuid(),
            formData: formData,
            schemaID: formSchema.getID()
        }

        let stored = StorageManager.pushItem(
            formSchema.getID(),
            formToStore
        );

        let status = []

        if (stored) {
            status.push('stored')
            // dispatch event 'stored'
        }

        let submit = await formSchema.submitForm(formData)

        if (submit) {
            status.push('submited')
            // dispatch event 'submited'

        }

        return statusSuccess(status.join('|'), 'finally', {
            formToStore: formToStore
        }, ['Some error here'])
    }
}
