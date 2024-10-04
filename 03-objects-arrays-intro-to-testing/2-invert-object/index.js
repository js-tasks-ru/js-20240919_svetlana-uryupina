/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
    if (!obj) {
        return;
    }

    const reverse_obj = {};
    for (const [key, value] of Object.entries(obj)) {
        reverse_obj[value] = key;
    }
    return reverse_obj;
}