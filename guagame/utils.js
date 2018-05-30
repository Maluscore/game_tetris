var e = sel => document.querySelector(sel)

var appendHtml = function(element, html) {
	element.insertAdjacentHTML('beforeend', html)
}

const cDirection = {
    up: 1, down: 2, left: 3, right: 4
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var canvasDrawLine = function(context, x0, y0, x1, y1) {
    var ctx = context
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

var rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.h) {
        if (b.x > o.x && b.x < o.x + o.w) {
            return true
        }
    }
    return false
}

var rectInterMiddle = function(a, b, c) {
    var o = a
    if (o.x === b.x && o.y > b.y) {
        if (o.x === c.x && o.y < c.y) {
            return true
        }
    }
    return false
}

var generateDebugRange = function(module, range) {
    var debugZone = e('.div-debug')
    var debugHtml = (`
        <div>
            <label>
                <input class="input-slider" 
                type="range" value=""
                min="${range[0]}" max="${range[1]}"
                data-value="config.${module}" 
                 ></input>
                ${module}：<span class="debug-span" id="id-span-${module}"></span>
            </label>
        </div>
    `)
    appendHtml(debugZone, debugHtml)
}

const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

var deleteFromElements = function(sceneItem) {
    var elements = sceneItem.game.scene.elements
    elements.splice(elements.indexOf(sceneItem), 1)
}