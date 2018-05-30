class Grid {
    constructor(game, scale, blockCountX, blockCountY, cntRowRest) {
        let self = this
        self.game = game
        self.scale = scale
        self.blockCountX = blockCountX
        self.blockCountY = blockCountY
        self.cntRowRest = 3
        self.pointFixed = 1
        self.pointMoving = 2
        self.rowClearedCountTotal = 0
        self.rowClearedCount = 0
        self.dataArray = self.dataArrayInit(blockCountX, blockCountY)
    }

    static new(...args) {
        return new this(...args)
    }

    dataArrayInit(blockCountX, blockCountY) {
        let d = []
        for (let i = 0; i < blockCountY + 1; i++) {
            let dd = new Array(blockCountX)
            dd.fill(0)
            d.push(dd)
        }
        return d
    }

    draw() {
        let s = this
        s.drawGridWithArray()
    }

    drawGridWithArray() {
        let s = this
        let w = s.scale.w
        let h = s.scale.h
        let x = s.scale.x
        let y = s.scale.y
        let lengthSide = h / (s.blockCountY - s.cntRowRest)
        let ctx = s.game.context
        for (let i = s.cntRowRest; i < s.blockCountY; i++) {
            for (let j = 0; j < s.blockCountX; j++) {
                let d = s.dataArray[i][j]
                let x0 = x + j * lengthSide
                let y0 = y + (i - s.cntRowRest) * lengthSide
                if (d === 0) {
                    ctx.strokeRect(x0, y0, lengthSide, lengthSide)
                } else {
                    ctx.strokeStyle = "white"
                    ctx.strokeRect(x0, y0, lengthSide, lengthSide)
                    ctx.fillStyle = "black"
                    ctx.fillRect(x0, y0, lengthSide, lengthSide)
                    ctx.strokeStyle = "black"
                }
            }
        }
    }

    update() {
        let s = this
    }

    injectPosition(pointPosition) {
        let self = this
        let a = self.dataArray
        for (let p of pointPosition) {
            a[p[1]][p[0]] = self.pointMoving
        }
    }

    restore() {
        let s = this
        let a = s.dataArray
        for (let i = 0; i < s.blockCountY; i++) {
            for (let j = 0; j < s.blockCountX; j++) {
                if (a[i][j] != s.pointFixed) {
                    a[i][j] = 0
                }
            }
        }
    }

    save() {
        let s = this
        let a = s.dataArray
        for (let i = 0; i < s.blockCountY; i++) {
            for (let j = 0; j < s.blockCountX; j++) {
                if (a[i][j] === s.pointMoving) {
                    a[i][j] = s.pointFixed
                }
            }
        }
        s.clearRow()
    }

    clearRow() {
        let self = this
        let a = self.dataArray
        let rowCleared = []
        for (let i = 0; i < self.blockCountY; i++) {
            let aa = a[i]
            if (aa.reduce((x, y) => x + y) === aa.length) {
                for (let j = 0; j < aa.length; j ++) {
                    a[i][j] = 0
                }
                rowCleared.push(i)
            }
        }
        self.moveRow(rowCleared)
    }

    moveRow(rowCleared) {
        let self = this
        let a = self.dataArray
        let rowCount = rowCleared.length
        // 计数消除的代码
        self.rowClearedCount = rowCount
        self.rowClearedCountTotal += rowCount
        if (rowCount > 0) {
            let rowStart = rowCleared[0] - 1
            for (let i = rowStart; i >= 0; i --) {
                for (let j = 0; j < self.blockCountX; j ++) {
                    a[i + rowCount][j] = a[i][j]
                }
            }
        }
    }

    refresh(pointPosition) {
        let self = this
        self.restore()
        self.injectPosition(pointPosition)
    }

    collideOnDirection(tetris, direction) {
        let self = this
        let a = self.dataArray
        let points = tetris.pointPosition()
        let pf = self.pointFixed
        for (let p of points) {
            if (direction === cDirection.down) {
                let x = p[0]
                let y = p[1] + 1
                if (a[y][x] === pf || y === self.blockCountY) {
                    return true
                }
            } else if (direction === cDirection.left) {
                let x = p[0] - 1
                let y = p[1]
                if (a[y][x] === pf || x < 0) {
                    return true
                }
            } else if (direction === cDirection.right) {
                let x = p[0] + 1
                let y = p[1]
                if (a[y][x] === pf || x === self.blockCountX) {
                    return true
                }
            }
        }
        return false
    }

    pointOverflow(point) {
        let self = this
        let pf = self.pointFixed
        let a = self.dataArray
        let x = point[0]
        let y = point[1]
        let overflowY = (y >= self.blockCountY) || (y < 0)
        let overflowX = (x >= self.blockCountX) || (x < 0)
        return (a[y][x] === pf || overflowX || overflowY)
    }

    overflowRooftop() {
        let self = this
        let rowOffset = self.cntRowRest - 1
        let row = self.dataArray[rowOffset]
        let pointsFixed = row.filter(x => x === self.pointFixed)
        return pointsFixed.length > 0
    }

}