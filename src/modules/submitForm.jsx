import { showAlertMessage } from "./alertMessage"
import { isOnline } from "./checkInternetStatus"

export function setupSubmitForm(element) {
  let resultMessageElement = document.querySelector('[data-item-id="result"]')

  const setSubmitForm = async () => {
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

    if (!userId) {
      showAlertMessage('Invalid userId')
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
