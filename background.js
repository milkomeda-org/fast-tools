chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        type: 'normal',
        title: 'Copy base64',
        id: 'base64',
        contexts: ['image', 'audio']
    }, function () {
        console.log('contextMenus are create.');
    });

    chrome.contextMenus.onClicked.addListener(function (info, tab) {
        toDataUrl(info.srcUrl, function (myBase64) {
            console.log(myBase64)
            copyToClipboard(myBase64)
        });
    })
});
