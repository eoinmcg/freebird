SF.Button = SF.Sprite.extend({

    init: function(o) {
    
        this._super(o);

        this.type = 'button';

        this.text = o.text || '';
        this.bgcol = o.bgcol || false;
        this.col = o.col;
        this.shadow = o.shadow || false;
        this.fade = o.fade || false;
        this.size = o.size || 14;

        if (!this.x) {
            this.x = SF.W / 2 - (this.w / 2);
        }

        SF.ctx.font = 'bold '+this.size+'px ' + SF.font;
        this.textX = ( this.w / 2 ) -  (SF.ctx.measureText(this.text).width / 2) + this.x;

        this.textY = this.y + ( this.h / 2);

    },




    update: function() {
    
        var o = {};

        this.textCol = (this.fade) ?
            'rgba('+this.col+','+SF.fadeText+')'
            : this.col;

        if (SF.tapped) {
            o.x = SF.m.x;
            o.y = SF.m.y;
            o.w = 1;
            o.h = 1;

            if (this.collides(o)) {
                this.clicked();
            }
        }
    
    },


    clicked: function() {
        console.log('CLicked: ' + this.text);
    },


    render: function() {
    
        if (this.bgcol) {
            SF.Draw.rect(this.x, this.y, this.w, this.h, this.bgcol);
        }

        if (this.text) {
            SF.Draw.text(this.text, this.textX, this.textY, this.size, this.textCol, this.shadow);
        }


    }

});
