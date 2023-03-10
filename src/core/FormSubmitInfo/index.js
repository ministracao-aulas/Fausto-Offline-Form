import TypeChecker from "../../libs/TiagoF2/libs/TypeChecker";

export default class FormSubmitInfo {
    static ALLOWED_METHODS = [
        'GET',
        'POST',
        'OPTIONS',
        'PUT',
        'PATCH',
        'DELETE',
    ];

    constructor(
        url,
        method = 'GET',
        headers = {},
        options = {}
    ) {
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.options = options;
    }

    setMethod(method) {
        if (!this.method) {
            this.method = 'GET'
        }

        if (!method || !TypeChecker.typeIs(method, 'string')) {
            return
        }

        method = String(method).toLocaleUpperCase().trim();

        if (!Array(this.ALLOWED_METHODS).includes(method) || !(method.length)) {
            return
        }

        this.method = method
    }

    getMethod() {
        return this.method || 'GET'
    }

    getHeaders() {
        return this.headers
    }

    getOptions() {
        return this.options || {}
    }
}
