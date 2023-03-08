'use strict';

const ITEM_SIZE=40;

export const ItemType = Object.freeze({
    gift:'gift',
    bomb:'bomb',
});

export class Field{
    constructor(giftCount, bombCount){
        this.giftCount = giftCount;
        this.bombCount = bombCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.onFieldClickListener = this.onFieldClickListener.bind(this);
        this.field.addEventListener('click',this.onFieldClickListener);
    }

    setItemClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }

    onFieldClickListener(event){
            const target= event.target;
            if(target.matches('.gift')){
                target.remove();
                this.onItemClick && this.onItemClick(ItemType.gift);
            } else if(target.matches('.bomb')){
                this.onItemClick && this.onItemClick(ItemType.bomb)
            }
    }
    
    init(){
        this.field.innerHTML='';
        this._addItem('gift', this.giftCount,'img/game_gift.png');
        this._addItem('bomb', this.bombCount,'img/game_dynamite.png');
    }

    
    _addItem(className,count,imgPath){
        const x1=0;
        const y1=0;
        const x2=this.fieldRect.width-ITEM_SIZE;
        const y2=this.fieldRect.height-ITEM_SIZE;
        for(let i=0; i<count; i++){
            const item = document.createElement('img');
            item.setAttribute('class',className);
            item.setAttribute('src',imgPath);
            item.style.position='absolute';
            const x = this.randomNumber(x1,x2);
            const y = this.randomNumber(y1,y2);
            item.style.left=`${x}px`;
            item.style.top=`${y}px`;
            this.field.appendChild(item);
        }
    }

    randomNumber(min,max){
        return Math.random()*(max-min)+min;
    }
}
