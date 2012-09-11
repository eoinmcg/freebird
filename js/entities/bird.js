SF.Bird = SF.Sprite.extend({

    init: function(o) {

        this._super(o); 

        this.img = new Image();
        this.img.src = 'b.png';
        this.col = o.col || 'green';

        this.x = 150 || o.x;
        this.y = SF.H - 40;
        this.w = 32;
        this.h = 32;
        this.vx = 0;
        this.vy = -1;

        this.anims.flap = new SF.Anim(
            {xOff: 0, yOff: 0, frames: 2, frameSpeed: 3,
            nextAnim: 'glide'});
        this.anims.glide = new SF.Anim(
            {xOff: 0, yOff: 0, frames: 0, frameSpeed: 3});
        this.anims.run = new SF.Anim(
            {xOff: 96, yOff: 0, frames: 1, frameSpeed: 7});
        this.anims.stand = new SF.Anim(
            {xOff: 128, yOff: 0, frames: 0});
        this.anims.hurt = new SF.Anim(
            {xOff: 192, yOff: 0, frames: 0, nextAnim: 'glide'});
        this.anims.dead = new SF.Anim(
            {xOff: 160, yOff: 0, frames: 0});

        this.anim = 'glide';
        this.name = 'bird';
        this.health = 100;

        this.r = this.w / 2;
        this.invincible = false;

        this.counter = 0;

    },

    update: function() {

        if (SF.tapped && this.health > 0) {
            this.vy += -1.7;
            this.changeAnim('flap');
        }

        this._super();

        if (this.health <= 0) {
            this.health = 0;
            this.changeAnim('dead');
        }
        else if (this.y >= SF.H - this.h) {
            this.y = SF.H - this.h;
            this.vy = 0;
            this.changeAnim('run');
        } else if (this.y <= 0 && this.health > 0) {
            this.y = 0;
            this.vy = (this.vy / 2) * -1;
        } 

        if (this.counter > 0) {
            this.counter -= 0.3; 
        }

        if (this.counter <= 0) {
            this.invincible = false;
        }

        if (this.health <= 0 && this.y >= ( SF.H - this.h )) {
            this.dead = true;
        }

    },



    render: function() {
    

        var opacity;

        this._super();
        if (this.invincible) {
            opacity = this.counter / 100;
            SF.Draw.circle(this.x + this.r + 2, 
                this.y + this.r, 
                this.w / 2, 
                'rgba(255,0,255,0.3)', 
                'rgba(85,0,85, '+ opacity  +')');
        }

    },

    hit: function(damage, name) {
    
        if (damage < 0) {
            if (this.invincible === false && this.health > 0) {
                this.health += damage;
                this.changeAnim('hurt'); 
                SF.entities.push(new SF.Particle(
                    this.x, 
                    this.y, 
                    2, 
                    this.col 
                )); 

            }
        } else {
            this.health += damage;
        }

        if (name === 'powerup') {
            this.counter = 100;
            this.invincible = true; 
        }

    }

});
