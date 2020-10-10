export const getImageUrl = (name, imageUrl) => {
    let url = null;
    if (localStorage.getItem(name)) {
        url = localStorage.getItem(name);
        return url;
    }
    if(imageUrl) {
        url = imageUrl;
        return url;
    }
    return url;
};