export function showAlertMessage(message, type = 'error') {
    let alertMessageElement = document.querySelector('[data-item-id="alertMessage"]')

    if (!alertMessageElement) {
        console.error('Error: invalid alertMessageElement');
        return
    }

    ['error', 'success', 'info', 'warning']
        .forEach(
            typeName => alertMessageElement.classList.remove(
                `message-${typeName}`
            )
        );

    alertMessageElement.classList.remove('d-none');
    let className = ['error', 'success', 'info', 'warning'].includes(type) ? `message-${type}` : null

    if (className) {
        alertMessageElement.classList.add(className)
    }

    alertMessageElement.innerHTML = message
}

export function hideAlertMessage() {
    let alertMessageElement = document.querySelector('[data-item-id="alertMessage"]')

    if (!alertMessageElement) {
        console.error('Error: invalid alertMessageElement');
        return
    }

    ['error', 'success', 'info', 'warning']
        .forEach(
            className => alertMessageElement.classList.remove(
                `message-${className}`
            )
        )

    alertMessageElement.classList.add('d-none')

    alertMessageElement.innerHTML = ''
}
