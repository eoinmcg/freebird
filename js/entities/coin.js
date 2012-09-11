SF.Coin = SF.Sprite.extend({


    init: function(o) {
        this._super(o);

        this.w = 16;
        this.h = 16;
        this.name = 'coin';
        this.checkCollision = true;
        this.strength = 15;
        this.respawn();

        this.sparkle = 0;


    },

    update: function() {

        this.sparkle = SF.fadeText / 4;

        this.x += this.vx;
        if (this.x < (0 - this.w)) {
            this.respawn();
        }

    },

    render: function() {
        SF.Draw.circle(this.x, this.y, this.w / 2, '#ffd700', 'brown');
        SF.Draw.circle(this.x, this.y, this.w / 2, 
            'rgba(255,255,255,'+this.sparkle+')');
    },

    respawn: function() {
    
        this._super();

        this.x = ~~(Math.random() * SF.W) + SF.W;
        this.y = ~~(Math.random() * ( SF.H - (this.h * 3) )) + this.h;

        this.vx = -3;
        this.vy = 0;
    },

    hit: function() {

        var n;

        for (n = 0; n < 3; n +=1 ) {
            SF.entities.push(new SF.Particle(
                this.x, 
                this.y, 
                3, 
                // random opacity to spice it up a bit
                'rgba(255,215,0,'+Math.random()*2+')',
                'star'
            )); 
        }
        this.respawn();

    }

});
