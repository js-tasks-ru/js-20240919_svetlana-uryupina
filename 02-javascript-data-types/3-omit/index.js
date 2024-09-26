/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
    let obj_new = {};

    for (let obj_entry of Object.entries(obj)) {
        if (!fields.includes(obj_entry[0],0)) {
            obj_new[obj_entry[0]] = obj_entry[1];
        }
    }
    return obj_new;
};
