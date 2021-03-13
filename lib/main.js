module.exports = {
    // Setting one item
    setOne: function(key, value) {
        const flattened = JSON.stringify(value);
        localStorage.setItem(key, flattened);
    },

    // Setting one item with ttl
    setOneWithTTL: function(key, value, ttl) {
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
    },

    // Getting one item
    getOne: function(key) {
        let item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        }
        return null;
    },

    // Getting one item with ttl
    getOneWithTTL: function(key) {
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
    },

    // Function to set many items
    setMany: function(array) {
        for (let i = 0; i < array.length; i++) {
            const { key, value } = array[i];
            // Make sure the objects are formatted correctly
            if (!key || !value) {
                throw new Error('The setMany() function requires an array of objects containing the: key: <String>, and value: <Any> values.');
            }
            module.exports.setOne(key, value);
        }
    },

    // Function to get many items
    getMany: function(array) {
        const items = [];
        for (let i = 0; i < array.length; i++) {
            const key = array[i];
            items.push(module.exports.getOne(key));
        }
        return items;
    },

    // Function to set many tokens with ttl
    setManyWithTTL: function(array) {
        for (let i = 0; i < array.length; i++) {
            const { key, value, ttl } = array[i];
            if (!key || !value || !ttl) {
                throw new Error('The setManyWithTTL() function requires an array of objects containing the: key: <String>, value: <Any>, and ttl: <Integer> values.');
            }
            module.exports.setOneWithTTL(key, value, ttl);
        }
    },

    // Function to get many tokens with ttl
    getManyWithTTL: function(array) {
        const items = [];
        for (let i = 0; i < array.length; i++) {
            const key = array[i];
            items.push(module.exports.getOneWithTTL(key));
        }
        return items;
    },

    // Function to clear out all tokens that have expired
    pruneExpired: function() {
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
    },
    
    // Deleting an item
    deleteOne: function(key) {
        localStorage.removeItem(key);
    },

    // Deleting all items
    deleteAll: function() {
        localStroage.clear();
    },

    // Get all localStorage items
    getAll: function() {
        const allItems = [];
        Object.keys(localStorage).forEach(key => {
            const item = module.exports.getOne(key);
            allItems.push({ key, data: item });
        });
        return allItems;
    }
}
