SF.Snapper = SF.Sprite.extend({


    init: function(o) {
        this._super(o);

        this.name = 'snapper';
        this.maxH = 0;
        this.yDir = -1;
        this.respawn();
        this.strength = -5;
        this.checkCollision = true;

    },

    update: function() {

        this.x += this.vx;

        if (this.y < this.maxH || this.y > SF.H) {
            this.yDir = this.yDir * -1;
        }


        if (this.x < (0 - this.w)) {
            this.respawn();
        }

        this.y = this.y + (this.yDir * this.vx);

    },

    render: function() {

        SF.Draw.rect(this.x + this.r, this.y + this.r, 5, 
            SF.H - this.y, 'purple');
        SF.Draw.circle(this.x + this.r, this.y + this.r + this.q,
            this.r, 'purple', '#000');

        SF.Draw.circle(this.x + this.q, this.y + this.r + 4, 
            this.q / 2, '#fff');
        SF.Draw.circle(this.x + this.q + this.r, this.y + this.r + 4, 
            this.q / 2, '#fff');
        SF.Draw.circle(this.x + this.r, this.y + this.r + 2, 
            this.q, 'purple');

    },

    respawn: function() {

        this._super();

        this.w = ~~(Math.random() * 32 ) + 32;
        this.h = this.w;
        this.r = this.w / 2;
        this.q = this.r / 2;
        this.maxH = this.getMaxH();


        this.x = ~~(Math.random() * SF.W) + SF.W;
        this.y = SF.H - this.h;

        this.vx = -3;
        this.vy = 0;
    },


    getMaxH: function() {

        return ~~(Math.random() * (SF.H / 2)) + 50;
    
    }


});
