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

// Getting one item
export function getOne(key) {
    let item = localStorage.getItem(key);
    if (item) {
        return JSON.parse(item);
    }
    return null;
}

// Getting one item with ttl
export function getOneWithTTL(key) {
    let packet = localStorage.getItem(key);
    // Make sure the packet exists
    if (!packet) {
        return null;
    }
    // Parse the packet
    packet = JSON.parse(packet);

    // Make sure the item is a TTL based one, if not notify the user.
    if (!packet.expires) {
        throw new Error('The item trying to be retrieved does not have a ttl, use the getOne() method instead.')
    }

    // Check if the token has expired or not
    const now = new Date();
    if (now.getTime() > packet.expires) {
        // Remove item, then return null
        localStorage.removeItem(key);
        return null;
    }
    return packet.value;
}
