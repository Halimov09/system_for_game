export const setItem = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.error("Error setting item in localStorage", error);
    }
}

export const getItem = key => {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error("Error getting item", error);
        return null;
    }
}

export const removeItem = key => {
    try {
        return localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing item", error);
        return null;
    }
}