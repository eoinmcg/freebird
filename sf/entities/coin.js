SF.Coin = SF.Sprite.extend({


    init: function(o) {
        this._super(o);

        this.w = 16;
        this.h = 16;
        this.name = 'coinWave';
        this.checkCollision = false;
        this.waveId = null;

        this.respawn();

    },

    update: function() {

        this.x += this.vx;
        if (this.x < (0 - this.w)) {
            this.respawn();
        }

    },

    render: function() { },

    respawn: function() {
    
        var i, 
            x,
            num_coins = 5;

        this._super();

        this.waveId = ~~(SF.time); 
        SF.coins[this.waveId] = num_coins;
        this.x = ~~(Math.random() * SF.W) + SF.W;
        this.y = ~~(Math.random() * ( SF.H - (this.h * 3) )) + this.h;

        for (i = 0; i < num_coins; i += 1) {
            x = this.x + (i * this.w ) + (i * 8);
            SF.entities.push(new SF.CoinCollect({
                        waveId: this.waveId,
                        x: x, 
                        y: this.y}));
        }

        this.vx = -3;
        this.vy = 0;
    }


});



SF.CoinCollect = SF.Sprite.extend({


    init: function(o) {

        this._super(o);

        this.waveId = o.waveId;

        this.w = 16;
        this.h = 16;
        this.name = 'coin';
        this.checkCollision = true;
        this.strength = 0;

        this.vx = -3;

        this.sparkle = 0;


    },

    update: function() {

        this.sparkle = SF.fadeText / 4;

        this.x += this.vx;
        if (this.x < (0 - this.w)) {
            this.remove = true;
        }

    },

    render: function() {
        SF.Draw.circle(this.x, this.y, this.w / 2, '#ffd700', 'brown');
        SF.Draw.circle(this.x, this.y, this.w / 2, 
            'rgba(255,255,255,'+this.sparkle+')');
    },


    hit: function() {

        var n;

        SF.entities.push(new SF.CoinRemove({
            x: this.x, y: this.y 
        }));
        SF.sfx('coin');
        SF.score += 10;
        SF.coins[this.waveId] -= 1;
        if (SF.coins[this.waveId] <= 0) {
            SF.sfx('bonus');
            SF.score += 100;
            for (n = 0; n < 3; n +=1 ) {
                SF.entities.push(new SF.Particle(
                    this.x, 
                    this.y, 
                    3, 
                    // random opacity to spice it up a bit
                    'yellow',
                    'star'
                )); 
            }
            SF.p1.health += 5;
            SF.entities.push(new SF.Text({
                str: '+100',
                col: '#c4a000',
                max: 10,
                size: 20,
                y: this.y,
                fade: 0.01
                }));
        }

        this.remove = true;

    }

});



SF.CoinRemove = SF.Sprite.extend({


    init: function(o) {

        this._super(o);


        this.w = 16;
        this.h = 16;
        this.name = 'coinRemove';
        this.checkCollision = false;

        this.vx = -5;
        this.vy = -5;

        this.opacity = 1;


    },

    update: function() {

        this.x += this.vx;
        this.y += this.vy;
        if (this.x < (0 - this.w)) {
            this.remove = true;
        }

    },

    render: function() {
        SF.Draw.circle(this.x, this.y, this.w / 2, 
            'rgba(255,200,0,0.9)');
    }



});
