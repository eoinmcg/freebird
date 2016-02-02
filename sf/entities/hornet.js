SF.Hornet = SF.Sprite.extend({


    init: function(o) {

        o.w = 16;
        o.h = 12;
        o.vx = 1;
        this._super(o);

        this.name = 'hornet';

        this.r = this.h / 2;
        this.q = Math.ceil( this.r / 2 );

        this.checkCollision = true;
        this.strength = -5;
        this.respawn();

    },

    update: function() {

        this.x += this.vx;
        if (this.x < (0 - this.w)) {
            this.respawn();
        }

    },

    render: function() {
   

        var ctx = SF.ctx,
            x = this.x + this.q,
            y = this.y + this.q;

        // SF.Draw.rect(this.x, this.y, this.w, this.h, '#fff');
        SF.Draw.circle(x, y, this.r, '#000');
        SF.Draw.circle(x - 5, y -2, 2, '#fff');
        SF.Draw.circle(x+this.r, y, this.r, '#000');
        SF.Draw.rect(x + this.r, y - this.q + 2, this.r, this.h, 'yellow');

        ctx.beginPath();
        ctx.moveTo(x + this.w, y + this.r);
        ctx.lineTo(x + this.w, y);
        ctx.lineTo(x + this.w + this.q + this.q, y + this.r);
        ctx.fillStyle = '#000';
        ctx.fill();

        SF.Draw.circle(x+ 5, y - 5, this.q + 2, '#69a');
    },

    respawn: function() {

        this._super();

        this.x = ~~(Math.random() * SF.W) + SF.W;
        this.y = ~~(Math.random() * 200) + 10;

        this.vx = -7;
        this.vy = 0;
    }


});
