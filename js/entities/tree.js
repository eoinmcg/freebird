SF.Tree = SF.Sprite.extend({


    init: function(o) {
        this._super(o);

        this.name = 'tree';
        this.respawn();
        this.checkCollision = true;
    },

    update: function() {

        this.x += this.vx;
        if (this.x < (0 - this.w)) {
            this.respawn();
        }

    },

    render: function() {
        // SF.Draw.rect(this.x, this.y, this.w, this.h, '#c20');
        SF.Draw.circle(this.x + this.r, ( this.y + this.r ) - 10, this.r, 'green', '#050');
        SF.Draw.circle(this.x + ( this.r / 2 ), ( this.y + this.r ) - 10, this.r / 3, 'rgba(0,0,0,0.08)');
        SF.Draw.rect(this.x + this.r, this.y + this.r, 10, this.r, 'brown', '#d20');

    },

    respawn: function() {

        this._super();

        this.w = ~~(Math.random() * 64 ) + 32;
        this.h = this.w;
        this.r = this.w / 2;
    
        this.x = ~~(Math.random() * SF.W) + SF.W;
        this.y = SF.H - this.h;

        this.vx = -3;
        this.vy = 0;
    }


});
