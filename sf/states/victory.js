// BOOSTERMEDIA_GAMECOMPLETE
SF_victory = SF.Game.extend({


    init: function(o) {
    
        this._super(o);

        this.fireworks = [
            'tomato',
            'lightblue',
            'yellow',
            'orange',
            'lightgreen',
            'greenyellow',
            'plum',
            'white'
        ];


        this.timer = 0;
        this.setTimer();

        this.bird = new Image();
        this.bird.src = 'b.png';


    },

    update: function() {

        if (SF.tapped && SF._t > 60) {
            SF.hiScore = SF.score;
            localStorage.hiScore = SF.hiScore; 
            SF.score = 0;
            SF.newHiScore = false;
            SF.changeState('splash');
        }

        this.timer -= 1;
        this._super();    


        if (this.timer <= 0) {
            this.setTimer();
        }

    },

    render: function() {
    

        SF.Draw.rect(0, 0, SF.W, SF.H, '#333');
        SF.Draw.text('Victory', false, 100, 44, 'rgba(255,0,255,'+SF.fadeText+')');
        SF.Draw.text('You Win!', false, 150, 30, '#f0f');

        this._super();

        try {
            SF.ctx.drawImage(
                this.bird,
                128,0,
                32,32,
                100,SF.H - 32,32,32
            );
        } catch(e) { } 
    },

    setTimer: function() {

        var col = ~~(Math.random() * this.fireworks.length);

        this.timer = (Math.random() * 5);
        SF.entities.push(new SF.Particle(
            SF.W / 2,
            // SF. H / 2,
            -10,
            3, 
            this.fireworks[col],
            'star'
        )); 

    }

});

