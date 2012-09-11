SF_splash = SF.Game.extend({

    init: function(o) {
   
        this._super(o);
        this.level = SF.levels[1];


        this.bird = new Image();
        this.bird.src = 'b.png';
    },


    update: function() {

        SF._t -= 0.02; 

        if (SF.tapped) {
            SF.changeState('tutorial');
            SF.tapped = false;
        }

        this._super();

    },

    render: function() {
    
        SF.Draw.clear();
        SF.Draw.rect(0, 0, SF.W, SF.H, SF.gradients.day);
        SF.Bg.hills('#001000');

        SF.Draw.text('Freebird', false, 100, 44, '#fff', '#000');
        SF.Draw.text('13k to freedom!', false, 130, 20, '#fff', 
                'rgba(0,0,0,0.5)');

        SF.Draw.text(SF.action + ' to Start', false, 180, 14, 
                'rgba(255,0,255,'+SF.fadeText+')');

        try {
            SF.ctx.drawImage(
                this.bird,
                128,0,
                32,32,
                130,SF.H - 32,32,32
            );
        } catch(e) { }


        SF.Draw.text('HiScore:  ' + SF.hiScore, false, 30, 14, 
            'rgba(255,255,255,1)');

        SF.Draw.text('by @eoinmcg', 390, SF.H - 20, 10, 
            'rgba(255,255,255,1)');

        this._super();


    }

});

