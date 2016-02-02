// abstracts various canvas operations into
// standalone functions
SF.Draw = {

    clear: function() {
        SF.ctx.clearRect(0, 0, SF.W, SF.H);
    },


    rect: function(x, y, w, h, col) {
        SF.ctx.fillStyle = col;
        SF.ctx.fillRect(x, y, w, h);
    },


    roundRect: function(x, y, w, h, r, col, stroke) {

        if (stroke) {
            SF.ctx.strokeStyle = stroke;
            SF.ctx.lineWidth = 3;
        }


        SF.ctx.fillStyle = col;
        SF.ctx.beginPath();
        SF.ctx.moveTo(x+r, y);
        SF.ctx.arcTo(x+w, y,   x+w, y+h, r);
        SF.ctx.arcTo(x+w, y+h, x,   y+h, r);
        SF.ctx.arcTo(x,   y+h, x,   y,   r);
        SF.ctx.arcTo(x,   y,   x+w, y,   r);
        SF.ctx.closePath();

        if (stroke) {
            SF.ctx.stroke();
        }
        SF.ctx.fill();
    },

    circle: function(x, y, r, col, stroke) {

        if (stroke) {
            SF.ctx.strokeStyle = stroke;
            SF.ctx.lineWidth = 3;
        }
        
        SF.ctx.fillStyle = col;
        SF.ctx.beginPath();
        SF.ctx.arc(x + 5, y + 5, r, 0,  Math.PI * 2, true);
        SF.ctx.closePath();
        if (stroke) {
            SF.ctx.stroke();
        }
        SF.ctx.fill();
    },


    image: function(src, x, y) {
        SF.ctx.drawImage(src, x, y);
    },

    star: function(cx, cy, col) {
 
        var i = 0,
            spikes = 5,
            r0 = 5,
            r1 = 8,
            rot = Math.PI/2*3,x=cx,y=cy,step=Math.PI/spikes;

        SF.ctx.save();
        SF.ctx.beginPath();
        SF.ctx.moveTo(cx,cy-r0);

        for(i=0;i<spikes;i++){
            x=cx+Math.cos(rot)*r0;
            y=cy+Math.sin(rot)*r0;
            SF.ctx.lineTo(x,y);
            rot+=step;

            x=cx+Math.cos(rot)*r1;
            y=cy+Math.sin(rot)*r1;
            SF.ctx.lineTo(x,y);
            rot+=step;
        }

        SF.ctx.lineTo(cx,cy-r0);
        SF.ctx.fillStyle = col;
        SF.ctx.fill();
        SF.ctx.closePath();
        SF.ctx.restore();
   
    
    },



    triangle: function(x, y, size, col) {
    

        SF.ctx.save();
        SF.ctx.fillStyle = '#fff';
        SF.ctx.beginPath();
        SF.ctx.lineTo(x, y);
        SF.ctx.lineTo(x, y + size);
        SF.ctx.lineTo(x + size, y + ( size / 2 ));
        SF.ctx.fill();
        SF.ctx.closePath();
        SF.ctx.restore();
    
    },



    text: function(str, x, y, size, col, shadow) {


        SF.ctx.font = 'bold '+size+'px ' + SF.font;
        x = x || (SF.W / 2) - (SF.ctx.measureText(str).width / 2);

        if (shadow) {
            SF.ctx.fillStyle = shadow; 
            SF.ctx.fillText(str, x - 2, y + 2);
        }

        SF.ctx.fillStyle = col;
        SF.ctx.fillText(str, x, y);

    }



};

