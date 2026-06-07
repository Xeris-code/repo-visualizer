export function getNameFromPath(path: string) {
    return path.split("/").pop() ?? path;
}

export function getExtension(path: string) {
    const name = getNameFromPath(path);

    if (!name.includes(".")) return "";

    return `.${name.split(".").pop()}`;
}

export function getTopLevel(path: string) {
    return path.split("/")[0];
}

export function isRootFile (path: string) {

    return !path.includes("/")
}