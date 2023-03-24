const between = (value, from, to, keyName) => {
    if (isNaN(value - 0)) {
        throw `${keyName} must be a number`;
    }

    if (isNaN(from - 0)) {
        throw `${keyName} must be a number`;
    }

    if (isNaN(to - 0)) {
        throw `${keyName} must be a number`;
    }

    if ((value - 0) < from || (value - 0) > to) {
        throw `${keyName} must be between 1 and 100`;
    }
};

const number = (value, values, keyName) => {
    if (isNaN(value - 0)) {
        throw `${keyName} must be a number`;
    }
};

const positiveNumber = (value, values, keyName) => {
    if (isNaN(value - 0)) {
        throw `${keyName} must be a number`;
    }

    if ((value - 0) < 0) {
        throw `${keyName} must be a positive number`;
    }
};

const negativeNumber = (value, values, keyName) => {
    if (isNaN(value - 0)) {
        throw `${keyName} must be a number`;
    }

    if ((value - 0) >= 0) {
        throw `${keyName} must be a negative number`;
    }
};

const lessThan = (value, mustBeLessThan, keyName) => {
    if (isNaN(value - 0)) {
        throw `${keyName} must be a number`;
    }

    if (isNaN(mustBeLessThan - 0)) {
        throw `The number to compare must be a number`;
    }

    if ((value - 0) >= mustBeLessThan) {
        throw `${keyName} must be a less than ${mustBeLessThan}`;
    }
};

const greaterThan = (value, mustBeGreaterThan, keyName) => {
    if (isNaN(value - 0)) {
        throw `${keyName} must be a number`;
    }

    if (isNaN(mustBeGreaterThan - 0)) {
        throw `The number to compare must be a number`;
    }

    if ((value - 0) < mustBeGreaterThan) {
        throw `${keyName} must be a greater than ${mustBeGreaterThan}`;
    }
};

export {
    between,
    number,
    positiveNumber,
    negativeNumber,
    lessThan,
    greaterThan,
}
