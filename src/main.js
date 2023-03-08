'use strict';

import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
    .gameDuration(5)
    .giftCount(3)
    .bombCount(3)
    .build()

gameFinishBanner.setClickListener(()=>{
    game.start();
});

game.setGameStopListener((reason)=>{
    let message;
    let santaImgPath;
    switch(reason){
        case Reason.cancel:
            message = 'Replay?';
            santaImgPath = 'img/santa_run.png';
            sound.playAlert();
            break;
        case Reason.win:
            message = 'YOU WIN!';
            santaImgPath = 'img/santa_win.png'; 
            sound.playWin();
            break;
        case Reason.lose:
            message = 'YOU LOST';
            santaImgPath = 'img/santa_run.png';
            sound.playBug();
            break;
        default:
            throw new Error('not vaild reason');
    }
    gameFinishBanner.showWithText(message);
    gameFinishBanner.popUpInputImg(santaImgPath);
});








