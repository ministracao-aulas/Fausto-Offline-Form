import CoreValidator from "../core/CoreValidator";
import {
    between,
    number,
    positiveNumber,
    negativeNumber,
    lessThan,
    greaterThan,
} from "../core/CoreValidator/NumberValidator";
import FormSchema from "../core/FormSchema";
import FormSubmitInfo from "../core/FormSubmitInfo";
import { showAlertMessage } from "./alertMessage"
import { isOnline } from "./checkInternetStatus"

export function setupSubmitForm(element) {
    if (!element) {
        return;
    }

    let resultMessageElement = document.querySelector('[data-item-id="result"]')

    const setSubmitForm = async () => {

        let formValidator = new CoreValidator({
            userId: [
                'required',
                // 'positiveNumber',
                (value, values, keyName) => between(value, 1, 100, keyName),
                // (value, values, keyName) => lessThan(value, 100, keyName),
                // (value, values, keyName) => greaterThan(value, 0, keyName),
                // (value, values, keyName) => lessThan(value, 100, keyName),
            ],
        }, {
            userId: 'User ID'
        }
        );

        let formSchema = new FormSchema(
            'c535b0ee-e734-4436-a23e-7e376f206002', // fake ID, Esse ID será retornado da API
            formValidator,
            (new FormSubmitInfo('https://jsonplaceholder.typicode.com/posts/1'))
        );

        if (!isOnline()) {
            showAlertMessage('Offline')
            return
        }

        let userIdInput = document.querySelector('input[data-item-id="userId"]')

        if (!userIdInput) {
            showAlertMessage('Invalid userIdInput')
            return
        }

        let userId = userIdInput.value

        // if (!userId) {
        //   showAlertMessage('Invalid userId')
        //   return
        // }

        let formInputs = {
            userId: userId
        };

        try {
            formSchema.validateForm(formInputs);
        } catch (error) {
            showAlertMessage(error)
            return
        }

        let response = await fetch(`http://jsonplaceholder.typicode.com/posts/${userId}`)
        let requestResult = response.ok ? 'success' : 'fail';

        showAlertMessage(
            response.ok ? 'Submited successfully' : 'Fail on request',
            response.ok ? 'success' : 'error'
        )

        resultMessageElement.innerHTML = `The request result: ${requestResult}. Code: ${response.status}`
    }

    element.addEventListener('click', () => setSubmitForm())
}
