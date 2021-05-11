export default function isEmpty(obj) {
    if (typeof (obj) === "object") 
        return Object.keys(obj).length !== 0;
    return false
}