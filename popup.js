let text = document.getElementById('text');
let submit = document.getElementById('submit');

const Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
const objExp = new RegExp(Expression);
const TEXT_PREFIX = "data:text/plain;base64,"

const submit_status = function (disabled, tx) {
    submit.disabled = disabled
    submit.setAttribute('class', !disabled ? 'activity' : '')
    if (tx) {
        submit.value = tx
        if (tx === "OK") {
            //     chrome.notifications.create(Math.random() + '', {"type":"basic","iconUrl":"./128.png", "title":"Done", "message":`The code is copied to the clipboard!\n${new Date()}`},function (notificationId){
            //
            //     })
            submit.setAttribute('class', 'activity_ok')
        }
    }
}

text.oninput = function (element) {
    if (text.value !== '') {
        if (objExp.test(text.value) === true) {
            submit_status(false, "Url")
        } else {
            submit_status(false, "Text")
        }
    } else {
        submit_status(true, "Base")
    }
}

submit.onclick = async function (element) {
    const f = async function () {
        submit_status(true, "Executing")
        if (objExp.test(text.value) === true) {
            await toDataUrl(text.value, function (myBase64) {
                copyToClipboard(myBase64);
            });
        } else {
            copyToClipboard(TEXT_PREFIX + window.btoa(text.value));
        }
        text.value = ""
        submit_status(true, "OK")
    };
    await f()
};