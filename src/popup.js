'use strict';

export default class PopUp{
    constructor(){
        this.popUp= document.querySelector('.pop-up');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpImg = document.querySelector('.pop-up__image');

        this.popUpRefresh.addEventListener('click',()=>{
            this.onClick && this.onClick();
            this.hide();

        });
    }

    setClickListener(onClick){
        this.onClick = onClick;
    }

    hide(){
        this.popUp.classList.add('pop-up--hide');
    }

    showWithText(text){
        this.popUpText.innerHTML=text;
        this.popUp.classList.remove('pop-up--hide');
    }

    popUpInputImg(imgPath){
        this.popUpImg.innerHTML=`<img src=${imgPath} alt="santa">`;
    }
}