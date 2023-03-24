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
        this.setUrl(url);
        this.method = method;
        this.headers = headers;
        this.options = options;
    }

    setUrl(url) {
        if (!TypeChecker.typeIs(url, 'string') || !TypeChecker.isValidUrl(url)) {
            throw `Error: Invalid URL`
        }

        this.url = url;
    }

    setMethod(method) {
        if (!this.method) {
            this.method = 'GET'
        }

        method = method && TypeChecker.typeIs(method, 'string')
            ? String(method).toLocaleUpperCase().trim() : '';

        if (!Array(this.ALLOWED_METHODS).includes(method) || !(method.length)) {
            throw `Error: Invalid METHOD`
        }

        this.method = method
    }

    getMethod() {
        return this.method || 'GET'
    }

    getUrl() {
        return this.url
    }

    getHeaders() {
        return this.headers || {}
    }

    getOptions() {
        return this.options || {}
    }
}
