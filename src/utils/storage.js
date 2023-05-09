class StorageUtil {
    constructor(storage) {
        this.storage = storage
    }
    setItem(key, value) {
        this.storage.setItem(key, JSON.stringify(value))
    }
    getItem(key) {
        const value = this.storage.getItem(key)
        value ?
            return JSON.parse(value): null
    }
    removeItem(key) {
        this.storage.removeItem(key)
    }

    clear() {
        this.storage.clear()
    }
}
const localStorage = new StorageUtil(localStorage)
const sessionStorage = new StorageUtil(sessionStorage)
module.exports = {
    localStorage: ,
    sessionStorage
}