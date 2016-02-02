
SF.Input = {

    init: function() {

        // listen for clicks
        var c = document.getElementsByTagName('canvas')[0];

        window.addEventListener('keyup', function (e) {


            if (e.keyCode === 32) {
                    SF.tapped = true;
                    e.preventDefault();
                    return false;
            }

            if (e.keyCode === 192) {
                SF.screenshot = !SF.screenshot;
            }


        }, false);


        c.addEventListener('click', function(e) {


            SF.tapped = true;
            SF.m.x = (e.pageX - SF.offset.left) / SF.scale;
            SF.m.y = (e.pageY - SF.offset.top) / SF.scale;

            e.preventDefault();
            return false;


        }, false);

        // listen for touches
        c.addEventListener('touchstart', function(e) {

            // e.preventDefault();
            // the event object has an array
            // called touches, we just want
            // the first touch
            SF.tapped = true;
            var touch = e.touches[0];
            SF.m.x = (touch.pageX - SF.offset.left) / SF.scale;
            SF.m.y = (touch.pageY - SF.offset.top) / SF.scale;

            e.preventDefault();
            return false;


        }, false);

        c.addEventListener('touchmove', function(e) {
            e.preventDefault();
            return false;
        }, false);

        c.addEventListener('touchend', function(e) {
            e.preventDefault();
            return false;
        }, false);


    }

};
