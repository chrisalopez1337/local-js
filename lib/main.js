// Setting one item
export function setOne(key, value) {
    const flattened = JSON.stringify(value);
    localStorage.setItem(key, flattened);
}
