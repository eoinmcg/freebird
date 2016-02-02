SF.Cloud = SF.Sprite.extend({


    init: function(o) {
        this._super(o);

        this.w = 16;
        this.h = 16;
        this.name = 'cloud';
        this.checkCollision = false;
        this.respawn();



    },

    update: function() {


        this.x += this.vx;
        if (this.x < (0 - ( this.w * 2 ))) {
            this.respawn();
        }

    },

    render: function() {

        SF.Draw.circle(this.x, this.y, this.w, '#fff');
        SF.Draw.circle(this.x + this.w, this.y, this.w, '#fff');
        SF.Draw.circle(this.x + this.r, this.y - this.r, this.w, '#fff');

    },

    respawn: function() {
    
        var speed;

        this._super();

        this.x = ~~(Math.random() * SF.W) + SF.W;
        this.y = ~~(Math.random() * ( SF.H - (this.h * 3) )) + this.h;

        this.w = ~~( Math.random() * 30 ) + 10;
        this.r = this.w / 2;

        speed = ( this.w - 50 ) / 5;
        this.vx = (speed);
        this.vy = 0;

    }


});

