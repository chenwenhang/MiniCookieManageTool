function setCookies(url, name, value) {
    // 过期时间一个月
    let expireSecond = 30 * 24 * 3600
    let param = {
        url: url,
        name: name,
        value: value,
        path: '/'
    };
    param.expirationDate = new Date().getTime() / 1000 + expireSecond;
    chrome.cookies.set(param, function (cookie) { });
}

function getCookies(url, key) {
    chrome.cookies.get({
        url: url,
        name: key
    }, function (cookies) {
        let value = cookies.value
        // console.log(cookies);
        console.log(value);
    });
}

var CN_URL = prompt("请输入国内域名")
var VA_URL = prompt("请输入美东域名")

// Chrome 扩展禁止所有内联式js写法，因此这里用添加监听事件的方式操作
$("#cn_checkout_id").bind("input propertychange", function (event) {
    let email_prefix = $("#cn_checkout_id").val()
    setCookies(CN_URL, "checkout_id", email_prefix)
});

$("#va_checkout_id").bind("input propertychange", function (event) {
    let email_prefix = $("#va_checkout_id").val()
    setCookies(VA_URL, "checkout_id", email_prefix)
});

// 调试用
// setInterval(function name(params) {
//     getCookies(CN_URL, "checkout_id")
// }, 1000)