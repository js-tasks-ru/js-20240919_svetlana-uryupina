/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    const arr_sorted = [];
    for (let i=0; i<arr.length; i++) {
        arr_sorted[i] = arr[i];
    }
    if (param == 'asc') {
        arr_sorted.sort((a, b) => a.localeCompare(b,'ru-en',{caseFirst:'upper'}));
    }
    else {
        arr_sorted.sort((a, b) => b.localeCompare(a,'ru-en',{caseFirst:'upper'}));
    }
    return arr_sorted;
}
