SF.Mozzie = SF.Sprite.extend({


    init: function(o) {

        o.w = 16;
        o.h = 10;
        o.vx = 1;
        this._super(o);

        this.name = 'mozzie';

        this.r = this.h / 2;
        this.q = Math.ceil( this.r / 2 );

        this.checkCollision = true;
        this.respawn();

        this.strength = -5;
        this.offScreen = true;

    },

    update: function() {

        this.x += this.vx;
        if (this.x > (SF.W + this.w)) {
            this.respawn();
        }

        this.offScreen = (this.x < 0) ? true : false;
    },

    render: function() {

        var ctx = SF.ctx,
            x = this.x + this.q,
            y = this.y + this.q;

        if (this.offScreen) {
            SF.Draw.circle(16, y, this.h, 
                'rgba(200,0,0,'+SF.fadeText+')');
            SF.Draw.text('!', 18, y + 10, 14, 
                'rgba(255, 255, 255, '+SF.fadeText+')');
        } else {
        
            SF.Draw.circle(x, y, this.r, '#000');
            SF.Draw.circle(x+this.r, y, this.r, '#000');
            SF.Draw.rect(x + this.r, y - this.q + 2, this.r, this.h, 'black');

            ctx.beginPath();
            ctx.moveTo(x + this.w - 3, y + this.q);
            ctx.lineTo(x + this.w, y + this.r);
            ctx.lineTo(x + this.w + this.r + this.q, y + this.r);
            ctx.fillStyle = '#000';
            ctx.fill();

            SF.Draw.circle(x, y - 5, this.q + 2, 'rgba(255,255,255,0.5)');
            SF.Draw.circle(this.x + this.w - 2, this.y, 2, 'red');
        }


    },

    respawn: function() {

        this._super();

        this.x = ( ~~(Math.random() *  SF.W ) + SF.W ) * -1;
        this.y = ~~(Math.random() * 200) + 10;

        this.vx = 5;
        this.vy = 0;
    }




});


