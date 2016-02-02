SF.data = {
    title: 'Freebird',
    desc: 'Fly the birdie to freedom',
    ads: true,
    tweetScore: false,
    imgs: ['b2.png', 't.png', 'wing.png', 'gui.png'],
    sfx: []
};

SF.speed = 0;

SF.loadCallback = function() {

    var grad;

    SF.gradients = {};
    grad = SF.ctx.createLinearGradient(0,0,0,SF.H);
        grad.addColorStop(0, '#036');
        grad.addColorStop(0.5, '#69a');
        grad.addColorStop(1, 'yellow');
        SF.gradients.dawn = grad;

    grad = SF.ctx.createLinearGradient(0,0,0,SF.H);
        grad.addColorStop(0, '#69a');
        grad.addColorStop(0.5, '#9cd');
        grad.addColorStop(1, '#fff');
        SF.gradients.day = grad;

    grad = SF.ctx.createLinearGradient(0,0,0,SF.H);
        grad.addColorStop(0, '#036');
        grad.addColorStop(0.3, '#69a');
        grad.addColorStop(1, 'pink');
        SF.gradients.dusk = grad;

    grad = SF.ctx.createLinearGradient(0,0,0,SF.H);
        grad.addColorStop(0, '#036');
        grad.addColorStop(1, 'black');
        SF.gradients.night = grad;

};



