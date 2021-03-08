// Setting one item
exports.method = function setOne(key, value) {
    const flattened = JSON.stringify(value);
    localStorage.setItem(key, flattened);
}

// Setting one item with ttl
exports.method = function setOneWithTTL(key, value, ttl) {
    const now = new Date();

    let packet = 
        {
            value,
            expires: now.getTime() + ttl,
        }
    // Flatten packet
    packet = JSON.stringify(packet);

    // Store packet
    localStorage.setItem(key, packet);
}

// Getting one item
exports.method = function getOne(key) {
    let item = localStorage.getItem(key);
    if (item) {
        return JSON.parse(item);
    }
    return null;
}

// Getting one item with ttl
exports.method = function getOneWithTTL(key) {
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

// Function to set many items
exports.method = function setMany(array) {
    for (let i = 0; i < array.length; i++) {
        const { key, value } = array[i];
        // Make sure the objects are formatted correctly
        if (!key || !value) {
            throw new Error('The setMany() function requires an array of objects containing the: key: <String>, and value: <Any> values.');
        }
        setOne(key, value);
    }
}

// Function to get many items
exports.method = function getMany(array) {
    const items = [];
    for (let i = 0; i < array.length; i++) {
        const key = array[i];
        items.push(getOne(key));
    }
    return items;
}

// Function to set many tokens with ttl
exports.method = function setManyWithTTL(array) {
    for (let i = 0; i < array.length; i++) {
        const { key, value, ttl } = array[i];
        if (!key || !value || !ttl) {
            throw new Error('The setManyWithTTL() function requires an array of objects containing the: key: <String>, value: <Any>, and ttl: <Integer> values.');
        }
        setOneWithTTL(key, value, ttl);
    }
}

// Function to get many tokens with ttl
exports.method = function getManyWithTTL(array) {
    const items = [];
    for (let i = 0; i < array.length; i++) {
        const key = array[i];
        items.push(getOneWithTTL(key));
    }
    return items;
}

// Function to clear out all tokens that have expired
exports.method = function pruneExpired() {
    Object.keys(localStorage).forEach(key => {
        let item = localStorage.getItem(key);
        if (item) {
            item = JSON.parse(item);
            if (item.expires) {
                const now = new Date();
                if (now.getTime() > item.expires) {
                    localStorage.removeItem(key);
                }
            }
        }
    });
}
