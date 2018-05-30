class SceneLable {
    constructor(game, text, x, y) {
        let self = this
        self.game = game
        self.text = text
        self.x = x
        self.y = y
    }

    static new(...args) {
        var i = new this(...args)
        return i
    }

    draw() {
        let s = this
        // s.game.context.font = "20px Microsoft JhengHei"
        s.game.context.fillText(s.text, s.x, s.y)
    }

    update() {

    }
    
}


