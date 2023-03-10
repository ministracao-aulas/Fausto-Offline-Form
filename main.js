import './style.css'
import javascriptLogo from './javascript.svg'
import { setupSubmitForm } from './src/modules/submitForm'
import { isOnline } from './src/modules/checkInternetStatus'
import StorageManager from './src/helpers/storageHandler';
import UUIDv4 from './src/libs/TiagoF2/libs/UUIDv4';
import TypeChecker from './src/libs/TiagoF2/libs/TypeChecker';
import { Validator } from './src/libs/TiagoF2/libs/Validator';
import FormHandler from './src/modules/FormHandler';
import { runTempScript } from './TempScript';

StorageManager.pushItem('alfabeto', { a: 'A,a' });

window.sm = StorageManager
window.TypeChecker = TypeChecker
window.Validator = Validator
window.FormHandler = FormHandler
window.UUIDv4 = UUIDv4
window.online = true // TODO: mudar para botão

runTempScript(); // TODO: validar para ser executado apenas em DEV

let internetStatus = isOnline() ? 'Online' : 'Offline'
let internetStatusClass = isOnline() ? 'online' : 'offline'
document.querySelector('#app').innerHTML = `
  <div>
    <h5 class="text-align-center">APP Offline form</h5>
    <div class="d-none" data-item-id="alertMessage">Message</div>
    <div>
      <ul>
        <li>
          <strong>Server:</strong>
          <span data-item-id="serverStatus">Online [TODO]</span>
        </li>

        <li>
          <strong>Internet:</strong>
          <span class="${internetStatusClass}" data-item-id="internetStatus">${internetStatus}</span>
        </li>

        <li>
          <strong>Manual:</strong>
          <span data-item-id="manualStatus">Auto [TODO]</span>
        </li>

      </ul>
    </div>
    <div class="card">
      <div>
        <input type="number" data-item-id="userId" placeholder="userId" />
      </div>

      <button id="submitform" type="button">Submit form</button>
    </div>

    <p class="read-the-docs">
      <strong>Result:</strong>
      <br />
      <span data-item-id="result"></span>
    </p>
  </div>
`

setupSubmitForm(document.querySelector('#submitform'))
