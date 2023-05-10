class StorageUtil {
  constructor(storage) {
    this.storage = storage
  }
  setItem(key, value) {
    this.storage.setItem(key, JSON.stringify(value))
  }
  getItem(key) {
    const value = this.storage.getItem(key)
    return value ? JSON.parse(value) : null
  }
  removeItem(key) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}
const localStorageUtil = new StorageUtil(localStorage)
const sessionStorageUtil = new StorageUtil(sessionStorage)
export { localStorageUtil, sessionStorageUtil }
