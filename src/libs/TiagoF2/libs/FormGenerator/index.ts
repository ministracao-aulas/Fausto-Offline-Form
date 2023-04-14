import { between } from "../../../../core/CoreValidator/NumberValidator";
import { randomChar } from "../Faker";
import TypeChecker from "../TypeChecker";

interface Input {
    tag: string
    name?: string
    labels?: object,
    attributes?: object,
    rules?: object,
    classes?: string[],
}

class FormGenerator {
    protected inputs: Input[];
    protected rules: object = {};

    constructor(inputs: Input[]) {
        this.init(inputs);
    }

    protected init(inputs: Input[]): void {
        this.inputs = inputs;

        if (!inputs.length) {
            return;
        }

        inputs.forEach(input => {
            let rules: object = input.rules || {};

            if (!(Object.keys(rules).length)) {
                return;
            }

            Object.keys(rules).forEach(rule => {
                let ruleData: any = rules[rule];
                if (!ruleData) {
                    return;
                }

                this.putRule(ruleData, input);
            });

        })
    }

    public putRule(rule: any, input: Input) {
        if (
            !TypeChecker.typeIs(rule, 'String') ||
            !String(rule).length ||
            !input.name ||
            !TypeChecker.typeIs(input.name, 'String')
        ) {
            return;
        }

        let rules: object = this.rules || {};
        let inputRules: any[] = rules[`${input.name}`] || [];

        let ruleExplode: string[] = String(rule).split(':').filter(item => String(item).length);

        if (ruleExplode.length > 1) {
            let ruleName:string = ruleExplode[0];
            let ruleParams:string[] = String(ruleExplode[1] || '').split(',').filter(item => String(item).length);

            if (ruleName == 'between') {
                if (ruleParams.length != 2) {
                    return;
                }

                let start:any = +(ruleParams[0] || 0);
                let end:any = +(ruleParams[1] || 0);

                if (start < 0 || end < 1 || start >= end || !end) {
                    return;
                }

                rule = (value:any, values:any, keyName:any) => between(value, start, end, keyName);
            }
        }

        inputRules.push(rule);

        this.rules[`${input.name}`] = inputRules;

        console.log('rule:', rule, input.name, this.rules);
    }

    public getRules(): any {
        return this.rules || {};
    }

    public putInputs(
        constainerElement: (HTMLDivElement),
        languageCode: string = 'pt_BR'
    ): void {
        if (!('appendChild' in constainerElement) || !this.inputs.length) {
            console.error('Fail', constainerElement);
            return;
        }

        this.inputs.forEach(input => {
            let inputElement = document.createElement(input.tag);
            let inputContainer = document.createElement('div');
            inputContainer.classList.add('input-container');

            let classes = input.classes && input.classes.length ? input.classes : [];
            let attributes: any = input?.attributes || {};
            let inputElementId: string = attributes?.id || randomChar(20);
            attributes.id = inputElementId;

            let labelContent: (null | string) = input.labels && input.labels[languageCode] || '';

            (() => {
                if (!labelContent || !input.tag) {
                    return;
                }

                if (['button'].includes(input.tag)) {
                    inputElement.innerHTML = labelContent;
                    return
                }

                let label = document.createElement('label');
                label.innerHTML = labelContent;
                label.setAttribute('for', inputElementId);
                label.classList.add('input-label');

                inputContainer.appendChild(label);
            })();

            if (attributes) {
                Object.keys(attributes).forEach(attribute => {
                    inputElement.setAttribute(attribute, attributes[attribute]);
                });
            }

            if (classes.length) {
                classes.forEach(className => {
                    inputElement.classList.add(className);
                });
            }

            inputContainer.appendChild(inputElement);

            constainerElement.appendChild(inputContainer);
        })
    }
}

export default FormGenerator
