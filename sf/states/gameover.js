// BOOSTERMEDIA_LEVELCOMPLETE
SF_gameOver = SF.Game.extend({


    init: function(o) {

        this._super(o); 

        this.button = {
            x: 100, y: 180,
            w: SF.W - 200,
            h: 50,
            col: '#00aced',
            text: {
                str: 'Tweet Score',
                x: false,
                y: 210,
                size: 18,
                col: '#000'
            },
            pressed: function(x, y) {

                return x > this.x &&
                            x < this.x + this.w &&
                            y > this.y &&
                            y < this.y + this.h;

            }
        };

        this.tweet = new Image();
        this.tweet.src = 'a/t.png';

    },



    update: function() {
    
        this._super();
        console.log(SF.tapped);

        if (SF.tapped) {
            SF.changeState('splash');
        }

    },


    render: function() {


        SF.Draw.rect(0, 0, SF.W, SF.H, 'rgba(255,0,0,0.01)');
        SF.Draw.rect(0,50,SF.W, 70, '#900');
        SF.Draw.text('Game Over', false, 
                100, 44, 'rgba(255,255,255,'+SF.fadeText+')');

        if (SF.newHiScore) {
            SF.hiScore = SF.score;
            localStorage.hiScore = SF.hiScore; 
            SF.Draw.rect(0,120,SF.W, 50, '#600');
            SF.Draw.text('New HiScore!', false, 150, 20, '#fff');
        }

        if (SF.data.tweetScore) {
            this.tweetScore(); 
        }

        SF._t += 1;

    },


    tweetScore: function() {

        var b = this.button;
   
        if (SF.tapped && SF._t > 60) {
            if (b.pressed(SF.m.x, SF.m.y) === true) {

                window.location = "https://twitter.com/intent/tweet?&text=I+scored+" + 
                            SF.score + 
                            "+in+Freebird+-+http://arcade.starfish.ie/freebird";
               return; 
            } else {

                SF.score = 0;
                SF.newHiScore = false;
                SF.changeState('splash');
            
            }

        }


        SF.Draw.roundRect(b.x,b.y,b.w, b.h, 3, b.col, '#fff');
        SF.Draw.text(b.text.str, false, b.text.y, b.text.size, b.text.col);
        SF.ctx.drawImage(this.tweet, b.x + 10, b.y + 8);
    }

});
// 
