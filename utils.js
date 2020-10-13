// get base64 data from url
async function toDataUrl(url) {
    return new Promise((resolve, reject) => {
        fetch(url,
            {
                method: 'get',
                responseType: 'blob'
            }).then(res => {
            if (res.ok) {
                return res.blob()
            } else {
                reject(res)
            }
        }).then(blob => {
            const reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result)
            }
            reader.readAsDataURL(blob);
        }).catch(e => {
            reject(e)
        })
    })
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