const randomChar = (randomCharLength: number): string => {
    randomCharLength = Number.isInteger(randomCharLength) && randomCharLength > 0 ? randomCharLength : 1;

    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = ""
    let charactersLength = characters.length;

    for (let i = 0; i < randomCharLength; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }

    return result;
}

export {
    randomChar
}
