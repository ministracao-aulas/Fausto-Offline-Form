import {
    between,
    number,
    positiveNumber,
    negativeNumber,
} from "./NumberValidator";

import TypeChecker from "../../libs/TiagoF2/libs/TypeChecker";

export default class CoreValidator {
    constructor(
        rules,
        replaces = {}
    ) {
        this.setRules(rules);
        this.setReplaces(replaces);
    }

    valitators = {
        required: (value, data, keyName) => {},
        number: (value, values, keyName) => number(value, values, keyName),
        positiveNumber: (value, values, keyName) => positiveNumber(value, values, keyName),
        negativeNumber: (value, values, keyName) => negativeNumber(value, values, keyName),
    }

    setRules(rules) {
        if (!TypeChecker.typeIs(rules, 'Object')) {
            throw `Error: Invalid rules`
        }

        this.rules = rules;
    }

    getRules() {
        return this.rules || {}
    }

    setReplaces(replaces) {
        if (!TypeChecker.typeIs(replaces, 'Object')) {
            throw `Error: Invalid replaces`
        }

        this.replaces = replaces;
    }

    getReplaces() {
        return this.replaces || {}
    }

    validate(formInputs) {
        if (!TypeChecker.typeIs(formInputs, 'Object')) {
            throw `Error: formInputs must be an object`
        }

        if (!Object.keys(this.getRules()).length) {
            return;
        }

        Object.entries(this.getRules()).forEach(item => {
            let key = item[0];
            let rules = item[1];

            if (!key || !rules || !TypeChecker.typeIs(key, 'String') || !TypeChecker.typeIs(rules, 'Array')) {
                console.error('key:', key, 'rules:', rules);
                throw `Invalid formRules`
            }

            let replaces = this.getReplaces();
            let value = formInputs[`${key}`];
            let keyName = Object.keys(replaces).includes(key) ? replaces[`${key}`] : key;
            keyName = TypeChecker.typeIs(keyName, 'String') ? keyName : key;

            if (rules.includes('required') && !value) {
                throw `${keyName} is required`
            }

            rules.forEach((rule) => {
                let ruleName = TypeChecker.typeIs(rule, 'String') && String(rule).trim().length ? String(rule).trim() : null;

                rule = ruleName && Object.keys(this.valitators).includes(ruleName) ? this.valitators[ruleName] : rule;

                if (TypeChecker.typeIs(rule, 'Function')) {
                    rule(value, formInputs, keyName);
                    return;
                }
            })
        })
    }
}
