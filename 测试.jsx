#target photoshop

app.bringToFront();

// 定义要修改的图层名
var layerNames = ["【公里数】", "【日期时间】", "【时间】"];

// 检查这些图层是否存在
var foundLayers = {};
for (var i = 0; i < layerNames.length; i++) {
    var layer = app.activeDocument.artLayers.getByName(layerNames[i]);
    if (layer && layer.kind == LayerKind.TEXT) {
        foundLayers[layerNames[i]] = layer;
    } else {
        foundLayers[layerNames[i]] = null;
    }
}

// 构建输入面板
var win = new Window("dialog", "修改文字内容");

win.pnl = win.add("panel", undefined, "请输入新的文字内容");

win.kmInput = win.pnl.add("edittext", [10, 15, 280, 35], foundLayers["【公里数】"] ? foundLayers["【公里数】"].textItem.contents : "");
win.kmInput.active = true;

win.dateInput = win.pnl.add("edittext", [10, 40, 280, 60], foundLayers["【日期时间】"] ? foundLayers["【日期时间】"].textItem.contents : "");

win.timeInput = win.pnl.add("edittext", [10, 65, 280, 85], foundLayers["【时间】"] ? foundLayers["【时间】"].textItem.contents : "");

win.btnGroup = win.add("group");
win.btnGroup.orientation = "row";
win.btnGroup.alignChildren = ["right","top"];
win.btnGroup.spacing = 10;
win.btnGroup.margins = [0,10,10,10];

win.btnCancel = win.btnGroup.add("button", undefined, "取消");
win.btnOK = win.btnGroup.add("button", undefined, "确定");

// 显示窗口
var result = win.show();

if (result == 1) { // 用户点击了“确定”
    var kmText = win.kmInput.text;
    var dateText = win.dateInput.text;
    var timeText = win.timeInput.text;

    if (foundLayers["【公里数】"]) foundLayers["【公里数】"].textItem.contents = kmText;
    if (foundLayers["【日期时间】"]) foundLayers["【日期时间】"].textItem.contents = dateText;
    if (foundLayers["【时间】"]) foundLayers["【时间】"].textItem.contents = timeText;

    alert("文字已更新！");
}
