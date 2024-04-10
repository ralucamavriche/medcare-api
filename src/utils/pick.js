/**
 * Create an object composed from all the key that can be find in the object
 * @param {Object} object 
 * @param {string[]} keys 
 * @returns {Object}
 */
const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key]
        }
        return obj;
    }, {});
};

module.exports = pick;