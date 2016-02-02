SF.Fly = SF.Sprite.extend({


    init: function(o) {

        o.w = 22;
        o.h = 22;
        o.vx = 1;
        this._super(o);

        this.name = 'fly';

        this.r = this.h / 2;
        this.q = Math.ceil( this.r / 2 );

        this.checkCollision = true;
        this.respawn();

        this.flap = 0;
        this.strength = -2;

    },

    update: function() {

        this.x += this.vx;
        if (this.x < (0 - this.w)) {
            this.respawn();
        }


        this.flap = (SF.tick % 3) ? 3 : 0;

    },

    render: function() {

        var ctx = SF.ctx,
            x = this.x + this.q,
            y = this.y + this.q;

        ctx.beginPath();
        ctx.moveTo(this.x + this.q, this.y + this.q);
        ctx.lineTo(this.x + this.q, ( this.y + this.h ) - 3);
        ctx.lineTo(this.x - this.q, this.y + (this.h / 2));
        ctx.fillStyle = 'orange';
        ctx.strokeStyle = '#c02';
        ctx.stroke();
        ctx.fill();
  
        SF.Draw.circle(this.x + 16, this.y + this.flap, 6, '#666');
        SF.Draw.circle(this.x + this.r, this.y + this.r, this.r, '#333', '#111');
        SF.Draw.circle(this.x + 18, this.y + 2 + this.flap, 7, '#999');
        SF.Draw.circle(this.x, this.y + 4, 4, '#fff');
        SF.Draw.circle(this.x - 1, this.y + 4, 1, '#600');

    },

    respawn: function() {

        this._super();

        this.x = ~~(Math.random() * SF.W) + SF.W;
        this.y = ~~(Math.random() * 200) + 10;

        this.checkCollision = true;

        this.vx = -4;
        this.vy = 0;
    }


});
