class Square {
    constructor(x, y, limitX, limitY, grid) {
        let self = this
        self.limitX = limitX
        self.limitY = limitY
        self.grid = grid
        self.x = x
        self.y = y
        self.timeCounter = 1
        self.moveValid = true
        // 统一获取 poseRange，按顺时针走相同的变化方向
        self.poseRange = {horizontal: 0, vertical: 1, horizontalMirror: 2, verticalMirror: 3}
        let pr = self.poseRange
        self.poseOrder = [pr.horizontal, pr.vertical, pr.horizontalMirror, pr.verticalMirror]
        self.pose = pr.horizontal
    }

    static new(...args) {
        return new this(...args)
    }

    update() {
        let self = this
        self.timeCounter ++
        if (self.timeCounter === (window.fps / 3)) {
            self.timeCounter = 1
            self.moveValid = true
        }
    }
    
    moveByPress(direction) {
        let self = this
        if (direction === cDirection.down) {
            self.moveValid = true
        }
        if (self.moveValid) {
            self.move(direction)
            self.moveValid = false
        }
    }

    transfrom() {
        // 统一接收变形的判断
        let self = this
        let po = self.poseOrder
        let pr = self.poseRange
        let poseNow = self.pose
        let poseOffset = po.indexOf(poseNow)
        let poseNext = po[(poseOffset + 1) % po.length]
        self.pose = poseNext
        let pointsTemp = self.pointPosition()
        // 粗躁处理，所有的点均判断是否越界
        for (let p of pointsTemp) {
            if (self.grid.pointOverflow(p)) {
                self.pose = poseNow
                break
            }
        }
    }

}