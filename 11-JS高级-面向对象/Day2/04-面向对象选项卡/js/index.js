var tab = new TabsFn();
tab._init();

function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}
