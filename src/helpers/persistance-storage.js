export const setItem = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.error("Error setting item in localStorage", error);
    }
}