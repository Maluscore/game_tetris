class SquareI extends Square {
    constructor(x, y, limitX, limitY, grid) {
        super(x, y, limitX, limitY, grid)
    }

    pointPosition() {
        let self = this
        let x = self.x
        let y = self.y
        let pr = self.poseRange
        if (self.pose === pr.vertical || self.pose === pr.verticalMirror) {
            return [[x + 1, y], [x + 1, y + 1], [x + 1, y + 2], [x + 1, y + 3]]
        } else {
            return [[x, y], [x + 1, y], [x + 2, y], [x + 3, y]]
        }
    }

    move(direction) {
        let self = this
        let d = cDirection
        // 用已有的 pointPosition 中的点来表示极端位置
        let points = self.pointPosition()
        let p1 = points[0]
        let p2 = points[3]
        if (direction == d.down) {
            let y = p2[1]
            if (y < self.limitY) {
                self.y += 1
            }
        } else if (direction == d.left) {
            let x = p1[0]
            if (x - 1 >= 0) {
                self.x -= 1
            }
        } else if (direction == d.right) {
            let x = p2[0]
            if (self.x + 1 < self.limitX) {
                self.x += 1
            }
        } else if (direction == d.up) {
            super.transfrom()
        }
    }

}