// as folder name suggests we are creating an ACTION which is just a plain js obj with a required type, and an optional payload - payload can be anything: str, num, obj, etc
export default function changeLocation(location) {
    return {
        type: "CHANGE_LOCATION",
        payload: location
    };
}