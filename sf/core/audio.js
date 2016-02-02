SF.audio = document.querySelector('audio');
SF.audiosprite = {
    'coin': [ 0, 0.3 ],
    'bonus': [ 1, 1.3 ],
    'hurt': [ 2, 2.4 ],
    'die': [ 3, 3.4 ],
    'powerup': [ 4, 4.7 ],
    'tweet': [5, 5.8 ]
};
SF.audioEnd = 0;
 
SF.audio.addEventListener('timeupdate', function(ev) {
  if (SF.audio.currentTime > SF.audioEnd) {
    SF.audio.pause();
  }
},false);
 
SF.sfx = function(sound) {
  if ( SF.hasAudio && !SF.mute && SF.audiosprite[sound] ) {
    SF.audio.currentTime = SF.audiosprite[sound][0];
    SF.audioEnd = SF.audiosprite[sound][1];
    SF.audio.play();
  }
};

