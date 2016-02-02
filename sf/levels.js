SF.levels = [];

SF.levels[1] = {
    bg: {
        grad: 'day',
        type: 'hills',
        col: '#002000'
    },
    entities: {
        Coin: 1,
        Tree: 3
    }
};


SF.levels[2] = {
    bg: {
        grad: 'day',
        type: 'hills',
        col: '#003000'
    },
    entities: {
        Coin: 1,
        Tree: 3,
        Fly: 2
    }
};

SF.levels[3] = {
    bg: {
        grad: 'day',
        type: 'hills',
        col: '#004000'
    },
    entities: {
        Coin: 1,
        Tree: 2,
        Fly: 2,
        Hornet: 2,
        Powerup: 1
    }
};

SF.levels[4] = {
    bg: {
        grad: 'dusk',
        type: 'hills',
        col: '#001000'
    },
    entities: {
        Coin: 2,
        Tree: 2,
        Hornet: 2,
        Mozzie: 1
    }
};

SF.levels[5] = {
    bg: {
        grad: 'dusk',
        type: 'hills',
        col: '#001000'
    },
    entities: {
        Coin: 2,
        Hornet: 2,
        Tree: 2,
        Mozzie: 1,
        Powerup: 1

    }
};

SF.levels[6] = {
    bg: {
        grad: 'night',
        type: 'stars',
        col: '#fff'
    },
    entities: {
        Coin: 2,
        Tree: 2,
        Hornet: 2,
        Snapper: 2
    }
};

SF.levels[7] = {
    bg: {
        grad: 'night',
        type: 'stars',
        col: '#fff'
    },
    entities: {
        Coin: 2,
        Tree: 2,
        Mozzie: 2,
        Vamp: 1,
        Powerup: 1
    }
};
SF.levels[8] = {
    bg: {
        grad: 'dawn',
        type: 'city',
        col: '#222'
    },
    entities: {
        Coin: 2,
        Snapper: 1,
        Vamp: 1,
        Mozzie: 1
    }
};
SF.levels[9] = {
    bg: {
        grad: 'day',
        type: 'city',
        col: '#444'
    },
    entities: {
        Coin: 2,
        Tree: 2,
        Hornet: 4,
        Powerup: 1
    }
};
SF.levels[10] = {
    bg: {
        grad: 'day',
        type: 'city',
        col: '#444'
    },
    entities: {
        Coin: 2,
        Tree: 1,
        Vamp: 1,
        Mozzie: 1,
        Hornet: 2
    }
};
SF.levels[11] = {
    bg: {
        grad: 'dusk',
        type: 'city',
        col: '#444'
    },
    entities: {
        Coin: 2,
        Hornet: 4,
        Vamp: 2
    }
};
SF.levels[12] = {
    bg: {
        grad: 'night',
        type: 'stars',
        col: '#fff'
    },
    entities: {
        Coin: 3,
        Tree: 4,
        Hornet: 4,
        Snapper: 2
    }
};
SF.levels[13] = {
    bg: {
        grad: 'dawn',
        type: 'rainbow',
        col: '#444'
    },
    entities: {
        Coin: 3,
        Tree: 1,
        Fly: 1,
        Hornet: 1,
        Mozzie: 1,
        Snapper: 1,
        Vamp: 1,
        Powerup: 1
    }

};


SF.Bg = {

    hills: function(col) {
        SF.Draw.circle(0,SF.H+30,100,col);
        SF.Draw.circle(160,SF.H+30,120,col);
        SF.Draw.circle(300,SF.H+30,90,col);
        SF.Draw.circle(420,SF.H+30,140,col);
    }, 


    hills2: function(col) {
    
    },


    stars: function() {
   
        SF.Draw.circle(100,100,1,'#fff');
        SF.Draw.circle(150,30,1,'#fff');
        SF.Draw.circle(220,60,1,'#fff');
        SF.Draw.circle(300,50,1,'#fff');
        SF.Draw.circle(430,70,30,'#fff');
        SF.Draw.circle(415,70,30,'#012');

    },

    city: function(col) {
    
        SF.Draw.rect(0,SF.H - 30, SF.W, 100,col);
        SF.Draw.rect(30,SF.H - 100, 30, 100,col);
        SF.Draw.rect(70,SF.H - 140, 50, 140,col);
        SF.Draw.rect(90,SF.H - 50, 90, 140,col);
        SF.Draw.rect(160,SF.H - 140, 40, 140,col);
        SF.Draw.rect(160,SF.H - 80, 100, 100,col);
        SF.Draw.rect(220,SF.H - 130, 20, 140,col);
        SF.Draw.rect(300,SF.H - 170, 40, 140,col);
        SF.Draw.rect(350,SF.H - 120, 60, 100,col);
        SF.Draw.rect(410,SF.H - 140, 40, 140,col);


    }


};
