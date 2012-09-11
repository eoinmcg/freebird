SF.Button_start = SF.Button.extend({

    clicked: function() {

        SF.changeState('play');
        this.remove = true;

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
