'use strict';
import {Field, ItemType} from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    win:'win',
    lose:'lose',
    cancel:'cancel',
});


export class GameBuilder{
    gameDuration(duration){
        this.gameDuration = duration;
        return this;
    }

    giftCount(num){
        this.giftCount = num;
        return this;
    }
    
    bombCount(num){
        this.bombCount = num;
        return this;
    }

    build(){
        return new Game(
            this.gameDuration,
            this.giftCount,
            this.bombCount
        )
    }
}


class Game {
    constructor(gameDuration, giftCount, bombCount){
        this.gameDuration = gameDuration;
        this.giftCount = giftCount;
        this.bombCount = bombCount;

        this.startBtn = document.querySelector('.start__button');
        this.startBtn.addEventListener('click',()=>{
            if(this.started){
                this.stop(Reason.cancel);
                sound.playAlert();
            } else{
                this.start();
            }
        });
        this.startSection = document.querySelector('.start');

        this.Timer = document.querySelector('.game__timer');
        this.TimerTime= document.querySelector('.game__timer__time');
        this.Score = document.querySelector('.game__score__count');
        this.ScoreCount = document.querySelector('.game__score__count');

        this.StopBtn = document.querySelector('.game__button');
        this.StopBtn.addEventListener('click',()=>{
            this.stop(Reason.cancel);
        });


        this.field = new Field(this.giftCount, this.bombCount);
        this.field.setItemClickListener(item=>this.onItemClick(item));


        this.score=0;
        this.started=false;
        this.timer= undefined;
    }

    setGameStopListener(onGameStop){
        this.onGameStop = onGameStop;
    }

    start(){
        this.started=true;
        this.initGame();
        this.startTimer();
        sound.playBackgound();
    }
    
    stop(reason){
        this.started=false;
        this.hideGameBtn();
        this.stopTimer();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(reason);
    }
    
    initGame(){
        this.startSection.style.visibility='hidden';
        this.StopBtn.style.visibility='visible';
        this.score=0;
        this.field.init();
    }

    onItemClick=(item)=>{
        if(!this.started){
            return;
        }
        if(item===ItemType.gift){
            this.score++;
            this.updateScoreBoard(this.score);

            if(this.score===this.giftCount){
                this.stop(Reason.win);
            }
        } else {
            this.stop(Reason.lose);
        }
    }

    hideGameBtn(){
        this.StopBtn.style.visibility='hidden';
    }   
    
    
    startTimer(){
        let remainingTimeSec = this.gameDuration;
        this.updateTimeSec(remainingTimeSec);
        this.timer = setInterval(()=>{
            if(remainingTimeSec<=0){
                clearInterval(this.timer);
                this.stop(this.score===this.giftCount);
                return;
            }
            this.updateTimeSec(--remainingTimeSec);
            },1000);
    }
    
    stopTimer(){
        clearInterval(this.timer);
    }
    
    updateTimeSec(time){
        const minutes = Math.floor(time/60);
        const seconds = time%60;
        this.TimerTime.innerHTML=`${minutes}: ${seconds<10?`0${seconds}`:seconds}`   ;
    }
    
    updateScoreBoard(totalScore){
        this.ScoreCount.innerHTML=this.giftCount-totalScore;
    }
    
}