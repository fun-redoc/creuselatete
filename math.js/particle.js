var particle = (function() {
  "use strict";
    var proto = {
        update : function() { 
                        this.accelerateWithVector(this.gravity)
                        this.pos.addBy(vector.create(0,0).lengthBy(this.speed).angleBy(this.angle));
                        return this 
                    },
        rotateBy : function(a) {
            this.angle += a
        },
        accelerate : function(acc) {
          this.speed += acc  
        },
        accelerateWithVector : function(acc) {
                        //this.vel.addBy(acc)
                        this.speed += acc.length
                        this.angle += acc.angle
                        return this
                    }
    }
    var create = function(shape, x,y,speed,angle,gravity,extension) {
                      "use strict";
        g.extend(proto, extension)
        var obj = Object.create(proto)
        obj.pos = vector.create(x,y)
        obj.speed = speed
        obj.angle = angle
        //obj.vel = vector.create(0,0).lengthBy(speed).angleBy(angle)
        obj.gravity = vector.create(0, gravity || 0)
        obj.shape = shape
        return obj
    }
    
    var update = function(o) {
        o.update()
        return o
    }

    return Object.create({
        create: create,
        update: update,
        accelerate : function(acc) {
            return function(p) {
                return p.accelerate(acc)
            }
        },
        rotateBy : function(a) {
            return function(p) {
                return p.rotateBy(a)
            }
        }
    })
})()
