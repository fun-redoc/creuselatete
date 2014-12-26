var line = (function() {
    var proto = {
    }
    var create = function(position,direction, extension) {
        g.extend(proto, extension)
        var obj = Object.create(proto)
        obj.pos = position
        obj.dir = direction
        return obj
    }
    var createWithPoints = function(vector1, vector2, extension) {
        return create(vector1, vector2.sub(vector1).unit, extension)
    }
    
    return Object.create({
        create: create,
        createWithPoints: createWithPoints
    })
})()
