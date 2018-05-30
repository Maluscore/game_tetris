class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        let self = this
        let title = SceneLable.new(game, "按 Enter 开始游戏", 90, 230)
        self.addElement(title)
        self.setupInputs()
    }
    update() {
        super.update()
        
    }
    setupInputs() {
        let game = this.game
        game.registerAction('enter', function(keyStatus) {
            log("enter!")
            let s = SceneMain.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        super.draw()
    }
}
