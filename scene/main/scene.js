class SceneMain extends GuaScene {
    constructor(game) {
        super(game)
        let self = this
        self.timeCounter = 0
        self.blockCountX = 10
        self.blockCountY = 23  // 多出3行用于缓冲图形
        self.cntRowReset = 3
        let gridScale = SceneScale.new(0, 0, 150, 300)
        let grid = Grid.new(game, gridScale, self.blockCountX, self.blockCountY, self.cntRowReset)
        self.grid = grid
        self.addElement(grid)
        self.current = self.randomTetris()
        self.next = self.randomTetris()
        self.pressDown = false
        self.score = 0
        self.setupInputs()
    }

    update() {
        // 游戏结束的判断
        super.update()
        let self = this
        let game = self.game
        self.current.update()
        self.pressDown = game.keydowns['s'] === "down"
        self.timeCounter ++
        if (self.timeCounter === window.fps) {
            if (self.grid.collideOnDirection(self.current, cDirection.down)) {
                // 即将碰撞或越界
                self.grid.save()
                self.current = self.next
                self.next = self.randomTetris()
            } else {
                if (!self.pressDown) {
                    self.current.move(cDirection.down)
                }
                self.grid.refresh(self.current.pointPosition())
            }
            if (self.grid.overflowRooftop()) {
                let s = SceneEnd.new(game)
                game.replaceScene(s)
            }
            self.timeCounter = 0
        }
    }

    randomTetris() {
        let self = this
        let pool = [SquareI, SquareL, SquareO, SquareT, SquareZ, SquareJ, ]
        // let pool = [SquareJ]
        let n = randomBetween(0, pool.length - 1)
        let s = pool[n].new(3, 1, self.blockCountX, self.blockCountY, self.grid)
        return s
    }

    setupInputs() {
        let self = this
        let g = self.game
        g.registerAction('a', function() {
            if (!self.grid.collideOnDirection(self.current, cDirection.left)) {
                self.current.moveByPress(cDirection.left)
                self.grid.refresh(self.current.pointPosition())
            }
        })
        g.registerAction('d', function(keyStatus) {
            if (!self.grid.collideOnDirection(self.current, cDirection.right)) {
                self.current.moveByPress(cDirection.right)
                self.grid.refresh(self.current.pointPosition())
            }
        })
        g.registerAction('w', function(keyStatus) {
            self.current.moveByPress(cDirection.up)
            self.grid.refresh(self.current.pointPosition())
        })
        g.registerAction('s', function(keyStatus) {
            if (!self.grid.collideOnDirection(self.current, cDirection.down)) {
                self.current.moveByPress(cDirection.down)
                self.grid.refresh(self.current.pointPosition())
            }
        })
    }

    draw() {
        super.draw()
        let self = this
        self.drawScore()
    }

    drawScore() {
        let self = this
        let ctx = self.game.context
        self.score = self.grid.rowClearedCountTotal * 10
        ctx.font = "bold 30px Microsoft JhengHei"
        // ctx.fillStyle="green"
        ctx.fillText(self.score, 200, 150)
        ctx.fillStyle="black"
    }

}

