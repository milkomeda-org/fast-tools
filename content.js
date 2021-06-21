const toDataUrl = async function (url) {
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

const copyToClipboard = async function (text) {
    const input = document.createElement("input");
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', text);
    input.setAttribute('id', 'temple')
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}

const handleMessage =  async (message, sender, sendResponse) => {
    console.debug("request from " + message)
    try {
        toDataUrl(message).then(data => {
            copyToClipboard(data)
        }).catch(e => {
            console.log(e)
        })
    } catch (e) {
        console.log(e)
    }
    return true
}
chrome.runtime.onMessage.addListener(handleMessage)
