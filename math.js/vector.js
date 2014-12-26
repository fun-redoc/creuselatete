var vector = (function() {
  "use strict";
    var proto =  {
// _x: null,
// _y: null,
// _a: null,
// _l: null,
        get clone() { return create(this.x, this.y) },
        get toString()  {
                    var result = '(' + this.x + ',' + this.y + ')'
                    return result},
        get x() { if( this._x === null && this._a !== null && this._l !== null ) {this._x = Math.cos(this._a)*this._l}; return this._x },
        set x(vx) { this.y; this._x = vx; this._a = null; this._l = null },
        get y() { if( this._y === null && this._a !== null && this._l !== null) { this._y = Math.sin(this._a)*this._l}; return this._y },
        set y(vy) { this.x; ; this._y = vy; this._a = null; this._l = null },
        get length() { if( this._l === null ){ this._l = Math.sqrt(this.norm)}; return this._l },
        set length(l) { this.angle; this._l = l; this._x = null; this._y = null },
        get angle() { if( this._a === null) { this._a = Math.atan2(this.y,this.x) }; return this._a },
        set angle(a) { this.length; this._a = a; this._x = null; this._y = null},
        get norm() { return this.x*this.x+this.y*this.y },
        get neg() { return create(this.x,-this.y)},
        lengthBy : function(l) { this.length = l; return this }, 
        angleBy : function(a) { this.angle = a; return this }, 
        add: function(v) { return create(this.x+v.x, this.y+v.y) },
        addBy: function(v) { this.x += v.x; this.y += v.y; return this },
        sub: function(v) { return create(this.x-vx,this.y-v.y) },
        subBy: function(v) { this.x -= v.x; this.y -= v.y; return this },
        mul: function(s) { return create(this.x*s,this.y*s) }, 
        mulBy: function(s) { this.x *= s; this.y *= s; return this },
        div: function(s) { return create(this.x/s,this.y/s) },
        divBy: function(v) { this.x /= s; this.y /= s; return this },
        mod: function(x,y) { return this.clone.modBy(x,y) },
        modBy: function(x,y) { this.x = this.x < 0 ? x + this.x%x: this.x%x; this.y = this.y < 0 ? y + this.y%y: this.y%y; return this },
        get unit() { var l = this.length; return this.div(l)},
        get perpendicular() { return create(-this.y, this.x)},
        dot: function(v) { return this.x*v.x+this.y*v.y},
        pdot: function(v) { return this.x*v.y-this.y*v.x },
        angleTo: function(v) { return Math.acos(this.dot(v) / (this.length*v.length))},
        projOn: function(w) { return w.mul(this.dot(w)/w.norm)},
        perpOn: function(w) { return w.perpendicular.mul(this.pdot(w)/w.norm ) } 
    }
    var create = function create(x,y) {
        var obj = Object.create(proto)
        
        obj._x= null
        obj._y= null
        obj._a= null
        obj._l= null
        
        obj.x = x
        obj.y = y
        return obj
    }
    
    
    return Object.create({
        create:create
    })
})()

//console.log(vector.create(-2,-1).modBy(3,3).toString)
//console.log(vector.create(0,0).lengthBy(10).angleBy(0).toString)