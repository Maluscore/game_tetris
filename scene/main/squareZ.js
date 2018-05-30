class SquareZ extends Square {
    constructor(x, y, limitX, limitY, grid) {
        super(x, y, limitX, limitY, grid)
    }

    pointPosition() {
        let self = this
        let x = self.x
        let y = self.y
        let pr = self.poseRange
        if (self.pose === pr.horizontal || self.pose === pr.horizontalMirror) {
            return [[x, y], [x + 1, y], [x + 1, y + 1], [x + 2, y + 1]]
        } else {
            return [[x + 1, y], [x, y + 1], [x + 1, y + 1], [x, y + 2]]
        }
    }

    move(direction) {
        let self = this
        let d = cDirection
        // 用已有的 pointPosition 中的点来表示极端位置
        let points = self.pointPosition()
        let p1 = points[0]
        let p2 = points[3]
        let pr = self.poseRange
        if (direction == d.down) {
            let y = p2[1]
            if (y < self.limitY) {
                self.y += 1
            }
        } else if (direction == d.left) {
            if (self.pose === pr.horizontal) {
                var x = p1[0]   
            } else if (self.pose === pr.vertical) {
                var x = points[1][0]
            }
            if (x - 1 >= 0) {
                self.x -= 1
            }
        } else if (direction == d.right) {
            if (self.pose === pr.horizontal) {
                var x = p2[0]   
            } else if (self.pose === pr.vertical) {
                var x = p1[0]
            }
            if (self.x + 1 < self.limitX) {
                self.x += 1
            }
        } else if (direction == d.up) {
            super.transfrom()
        }
    }

}