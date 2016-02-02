SF.Text = SF.Sprite.extend({


    init: function(o) {
        this._super(o);

        this.name = 'text';

        this.max = o.max || 30;
        this.size = o.size || 5;
        this.col = o.col || '#000';
        this.speed = o.speed || 0.5;
        this.fade = o.fade || 0.02;
        this.opacity = 1;
        this.str = o.str;
        this.x = o.x ||  -SF.W;
        this.y = o.y || SF.H / 2;
        this.centerX = SF.W / 2;
        this.shadow = o.shadow || false;

        this.collides = false;
    },

    update: function() {

        if (this.size >= this.max) {
            this.size = this.max;
            this.opacity -= this.fade;
            this.y -= 0.5;
        } else {
            this.size += this.speed;
        }

        if (this.opacity < 0) {
            this.remove = true;
        }

        SF.ctx.font = 'bold '+this.size+'px ' + SF.font;
        this.x = this.centerX - ( SF.ctx.measureText(this.str).width / 2);


    },

    render: function() {


        SF.ctx.globalAlpha = this.opacity;
        if (this.shadow) {
            SF.Draw.text(this.str, this.x + 2, this.y + 2, 
                    this.size, this.shadow);
        }
        SF.Draw.text(this.str, this.x, this.y, this.size, this.col);
        SF.ctx.globalAlpha = 1;

    }


});
