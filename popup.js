//base
let text = document.getElementById('text');
let text_icon = document.getElementById('text_icon')
let submit = document.getElementById('submit');
// ticker
let ticker = document.getElementById("ticker")
let timestamp = document.getElementById('timestamp')
let copy_ticker = document.getElementById('copy_ticker')
let copy_timestamp = document.getElementById('copy_timestamp')
// port scan
let host = document.getElementById('host')
let port = document.getElementById('port')
let scan = document.getElementById('scan')

const Expression = /http(s)?:\/\/?/;
const objExp = new RegExp(Expression);
const TEXT_PREFIX = "data:text/plain;base64,"

const OK = function () {
    UIkit.notification({
        message: 'OK',
        status: 'success',
        pos: 'top-right',
        timeout: 100
    });
};

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

const ping = (url, timeout = 6000) => {
    return new Promise((reslove, reject) => {
        const urlRule = new RegExp('(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]');
        if (!urlRule.test(url)) reject('invalid url');
        try {
            fetch(url).then(() => reslove(true)).catch(() => reslove(false));
            setTimeout(() => {
                reslove(false);
            }, timeout);
        } catch (e) {
            reject(e);
        }
    });
};

const submit_status = function (executing) {
    submit.disabled = executing;
}

text.oninput = function (element) {
    submit_status(text.value === '')
    text_icon.setAttribute("uk-icon", text.value === '' ? "icon: code" : (objExp.test(text.value) === true ? "icon: link" : "icon: file-text"))
}

submit.onclick = async function (element) {
    const f = async function () {
        submit_status(true)
        if (objExp.test(text.value) === true) {
            try {
                await toDataUrl(text.value).then(data => {
                    console.log(data)
                    copyToClipboard(data)
                }).catch(e => {
                    console.log(e)
                })
            } catch (e) {
                console.log(e);
            }
        } else {
            copyToClipboard(TEXT_PREFIX + window.btoa(text.value));
        }
        text.value = ""
        text.focus()
        OK()
        submit_status(true)
    };
    await f()
};

// ticker
//取得系统当前时间
Date.prototype.format = function (format) {
    const o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length === 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
    }
    return format;
}

function getTime() {
    const date = new Date()
    ticker.placeholder = date.format("yyyy-MM-dd hh:mm:ss");
    timestamp.placeholder = date.getTime()
}

window.setInterval(getTime, 1); //每一秒刷新
ticker.oninput = function (e) {
    if ("" !== ticker.value) {
        const date = new Date(ticker.value.replace(/-/g, "/"))
        timestamp.value = date.getTime()
    } else {
        timestamp.value = ""
    }
};
timestamp.oninput = function (e) {
    if ("" !== timestamp.value) {
        const date = new Date(parseInt(timestamp.value))
        ticker.value = date.format("yyyy-MM-dd hh:mm:ss");
    } else {
        ticker.value = ""
    }
};
copy_ticker.onclick = async function (e) {
    await copyToClipboard(ticker.value !== "" ? ticker.value : ticker.placeholder)
    OK()
};
copy_timestamp.onclick = async function (e) {
    await copyToClipboard(timestamp.value !== "" ? timestamp.value : timestamp.placeholder)
    OK()
};

// port scan
// host.oninput = function (element) {
//     scan.disabled = ("" === host.value)
// }
// scan.onclick = function (e) {
//     //发起tcp
//     const port = "" === port.value ? 80 : port.value
//     const port_scan = new RTCPeerConnection({
//         iceServers: "turn:" + host.value + ":" + port + "?transport=tcp",
//         iceCandidatePoolSize: 0
//     });
//     port_scan.createDataChannel('', {
//         reliable: false
//     });
//     port_scan.onicecandidateerror = function (e) {
//         if (e.url == null) {
//             return;
//         }
//         if (e.hostCandidate !== "0.0.0.x:0") {
//             console.log("open")
//         } else {
//             console.log("close")
//         }
//     }
//     setTimeout(function () {
//         if (port_scan.iceGatheringState === "gathering") {
//             port_scan.close();
//         }
//     }, 60000);
//     port_scan.onicegatheringstatechange = function (e) {
//         if (port_scan.iceGatheringState === "complete") {
//             port_scan.close();
//         }
//     }
//     port_scan.createOffer(function (offerDesc) {
//             port_scan.setLocalDescription(offerDesc);
//         },
//         function (e) {
//             console.log("Create offer failed callback.");
//         });
// }
