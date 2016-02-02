SF.Powerup = SF.Sprite.extend({


    init: function(o) {

        o.w = 32;
        o.h = 32;
        o.vx = 1;
        this._super(o);

        this.name = 'powerup';

        this.r = this.h / 2;
        this.q = Math.ceil( this.r / 2 );

        this.checkCollision = true;
        this.respawn();

        this.strength = 0;

    },

    update: function() {

        this.x += this.vx;
        if (this.x > (SF.W + this.w)) {
            this.respawn();
        }

    },

    render: function() {
   

        SF.Draw.circle(this.x + this.r, 
                        this.y + this.r, 
                        this.r, 
                        'rgba(255,0,255,0.3)', '#505');


    },

    respawn: function() {

        this._super();

        this.x = ( ~~(Math.random() *  SF.W ) + SF.W ) * -1;
        this.y = ~~(Math.random() * 200) + 10;

        this.vx = 6;
        this.vy = 0;
    },


    hit: function() {

        var n;

        SF.sfx('powerup');
        for (n = 0; n < 2; n +=1 ) {
            SF.entities.push(new SF.Particle(
                this.x, 
                this.y, 
                3, 
                'purple',
                'star'
            )); 
        }
        this.remove = true;

    }


});
// 
