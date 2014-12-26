window.onload = function() {
'use strict';    
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext("2d")
    var width = canvas.width = window.innerWidth
    var height = canvas.height = window.innerHeight
    var accVal = 1
    var turnAngleRadians = 10 * Math.PI / 180

    //ctx.fillRect(0,0,width,height)
    
    var shipShapeParticleExtension = {draw: function() {
            //restrict to viewport
            var p = this.pos.mod(width, height)
            ctx.save()
            ctx.translate(p.x, p.y)
            ctx.rotate(this.angle)
            ctx.beginPath()
            var v = this.shape
            var n = v.length
            ctx.moveTo(v[0].x, v[0].y)
            for( var i = 1; i < n; i+=1) {
                ctx.lineTo(v[i].x, v[i].y)
            }
            ctx.lineTo(v[0].x, v[0].y)
            
            ctx.stroke()
            ctx.restore()
            return this
        
    }}
    // functional wrapper
    g.extend(particle, {draw: function(p) {return p.draw()}})
    
    var ship = {
        body : particle.create([vector.create(-5,-5), vector.create(5, 0), vector.create(-5,5), vector.create(-3,0)], 
                            10,10,0,0,0, shipShapeParticleExtension),
        thrust : particle.create([vector.create(-7,0), vector.create(-3, 0)], 
                            10,10,0,0,0, shipShapeParticleExtension),
        showThrust : false,
        update : function() {
            this.body.update()
            this.thrust.update()
            return this
        },
        draw : function() {
            this.body.draw()
            if( this.showThrust ) {
                this.thrust.draw()
            }
        },
        accelerate : function(acc) {
            this.showThrust = (acc > 0)
            //console.log(acc, this.showThrust)
            this.body.accelerate(acc)
            this.thrust.accelerate(acc)
        },
        rotateBy : function(a) {
            this.body.rotateBy(a)
            this.thrust.rotateBy(a)
        }
    }
    
    document.body.addEventListener("keydown" ,function(evt) {
        switch (evt.keyCode) {
            case 38: // up
                ship.accelerate(accVal)
                break;
            case 40: // down
                ship.accelerate(-accVal)
                break;
            case 37: // left
                ship.rotateBy(-turnAngleRadians)
                break;
            case 39: // right
                ship.rotateBy(turnAngleRadians)
                break;
            default:
                // nothing
        }
    })
    document.body.addEventListener("keyup" ,function(evt) {
        switch (evt.keyCode) {
            case 40: // up
                ship.accelerate(0)
                break;
            case 38: // up
                ship.accelerate(0)
                break;
            default:
                // nothing
        }
    })
    
    var particles = [ship]
    
    update()
    
    function update() {
        ctx.clearRect(0,0,width,height)
        // do animation here
        particles.forEach( 
            fn.compose(
                particle.draw,
                particle.update
            )
        )
        requestAnimationFrame(update)
    }
}