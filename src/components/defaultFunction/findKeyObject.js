export default function findKeyObject(obj, value){
    const key = Object.keys(obj).find(key => obj[key] === value);
    return key
}