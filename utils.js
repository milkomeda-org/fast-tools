// get base64 data from url
async function toDataUrl(url, callback) {
    await Promise.all([fetch(url,
        {
            method: 'get',
            responseType: 'blob'
        }).then(res => res.blob()).then(blob => {
        const reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(blob);
    }).catch(e => {
        console.log("Oops, error", e);
        alert(e)
    })])
}


function copyToClipboard(text) {
    const input = document.createElement("input");
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', text);
    input.setAttribute('id', 'temple')
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}