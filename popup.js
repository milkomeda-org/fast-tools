let text = document.getElementById('text');
let text_icon = document.getElementById('text_icon')
let submit = document.getElementById('submit');

const Expression = /http(s)?:\/\/?/;
const objExp = new RegExp(Expression);
const TEXT_PREFIX = "data:text/plain;base64,"

const submit_status = function (disabled) {
    submit.disabled = disabled
}

text.oninput = function (element) {
    submit.innerText = "GET"
    if (text.value !== '') {
        if (objExp.test(text.value) === true) {
            text_icon.setAttribute("uk-icon", "icon: link")
            submit_status(false)
        } else {
            text_icon.setAttribute("uk-icon", "icon: file-text")
            submit_status(false)
        }
    } else {
        text_icon.setAttribute("uk-icon", "icon: code")
        submit_status(true)
    }
}

submit.onclick = async function (element) {
    const f = async function () {
        submit_status(true)
        if (objExp.test(text.value) === true) {
            await toDataUrl(text.value, function (myBase64) {
                copyToClipboard(myBase64);
            });
        } else {
            copyToClipboard(TEXT_PREFIX + window.btoa(text.value));
        }
        text.value = ""
        submit.innerText = "OK"
        submit_status(true)
    };
    await f()
};