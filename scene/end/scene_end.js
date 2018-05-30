class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)

        this.setupInputs()
    }
    update() {
        super.update()
        
    }
    setupInputs() {
        let game = this.game
        game.registerAction('enter', function(keyStatus) {
            let s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        super.draw()
        this.game.context.fillText(`按 enter 重新开始游戏`, 90, 430)
    }
}
