class SquareJ extends Square {
    constructor(x, y, limitX, limitY, grid) {
        super(x, y, limitX, limitY, grid)
    }

    pointPosition() {
        let self = this
        let x = self.x
        let y = self.y
        let pr = self.poseRange
        if (self.pose === pr.horizontal) {
            return [[x, y], [x, y + 1], [x + 1, y + 1], [x + 2, y + 1]]
        } else if (self.pose === pr.vertical) {
            return [[x, y], [x + 1, y], [x, y + 1], [x, y + 2]]
        } else if (self.pose === pr.verticalMirror) {
            return [[x + 2, y], [x + 2, y + 1], [x + 1, y + 2], [x + 2, y + 2]]
        } else {
            return [[x, y], [x + 1, y], [x + 2, y], [x + 2, y + 1]]
        }
    }

    move(direction) {
        let self = this
        let d = cDirection
        // 用已有的 pointPosition 中的点来表示极端位置
        let points = self.pointPosition()
        let pr = self.poseRange
        let p1 = points[0]
        let p2 = points[3]
        if (direction == d.down) {
            let y = p2[1]
            if (y < self.limitY) {
                self.y += 1
            }
        } else if (direction == d.left) {
            let x = p1[0]
            if (self.pose === pr.verticalMirror) {
                x = points[2][0]
            }
            if (x - 1 >= 0) {
                self.x -= 1
            }
        } else if (direction == d.right) {
            let x = p2[0]
            if (self.pose === pr.vertical) {
                x = points[1]
            }
            if (self.x + 1 < self.limitX) {
                self.x += 1
            }
        } else if (direction == d.up) {
            super.transfrom()
        }
    }

}