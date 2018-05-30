// 瓜
class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        let self = this
        self.images = images
        self.runCallback = runCallback
        //
        self.scene = null
        self.actions = {}
        self.keydowns = {}
        self.canvas = document.querySelector('#id-canvas')
        self.context = self.canvas.getContext('2d')
        // events
        
        window.addEventListener('keydown', event => {
            let k = event.key
            self.keydowns[k.toLowerCase()] = "down"
        })
        window.addEventListener('keyup', function(event){
            let k = event.key
            self.keydowns[k.toLowerCase()] = "up"
        })
        self.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i   
    }
    drawImage(img) {
        this.context.drawImage(img.texture, img.x, img.y)
    }
    // update
    update() {
        this.scene.update()
    }
    // draw
    draw() {
        this.scene.draw()
    }
    //
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    runloop() {
        // log('fps', window.fps)
        // events
        var g = this
        var actionsKey = Object.keys(g.actions)
        for (var i = 0; i < actionsKey.length; i++) {
            var key = actionsKey[i]
            var status = g.keydowns[key]
            if(status == "down") {
                // 如果按键被按下, 调用注册的 action
                g.actions[key]("down")
            } else if(status == "up") {
                // g.actions[key]("up")
            }
        }
        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()
        // next run loop
        setTimeout(function(){
            g.runloop()
        }, 1000/config.fps)
    }
    textureByName(name) {
        var g = this
        var img = g.images[name]
        
        return img
    }
    runWithScene(scene) {
        var g = this
        g.scene = scene
        // 开始运行程序
        setTimeout(function(){
            g.runloop()
        }, 1000/config.fps)
    }
    replaceScene(scene) {
        this.scene = scene
    }
    __start(scene) {
        this.runCallback(this)
    }

    init() {
        var g = this
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                // 存入 g.images 中
                g.images[name] = img
                // 所有图片都成功载入之后, 调用 run
                loads.push(1)
                log('load images', loads.length, names.length)
                if (loads.length == names.length) {
                    log('load images', g.images)
                    g.__start()
                }
            }
        }
    }
}
