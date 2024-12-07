/**
 * Receives a name, get item from localStorage and returns the parsed object if found, else, returns null.
 * @param {string} name - Variable name 
 * @returns Object || null
 */
export function getFromLocal(name) {
    const item = localStorage.getItem(name);
    if(item!=null && item!="undefined") {
        return JSON.parse(item);
    }

    console.warn("Item não foi encontrado.");
    return null;
}

/**
 * Receives a name and a value, then stringify the value and stores in localStorage, returning a boolean response.
 * @param {string} name - Variable name 
 * @param {JSON} value - Variable value 
 * @returns Boolean
 */
export function setToLocal(name, value) {
    const res = localStorage.setItem(name, JSON.stringify(value));
    return res;
}

export function getAllItems(ItemsType) {
    let long_Tracks, medium_Tracks;

    try {
        long_Tracks = getItemsByRange(ItemsType, 'long_term');
        medium_Tracks = getItemsByRange(ItemsType, 'medium_term');
    } catch (error) {
        throw new Error(error);
    }

    let allTracks = [...long_Tracks.items, ...medium_Tracks.items];

    return {
        items: allTracks,
        long_total: long_Tracks.total,
        medium_total: medium_Tracks.total,
    }
}

export function getItemsByRange(ItemsType, time_range) {
    let itemsRanged;

    switch (ItemsType) {
        case 'tracks':
            itemsRanged = getFromLocal('USER_TRACKS'+"_"+time_range);
            break;
        case 'artists':
            itemsRanged = getFromLocal('USER_ARTISTS'+"_"+time_range);
            break;
        default:
            throw new Error("ItemsType is not type 'tracks' || 'artists'.")
    }

    if(itemsRanged==null) {
        throw new Error(ItemsType +" - "+ time_range +" está nulo.")
    }

    return itemsRanged;
}
