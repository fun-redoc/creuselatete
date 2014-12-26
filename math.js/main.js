window.onload = function() {
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext("2d")
    var width = canvas.width = window.innerWidth
    var height = canvas.height = window.innerHeight
    var gravity = vector.create(0,0.1)
    
    //ctx.fillRect(0,0,width,height)
    
    var v1 = vector.create(1,2)
    var v2 = vector.create(3,-2)
    console.log(v1.dot(v2))
    console.log(v1.angleTo(v2) * 180 /Math.PI  )
    
    var v = vector.create(2,4), w = vector.create(5,3)
    console.log(v.projOn(w).toString)
    console.log(v.perpOn(w).toString)

    var particleExtension = {draw: function() {
            ctx.beginPath()
            ctx.arc(this.pos.x, this.pos.y, 4, 0, Math.PI*2, false)
            ctx.fill()
        
    }}
    
    // basic animaion frame
    var particles = []
    for( var i = 0; i < 100; i+=1) {
        particles.push(particle.create(100,height / 3 ,Math.random()*5+2,Math.random()*Math.PI*2,0.1,particleExtension))
    }
    
    update()
    
    
    function update() {
        ctx.clearRect(0,0,width,height)
        
        // do animation here
        
        // render
        particles.forEach( function(p) { p.draw() } ) 
        
        // simulate
        particles.forEach( particle.update ) 
        
        requestAnimationFrame(update)
        
    }
}