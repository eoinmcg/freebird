SF.Sprite = Class.extend({

    init: function(o) {

        this.x = o.x;
        this.y = o.y;
        this.w = o.w;
        this.h = o.h;
        this.vx = o.vx;
        this.vy = o.vy;

        this.xOff = o.xOff || 0;
        this.yOff = o.yOff || 0;

        this.anims = [];
        this.remove = false;
        this.killOnRespawn = false;
        this.checkCollision = false;
        this.strength = -1;

        this.r = this.w / 2;
        this.q = this.r / 2;

    },


    update: function() {

        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 0.99;
        if (this.vy) {
            this.vy *= 0.99;
            this.vy += 0.04;
        }
   
    },

    render: function() {
    
        if (this.img.src) {

            this.animate();

            try {
                SF.ctx.drawImage(
                    this.img,
                    this.xOff,this.yOff,
                    this.w,this.h,
                    ~~(this.x),~~(this.y),this.w,this.h
                );


            } catch(e) {
                console.log(e);
            }

        }
        else {
           SF.Draw.rect(this.x, this.y, this.w, this.h, this.col); 
        }
    
    },

    animate: function() {

        if (SF.pause) {
            return;
        }


        if (( SF.tick % this.anims[this.anim].frameSpeed ) === 0) {
                this.anims[this.anim].currentFrame +=1;
        }


        if (this.anims[this.anim].currentFrame > this.anims[this.anim].frames) {
            this.anims[this.anim].currentFrame = 0;
            if (this.anims[this.anim].nextAnim) {
                this.changeAnim(this.anims[this.anim].nextAnim);
            }
        }


        this.xOff = this.anims[this.anim].xOff + 
                    (this.anims[this.anim].currentFrame * this.w);

    },


    changeAnim: function(anim) {
    
        this.anim = anim; 
        this.anims[this.anim].currentFrame = 0;
    },


    collides: function(o) {

        // this sprite's rectangle
        this.left = this.x;
        this.right = this.x + this.w;
        this.top = this.y;
        this.bottom = this.y + this.h;

        // o sprite's rectangle
        o.left = o.x;
        o.right = o.x + o.w;
        o.top = o.y;
        o.bottom = o.y + o.h;

        // determine if not intersecting
        if (this.bottom < o.top) {
            return false; 
        }
        if (this.top > o.bottom) {
            return false; 
        } 

        if (this.right < o.left) {
            return false; 
        }
        if (this.left > o.right) {
            return false; 
        }

        // otherwise, it's a hit
        return true;

    },

    respawn: function() {
    
        if (this.killOnRespawn) {
            this.remove = true;
            return;
        }
    },


    // called when entity gets hit
    hit: function(type, name) {
    
    
    }



});
