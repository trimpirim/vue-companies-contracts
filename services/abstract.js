/**
 * 1. I do not like and discourage the usage of '_' to show the visibility of the method or property;
 * Most of the ES, JS lints are not encouraging this practice too. You will still be able to
 * use those methods even thought that you are not sure what side-effects they might have;
 * 2. Rejects should reject with a specific code to indicate, what message should FE use.
 * BE should not return human-readable error message, the application that uses that API should;
 * 3. `indexOf` -> `includes`;
 * 4. You have defined your own `_promise` method, but you are not using that one everywhere you can;
 * 5. `update` method uses `for` loop, while you could simply use `findIndex`;
 * 6. `orderBy` -> `sort(() => a[attr] - b[attr])`;
 * 7. `per_page` -> `perPage`;
 */
export default class Resource {
    /**
     * @param data {Object[]}
     */
    constructor(data) {
        this.data = data;
    }

    /**
     * Returns total rows count
     * @returns {Promise}
     */
    getTotal() {
        return this._promise(this.data.length);
    }

    /**
     * Finds specific row by its ID
     * @param id {int} ID or the row
     * @returns {Promise}
     */
    find(id) {
        const filtered = this.data.filter(el => el.id === id);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (filtered.length === 0) {
                    reject('not found');
                } else {
                    resolve(this._clone(filtered[0]));
                }
            }, 100);
        });
    }

    /**
     * Performs batch select from the data array
     * @param field {string} Column name
     * @param values {[]} List of possible column values
     * @param page {int} Page index starting from 0
     * @param perPage {int} Rows per page
     * @param orderBy? {string} Column name to sort with (ASC)
     * @returns {Promise}
     */
    getBatch(field, values, page = 0, perPage = 5, orderBy = 'id') {
        return this._promise(
            this._paginate(
                this._orderBy(
                    this.data.filter(el => values.indexOf(el[field]) !== -1),
                    orderBy,
                ),
                page, perPage,
            ),
        );
    }

    /**
     * Returns paginated rows
     * @param page {int} Page index starting from 0
     * @param perPage {int} Rows per page
     * @param orderBy? {string} Column name to sort with (ASC)
     * @returns {Promise}
     */
    list(page = 0, perPage = 5, orderBy = 'id') {
        return this._promise(
            this._paginate(
                this._orderBy(this.data, orderBy), page, perPage,
            ),
        );
    }

    /**
     * Will update a row in the database
     * @param object New object value
     * @returns {Promise}
     */
    update(object) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let idx = -1;
                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i].id === object.id) {
                        idx = i;
                        break;
                    }
                }
                if (idx === -1) {
                    reject('not found');
                } else {
                    this.data[idx] = object;
                    resolve(object);
                }
            }, 200);
        });
    }

    /**
     * @param arr {Object[]} Data to paginate
     * @param page {int} Page index starting from 0
     * @param perPage {int} Rows per page. Maximum value is 5.
     * @returns {Object} Object with paginated result and metadata with pagination info
     * @private
     */
    _paginate(arr, page, perPage) {
        if (perPage > 5) {
            perPage = 5;
        }
        const result = this._cloneAll(arr.slice(page * perPage, (page + 1) * perPage));
        return {
            data: result,
            meta: {
                total: arr.length,
                page,
                per_page: perPage,
                items: result.length,
            },
        };
    }

    /**
     * Sorts an array with provided value name
     * @param arr {Object[]} array of object to sort
     * @param attr {string} field name to sort with
     * @return {Object[]} Sorted array
     * @private
     */
    _orderBy(arr, attr) {
        return arr.sort((a, b) => {
            if (a[attr] < b[attr]) return -1;
            if (a[attr] > b[attr]) return 1;
            return 0;
        });
    }

    /**
     * Wraps any result in promise with desired resolving timeout
     * @param result Any data
     * @param timeout {int} Timeout in milliseconds
     * @return {Promise}
     * @private
     */
    _promise(result, timeout = 100) {
        return new Promise(resolve => setTimeout(() => resolve(result), timeout));
    }

    /**
     * Clones array with all objects inside and returns its copy
     * @param arr {Object[]} array of objects to clone
     * @returns {Array} cloned array
     * @private
     */
    _cloneAll(arr) {
        const cloned = [];
        for (let i = 0; i < arr.length; i++) {
            cloned.push(this._clone(arr[i]));
        }
        return cloned;
    }

    /**
     * Clones object and returns its copy
     * @param obj {Object} object to clone
     * @returns {Object} cloned object
     * @private
     */
    _clone(obj) {
        const copy = obj.constructor();
        for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
}
