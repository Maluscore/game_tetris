class SceneScale {
    constructor(x, y, w, h) {
        let self = this
        self.w = w
        self.h = h
        self.x = x
        self.y = y
    }

    static new(...args) {
        var i = new this(...args)
        return i
    }
    
}


