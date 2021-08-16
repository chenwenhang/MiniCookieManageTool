let scoreTabId = 0,
    scoreWindowId = 0;
let windowWidth = 360;
let windowHeight = 160;
let chromeVersion = (/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [0, 0])[1];
let firefoxVersion = (/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [0, 0])[1];
let isMobile = !!(/Mobile/.exec(navigator.userAgent));
let url = "./manager.html"

//创建窗口
function createWindow(url, callback) {
    chrome.windows.create({
        "url": url,
        "type": "panel",
        "top": 0,
        "left": 0,
        "width": windowWidth,
        "height": windowHeight
    }, function (window) {
        if (firefoxVersion) {
            chrome.windows.update(window.id, {
                "top": 0,
                "left": 0,
            });
        }
        chrome.tabs.update(window.tabs[window.tabs.length - 1].id, { "muted": true });
        if (typeof callback === "function") {
            callback(window);
        }
    })
}

//扩展按钮点击事件
chrome.browserAction.onClicked.addListener(function (tab) {
    if (chromeVersion < 45 && firefoxVersion < (isMobile ? 55 : 48)) {
        notice("版本过旧，请升级版本");
    } else {
        createWindow(url, function (window) {
            console.log("打开网页成功")
        });
    }
});