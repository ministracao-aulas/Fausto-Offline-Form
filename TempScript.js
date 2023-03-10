import FormHandler from "./src/modules/FormHandler";
import User from './src/Entities/User';
import FormSchema from "./src/core/FormSchema";
import UUIDv4 from "./src/libs/TiagoF2/libs/UUIDv4";
import FormSubmitInfo from "./src/core/FormSubmitInfo";

export  async function runTempScript(...items) {
    let submitForm =  await FormHandler.submitForm(
        {
            name: "Tiago",
            email: "tiago@site.com",
            age: 29
        },
        (new FormSchema(
            'c535b0ee-e734-4436-a23e-7e376f206002', // fake ID, Esse ID será retornado da API
            {},
            (new FormSubmitInfo('http://localhost:8000'))
        )),
        (new User())
    )

    console.log(submitForm);
}
