
SF_tutorial = SF.Game.extend({

    init: function(o) {
   
        this._super(o);
        this.level = SF.levels[1];


        this.bird = new Image();
        this.bird.src = 'a/b2.png';

        this.coin = new SF.Coin({});
        this.coin.x = 200;
        this.coin.y = SF.H - 140;

        this.baddie = new SF.Fly({});
        this.baddie.x = 300;
        this.baddie.y = SF.H - 140;
        document.getElementById('ad').style.display = 'none';

    },


    update: function() {

        SF._t -= 0.02; 

        if (SF.tapped || SF._t < -8 || SF.plays >= 2) {
            SF.changeState('play');
            SF.tapped = false;
        }

        this._super();


    },

    render: function() {
    
        SF.Draw.clear();
        SF.Draw.rect(0, 0, SF.W, SF.H, SF.gradients.day);
        SF.Bg.hills('#001000');

        if (SF._t < -0.5) {
            this.step_1.apply(this);
        } else {
            SF.ctx.drawImage(
                this.bird,
                128,0,
                32,32,
                130,SF.H - 32,32,32
            );
        }


        if (SF._t < -2) {
            this.step_2.apply(this);
        }

        if (SF._t < -4) {
            this.step_3.apply(this);
        }

        if (SF._t < -6) {
            this.step_4.apply(this);
        }

        SF.Draw.text('How To Play', false, 40, 22, '#f0f');
        SF.Draw.text('SKIP >', 410, SF.H - 20, 12, 
            'rgba(255,255,255,1)');


        this._super();


    },


    step_1: function() {
    
        SF.Draw.text('1. ' + SF.action + ' screen to Fly', false, 70, 18, 
                '#000', 'rgba(255,255,255,0.4)');


        try {
            SF.ctx.drawImage(
                this.bird,
                0,0,
                32,32,
                130,SF.H - 128,32,32
            );
        } catch(e) { }
    },


    step_2: function() {
    
        SF.Draw.text('2. Eat to keep your strength up', false, 100, 18, 
                '#000', 'rgba(255,255,255,0.4)');

        this.coin.render(); 

    },


    step_3: function() {
    
        SF.Draw.text('3. Avoid the baddies', false, 130, 18, 
                '#000', 'rgba(255,255,255,0.4)');
    
        this.baddie.render();

    },


    step_4: function() {
    
        SF.Draw.text('4. Fly 13km to freedom!', false, 160, 18, 
                '#000', 'rgba(255,255,255,0.4)');
    
        this.baddie.render();

    }
});
