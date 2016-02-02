// BOOSTERMEDIA_MAINMENU
SF_splash = SF.Game.extend({

    init: function(o) {
   
        var i;

        this._super(o);
        this.level = SF.levels[1];

        this.num_clouds = 4;

        for (i = 0; i < this.num_clouds; i += 1) {
            SF.entities.push(new SF.Cloud({}));
        }

        SF.ctx.font = 'bold 48px ' + SF.font;
        this.logoWidth = SF.ctx.measureText('Freebird').width;

        this.wing = new Image();
        this.wing.src = 'a/wing.png';

        this.animTimer = 0;
        this.animOffset = 0;

        // SF.entities.push(new SF.Button_more_games({}));

    },


    update: function() {

        SF._t -= 0.02; 

        if (SF.screenshot) {
            return;
        }



        this._super();
        if (SF.tapped) {
            SF.score = 0;
            SF.changeState('play');
            SF.tapped = false;
        }

        this.animTimer += 1;

        if (this.animTimer % 5 === 0) {
            this.animOffset += 25;
        }

        if (this.animTimer > 20) {
            this.animTimer = 0;
        }

        if (this.animOffset > 75) {
            this.animOffset = 0;
        }


    },

    render: function() {

        if (SF.screenshot) {
            return;
        }

        var time = new Date().getTime() * 0.02,
            y = Math.cos(time * 0.09) * 8 + 100,
            phrase = (SF.action+'_to_start').toLowerCase();

        SF.Draw.clear();
        SF.Draw.rect(0, 0, SF.W, SF.H, SF.gradients.day);

        this._super();
        console.log('ok');


        SF.ctx.drawImage(this.wing, this.animOffset, 0, 25, 25, 
                (SF.W / 2) - (this.logoWidth / 2) - 20,
                y - 30, 25, 25
            );
        SF.ctx.drawImage(this.wing, this.animOffset, 25, 25, 25, 
                (SF.W / 2) + (this.logoWidth / 2) - 5,
                y - 30, 25, 25
            );
        SF.Draw.text(SF.tr('freebird'), false, y, 48, '#edd400', '#000');

        SF.Draw.text(SF.tr(phrase), false, 140, 14, 
                'rgba(255,0,255,'+SF.fadeText+')');

        SF.Draw.text(SF.tr('hiscore')+':  ' + SF.hiScore, false, 30, 14, 
            'rgba(0,0,0,1)');

        // SF.Draw.text('by @eoinmcg', 380, SF.H - 20, 10, 
            // '#000');



    }

});

