function copyContent() {
    return {
        copy: function (content) {
            let aux = document.createElement("input");
            aux.setAttribute("value", content);
            document.body.appendChild(aux);
            aux.select();
            document.execCommand("copy");
            document.body.removeChild(aux);
        }
    }
}
export {copyContent}