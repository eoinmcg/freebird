SF_loader = SF.Game.extend({


    init: function(o) {
    
        var i, tmp;

        this._super(o);

        this.loaded = false;
        this.dir = 'a/';
        this.sfxType = (SF.ios) ? '.aif' :'.ogg';

        this.totalImgs = SF.data.imgs.length;
        this.totalSfx = SF.data.sfx.length;
        this.totalAssets = this.totalImgs + this.totalSfx;

        this.loadedImgs = 0;
        this.loadedSfx = 0;

        for (i = 0; i < this.totalImgs; i++) {
            this.loadImg(SF.data.imgs[i]);
        }
        for (i = 0; i < this.totalSfx; i++) {
            this.loadSfx(SF.data.sfx[i]);
        }

        document.getElementById('ad').style.display = 'none';

    },


    update: function() {

        if (this.loaded === this.totalAssets) {
            SF.loadCallback();
           SF.changeState('splash'); 
        }


    },


    render: function() {

        var percent = this.percentLoaded(),
            loadedWidth = (percent / 100) * SF.W;

        SF.Draw.clear();
        SF.Draw.rect(0, 0, SF.W, SF.H, '#000');

        SF.Draw.rect(0,SF.H / 2,loadedWidth, 20, 'green');

        SF.Draw.text(SF.tr('loading'), false, 250, 30, '#fff', '#000');
        SF.Draw.text(this.loaded+' / '+this.totalAssets, false, 270, 10, '#555', '#000');

    },

    loadImg: function(file) {

        file = this.dir + file;

        var img = new Image();
        var that = this;

        img.src = file;
        img.addEventListener('load', function() {
            that.loaded += 1;
        }, false);
        img.addEventListener('error', function() {
        }, false);
    },



    loadSfx: function(file){

        var name = file;
        file = this.dir+file+this.sfxType;

        var id = "SF_"+file;
        if (!SF.hasAudio) {
            this.loaded += 1;
            return;
        }


        // SF.sfx[name] = new Audio(file);
        // SF.sfx[name].load();
        // SF.sfx[name].volume = 0;
        // SF.sfx[name].play();
        // console.log(name);

        // this.loaded++;
        // return;

/// ------

        var sfx = document.createElement("audio");

        SF.sfx[name] = document.createElement('audio');

        SF.sfx[name].src = file;
        SF.sfx[name].setAttribute("id",id);


        SF.sfx[name].load();
        SF.sfx[name].volume = 0; 
        SF.sfx[name].play(); 
        SF.sfx[name].autobuffer="true";
        SF.sfx[name].preload="auto";
        document.body.appendChild(SF.sfx[name]);

        var that = this;

        SF.sfx[name].addEventListener("canplaythrough",function() {
            that.loaded += 1;
            this.removeEventListener("canplaythrough", arguments.callee, false);
            this.pause();
            this.currentTime = 0.01;
        }, false);

        SF.sfx[name].addEventListener("error", function() {
            alert("error loading: "+file);
            that.loaded += 1;
        },false);

    },

    percentLoaded: function() {
        return ~~( (this.loaded / 
                (this.totalImgs + this.totalSfx)) *100 );
    }



});


