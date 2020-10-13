chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        type: 'normal',
        title: 'Copy base64',
        id: 'any-base-8c36c99c-44ac-46d4-b981-8edaeaf803ab',
        contexts: ['image', 'audio']
    }, function () {
        console.log('contextMenus are create.');
    });

    chrome.contextMenus.onClicked.addListener(async function (info, tab) {
        console.log("request from " + info.srcUrl)
        try {
            await toDataUrl(info.srcUrl).then(data => {
                console.log(data)
                copyToClipboard(data)
            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
        }
    })
});
