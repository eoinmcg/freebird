SF.Button_start = SF.Button.extend({

    clicked: function() {

        SF.changeState('play');
        this.remove = true;

    }

});


SF.Button_pause = SF.Button.extend({

    init: function(o) {
        this._super(o);
        this.type = 'gui';
        this.col = 'rgba(255,255,255,0.8)';
    },


    clicked: function() {

        if (!SF.pause) {
            SF.pause = true;
            this.col = 'rgba(255,255,255,1)';
            SF.entities.push(new SF.Button_continue({}));
            SF.entities.push(new SF.Button_audio({}));
            SF.entities.push(new SF.Button_quit({}));

        }

        SF.tapped = false;

    },

    render: function() {

        if (!SF.pause) {
            SF.Draw.rect(this.x + 5, this.y, 15, this.h, this.col);
            SF.Draw.rect(this.x + 25, this.y, 15, this.h, this.col);
        } else {
            SF.Draw.rect(0, 0, SF.W, SF.H, 'rgba(0,0,0,0.5)');
        }
   
    }

});

SF.Button_tweet = SF.Button.extend({

    clicked: function() {

        alert('Tweet');

    }

});

SF.Button_splash = SF.Button.extend({

    clicked: function() {

        SF.changeState('credits');
        this.remove = true;

    }

});


SF.Button_continue = SF.Button.extend({

    init: function(o) {
        this._super(o);
        this.type = 'gui';
        this.removeOnPause = true;
        this.col = 'green';
        this.x = 100;
        this.y = 140;

        this.img = new Image();
        this.img.src = 'a/gui.png';

        this.w = 260;
        this.h = 40;
        this.text = 'Continue';

    },


    clicked: function() {


        SF.pause = false;
        this.remove = true;

        var i;

        for (i = 0; i < SF.entities.length; i += 1) {
            if (SF.entities[i].removeOnPause) {
                SF.entities[i].remove = true;
            }
        }


    },

    render: function() {

        SF.Draw.roundRect(this.x, this.y, this.w, this.h, 5, this.col, '#000');
        SF.Draw.text(this.text, false, this.y + 25, 20, '#fff', '#000');
        SF.ctx.drawImage(this.img, 0, 0, 24, 24, this.x + 7, this.y + 7, 24, 24);
   
    }

});

SF.Button_audio = SF.Button.extend({

    init: function(o) {
        this._super(o);
        this.type = 'gui';
        this.removeOnPause = true;
        this.col = 'orange';
        this.x = 100;
        this.y = 190;

        this.w = 260;
        this.h = 40;
        this.text = 'Audio';

        this.img = new Image();
        this.img.src = 'a/gui.png';
    },


    clicked: function() {

        if (!SF.hasAudio) {
            return;
        }

        SF.mute = !SF.mute;
        SF.tapped = false;



    },

    render: function() {


        if (!SF.hasAudio) {
            return;
        }

        SF.Draw.roundRect(this.x, this.y, this.w, this.h, 5, this.col, '#000');
        SF.Draw.text(this.text, false, this.y + 25, 20, '#fff', '#000');
        SF.ctx.drawImage(this.img, 24, 0, 24, 24, this.x + 7, this.y + 7, 24, 24);

        if (SF.mute) {
            SF.Draw.rect (this.x + 20, this.y + (this.h / 3), this.w - 40, 5, '#c20');
        }
   
    }

});


SF.Button_more_games = SF.Button.extend({

    init: function(o) {
        this._super(o); 
        this.type = 'gui';
        this.col = '#040';
        this.y = 180;
        this.w = 200;
        this.h = 30;

        this.x = (SF.W - this.w) / 2;
 
        this.text = SF.tr('more_games');

    },

    clicked: function() {
        SF.tapped = false;
        // window.location = '/';
        SF.more_games_callback.call();
    },

    render: function() {

        SF.Draw.roundRect(this.x, this.y, this.w, this.h, 5, this.col, '#000');
        SF.Draw.text(this.text, false, this.y + 18, 14, '#fff', '#000');
        // SF.ctx.drawImage(this.img, 48, 0, 24, 24, this.x + 7, this.y + 7, 24, 24);
    }

});


SF.Button_quit = SF.Button.extend({

    init: function(o) {
        this._super(o);
        this.type = 'gui';
        this.removeOnPause = true;
        this.col = 'red';
        this.x = 100;

        // this.y = 240;
        this.y = (SF.hasAudio) ? 240 : 190;

        this.w = 260;
        this.h = 40;
        this.text = 'Quit';

        this.img = new Image();
        this.img.src = 'a/gui.png';

    },


    clicked: function() {

        var i;

        for (i = 0; i < SF.entities.length; i += 1) {
            if (SF.entities[i].removeOnPause) {
                SF.entities[i].remove = true;
            }
        }

        SF.pause = false;
        this.remove = true;
        SF.changeState('gameOver');



    },

    render: function() {

        SF.Draw.roundRect(this.x, this.y, this.w, this.h, 5, this.col, '#000');
        SF.Draw.text(this.text, false, this.y + 25, 20, '#fff', '#000');
        SF.ctx.drawImage(this.img, 48, 0, 24, 24, this.x + 7, this.y + 7, 24, 24);
    }

});

SF.Tap = SF.Sprite.extend({


    init: function(o) {
        this._super(o);
        this.w = 10;
        this.h = 10;
        this.name = 'tap';
        this.checkCollision = false;

        this.opacity = 1;
        this.decay = 0.05;

    },


    update: function() {
        this.opacity -= this.decay; 
        if (this.opacity < 0) {
            this.remove = true;
        }
    },

    render: function(){
        SF.Draw.circle(this.x, this.y, this.w / 2, 
            'rgba(200,0,0,'+this.opacity+')'); 
    }

});
