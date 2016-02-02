SF_intro = SF.Game.extend({


    init: function(o) {
        this._super(o); 
        document.getElementById('ad').style.display = 'none';
    },

    update: function() {
    },

    render: function() {

        SF._t = (SF._t) || 1;
        SF._d = (SF._d) || -1;
        SF._r = (SF._r) || 0.01;
        SF._t += SF._r * SF._d;

        if (SF._t <= 0.01) {
            SF._d *= -1;
            SF._r = 0.01;
        } 

        SF.Draw.rect(0, 0, SF.W, SF.H, '#333');
        SF.Draw.text('Starfish Arcade', false, 100, 34, 'green');
        SF.Draw.text('presents...', false,  150, 24, 'green');
        SF.Draw.rect(0, 0, SF.W, SF.H, 'rgba(0,0,0,'+SF._t+')');

        if (SF._t >= 1 || SF.tapped) {
            SF.Draw.clear();
            // SF.reset();
            SF.changeState('splash');
        }


    }

});

SF.intro = function() {



};
