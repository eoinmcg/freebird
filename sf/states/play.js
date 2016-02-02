// this is where all entities will be moved
// and checked for collisions etcjs/states/play.js

SF_play = SF.Game.extend({


    init: function(o) {
    
        this._super(o);
        SF.entities = [];
        SF.entities.push(new SF.Bird({ }));
        SF.entities.push(new SF.Button_pause({ w: 50, h: 30, x: SF.W - 60, y: 20,  text: '', size: 30}));
        // SF.entities.push(new SF.Button_mute({ w: 50, h: 30, x: SF.W - 120, y: 20,  text: '', size: 30}));


        SF.p1 = SF.entities[0];
        SF.p1.health = 100;
        SF.speed = 0;
        SF.levelTimer = 0;

        SF.plays += 1;
        document.getElementById('ad').style.display = 'none';
        document.getElementById('adLarge').style.display = 'none';
        SF.preventDefault = false;
        // track waves of coins with unique id as array k,
        // val is num of coins in wave
        SF.coins = {};

        if (SF.plays < 2) {
             SF.entities.push(new SF.Text({
                str: SF.tr(( SF.action + '_to_fly' ).toLowerCase()),
                col: '#fff',
                max: 16,
                size: 16,
                fade: 0.001
                // x: this.x + 200,
                // y: this.y
                }));
        }
       

    },


    update: function() {

        window.scrollTo(0,1);

        var levelUp = ((SF.levelTimer % 1024) === 0) ? true : false,
            i, n;

        if (SF.screenshot) {
            return;
        }


        if (SF.pause === true) {
            for (i = 0; i < SF.entities.length; i += 1) {
                if (SF.entities[i].type === 'gui') {
                    SF.entities[i].update(); 
                }
            }
            return;
        }


        this._super();

        SF.score += 1;
        SF.levelTimer += 2;
        // SF.p1.health -= 0.02;
        if (SF.p1.health > 100) {
            SF.p1.health = 100;
        } 


        if (SF.score > SF.hiScore && SF.newHiScore === false) {
            SF.newHiScore = true;
            SF.sfx('tweet');
            for (n = 0; n < 30; n +=1 ) {
                SF.entities.push(new SF.Particle(
                    SF.W / 2, 
                    ( SF.H / 2 ) - 100,
                    10, 
                    'rgba(255,0,255,1)',
                    'star'
                )); 
            }

            SF.entities.push(new SF.Text({
                str: 'New Hi Score',
                col: '#f0f',
                max: 30,
                size: 30,
                fade: 0.007
                }));

        }

        if (SF.levelTimer > 13312) {
            SF.changeState('victory');
        }

        if (levelUp) {
            SF.level += 1;
            this.levelUp();
        }

        if (SF.p1.dead) {
            SF.sfx('die');
            SF.changeState('gameOver');
        }

    },


    render: function() {

        var i, 
            health = (SF.p1.health > 100) ? 100 : SF.p1.health,
            level = SF.levels[SF.level] || SF.levels[1],
            bg_grad = level.bg.grad || 'day',
            bg_col = level.bg.col,
            bg_type = level.bg.type;

        SF.Draw.clear();
        SF.Draw.rect(0, 0, SF.W, SF.H, SF.gradients[bg_grad]);
        SF.Bg[bg_type](bg_col);

        this._super();

        // display scores
        SF.Draw.rect(19,49,102, 18, '#000');
        SF.Draw.rect(20,50,health, 16, '#c20');
        SF.Draw.rect(20,58,health, 8, 'rgba(255,255,255,0.2)');

        SF.Draw.text(~~(SF.score), 20, 30, 14, '#fff');

        if (SF.debug) {

            SF.Draw.text('FPS ' + SF.fps,
                    350, 15, 12, '#fff');
            SF.Draw.text('Entities ' + SF.entities.length,
                    350, 30, 12, '#fff');
        }

        if (SF.pause === true) {
            SF.Draw.text('PAUSED', 
                    false, 110, 40, 
                    'rgba(255,255,255,1)',
                    'rgba(0,0,0,1)');
        }
        

    },


    levelUp: function() {
   
         var n, i, levData;
       
        levData = SF.levels[SF.level];
        if (typeof levData === 'undefined') {
            levData = SF.levData[1];
        }

        for (i = 0; i < SF.entities.length; i +=1) {
            if (typeof SF.entities[i].respawn === 'function') {
                SF.entities[i].killOnRespawn = true;
            }
        }

        for (n in levData.entities) {
            if (levData.entities.hasOwnProperty(n)) {
                for (i = 0; i < levData.entities[n]; i += 1) {
                    try {
                        SF.entities.push(new SF[n]({}));
                    } catch (e) {
                        // console.log(n, e);
                    }
                }
            }
        }

    }


});

