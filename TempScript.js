import FormHandler from "./src/modules/FormHandler";
import User from './src/Entities/User';
import FormSchema from "./src/core/FormSchema";
import UUIDv4 from "./src/libs/TiagoF2/libs/UUIDv4";
import FormSubmitInfo from "./src/core/FormSubmitInfo";
import CoreValidator from "./src/core/CoreValidator";

export async function runTempScript(...items) {
    let formValidator = new CoreValidator({
            address: [
                'required',
                (value, values) => {
                    console.log('numeric:', !isNaN(value - 0))
                }
            ],
        }, {
            address: 'Address'
        }
    );

    let formSchema = new FormSchema(
        'c535b0ee-e734-4436-a23e-7e376f206002', // fake ID, Esse ID será retornado da API
        formValidator,
        (new FormSubmitInfo('https://jsonplaceholder.typicode.com/posts/1'))
    );

    let formData = {
        name: "Tiago",
        email: "tiago@site.com",
        age: 29,
        address: '1',
    };

    let loggedUser = new User();

    let submitForm =  await FormHandler.submitForm(
        formData,
        formSchema,
        loggedUser
    )

    console.log(submitForm);
}
