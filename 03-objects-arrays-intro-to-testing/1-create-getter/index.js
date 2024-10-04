/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */

export function createGetter(path) {
    const path_array=path.split('.');

    return function(obj){
        for (const property of path_array) {
            if (Object.hasOwn(obj, property)) {
                obj = obj[property];
            }
            else return;
        }
        return obj;
    }
}