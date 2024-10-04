/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    if (size === undefined) {
        return string;
    }

    if (string == null || string.length == 0 || size == 0) {
        return '';
    }

    let repeat_num=1;
    let string_corr=string[0];

    for (let i=1; i < string.length; i++) {
        if (string[i] == string[i-1]) {
            repeat_num++;
        }
        else {
            repeat_num=1;
        }

        if (repeat_num <= size) {
            string_corr += string[i];
        }
    }
    return string_corr;
}