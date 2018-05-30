class SquareO extends Square {
    constructor(x, y, limitX, limitY, grid) {
        super(x, y, limitX, limitY, grid)
    }

    pointPosition() {
        let self = this
        let x = self.x
        let y = self.y
        return [[x, y], [x + 1, y], [x, y + 1], [x + 1, y + 1]]
    }

    move(direction) {
        let self = this
        let d = cDirection
        if (direction == d.down) {
            if (self.y + 2 < self.limitY) {
                self.y += 1
            }
        } else if (direction == d.left) {
            if (self.x - 1 >= 0) {
                self.x -= 1
            }
        } else if (direction == d.right) {
            if (self.x + 2 < self.limitX) {
                self.x += 1
            }
        }
    }

}