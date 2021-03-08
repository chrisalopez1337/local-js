// Setting one item
export function setOne(key, value) {
    const flattened = JSON.stringify(value);
    localStorage.setItem(key, flattened);
}

// Setting one item with ttl
export function setOneWithTTL(key, value, ttl) {
    const now = new Date();

    let packet = 
        {
            value,
            expires: now.getTime() + ttl;
        }
    // Flatten packet
    packet = JSON.stringify(packet);

    // Store packet
    localStorage.setItem(key, packet);
}
