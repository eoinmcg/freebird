SF.Vamp = SF.Sprite.extend({


    init: function(o) {

        this._super(o);

        this.w = 8;
        this.h = 0;
        this.r = this.w / 2;
        this.yDir = 1;
        this.maxH = 0;
        this.speed = 3;

        this.name = 'vamp';
        this.respawn();
        this.checkCollision = true; },

    update: function() {

        this.x += this.vx;

        if (this.h > this.maxH || this.h < 0) {
            this.yDir = this.yDir * -1;
        }

        if (this.x < SF.W) {
            this.h = this.h + (this.yDir * this.speed);
        }



        if (this.x < (0 - this.w)) {
            this.respawn();
        }

    },

    render: function() {

        SF.Draw.rect(this.x, this.y, this.w, this.h, '#c20');
        SF.Draw.circle(this.x - 1, this.h - this.r, 4, '#c20');
        SF.Draw.circle(this.x - 2, 0, 12, 'darkgreen');
        SF.Draw.circle(this.x - this.w, 4, 4, 'white');
        SF.Draw.circle(this.x + this.r, 4, 4, 'white');
        SF.Draw.circle(this.x - 2, 0, 6, 'darkgreen');


    },

    respawn: function() {

        this._super();

        this.x = ~~(Math.random() * SF.W) + SF.W;
        this.y = 0;
        this.r = this.w / 2;
        this.q = this.r / 2;
        this.maxH = this.getMaxH();

        this.h = 32;

        this.vx = -3;
        this.vy = 0;
    },

    getMaxH: function() {

        return ~~(Math.random() * (SF.H / 2)) + 50;
    
    }



});

