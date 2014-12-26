window.onload = function() {
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext("2d")
    var width = canvas.width = window.innerWidth
    var height = canvas.height = window.innerHeight
    var acc = vector.create(0.1,0.1)
    
    //ctx.fillRect(0,0,width,height)
    
    var particleExtension = {draw: function() {
            ctx.beginPath()
            ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI*2, false)
            ctx.fill()
        
    }}
    
    
    // basic animaion frame
    var particles = []
    for( var i = 0; i < 1; i+=1) {
        particles.push(
            particle.create(100,height,10,-Math.PI/2,particleExtension)
        )
    }
    
    update()
    
    function update() {
        ctx.clearRect(0,0,width,height)
        
        // do animation here
        
        // render
        particles.forEach( function(p) { p.draw() } ) 

        
        // simulate
        particles.forEach( fn.compose(particle.update, particle.accelerate(acc)) ) 

        
        requestAnimationFrame(update)
        
    }
}