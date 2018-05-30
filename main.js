var generateDebugDom = function () {
    for (var el of debugObj) {
        generateDebugRange(el.module, el.range)
    }

    bindAll('.input-slider', 'input', function (event) {
        var target = event.target
        var bindVal = target.dataset.value
        var debugVal = target.value
        eval(bindVal + '=' + debugVal)
        var label = target.closest('label').querySelector('.debug-span')
        label.innerText = debugVal
    })
}

var __main = function () {
    var images = {
        bgNight: 'img/bg_night.png'
    }
    var tempFps = 30
    window.timeCnt = 1
    var game = GuaGame.instance(tempFps, images, function (g) {
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    generateDebugDom()
}

__main()
