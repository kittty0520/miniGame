# MiniGame

## 📃index

1.[기획의도](#기획의도)  
2.[기능](#기능)  
3.[기술스택](#✨기술스택)  
4.[배운 점](#💡배운-점)
<br/>

## 🎯기획의도

> 자바스크립트의 함수를 사용하여 게임을 만들어보고, 기능별로 클래스를 생성하여 모듈화하는 연습을 하기 위해 제작한 프로젝트 입니다.  
>  (드림코딩의 게임 프로젝트를 참고)

<br/>

## ✨기술스택

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/Visual Studio-5C2D91?style=for-the-badge&logo=Visual Studio&logoColor=white"/> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<br/>

## 💻기능

- 게임 필드 만들기

  - 게임 필드 영역을 설정하기
  - 당근과 벌레 랜덤 배치

    <br/>

* 게임 시작하기
  - 시작 section을 닫기
  - 게임 타이머 시작하기
  - 노래 시작하기
    <br/>

- 게임 중지하기

  - 타이머 정지하기
  - 팝업창을 띄우기 => RETRY?
  - 노래 정지하기
  
  
  ![game_pause](https://user-images.githubusercontent.com/105909450/223993076-49f300ac-639d-4519-9057-dedae85826e7.gif)


    <br/>

- 게임 결과 내기

  - 폭탄을 눌렀을 때 => LOSE
  
  
  ![game_lose](https://user-images.githubusercontent.com/105909450/223994018-b7080101-451b-43bd-b48b-a9b141819df4.gif)
  
  - 시간내에 정해진 선물박스를 모두 클릭했을 때 => WIN   
  
  
  ![game_win](https://user-images.githubusercontent.com/105909450/223993669-7fde8338-f914-4d9a-9a60-0e8ef1fa310f.gif)

  
  - 시간내에 모두 누르지 못했을 때 =>LOSE
  
  
  ![game_timeover](https://user-images.githubusercontent.com/105909450/223996183-0a21c635-7569-4786-b8a5-1dec8d23d14d.gif)

    <br/>

- 리팩토링하기
  - **(모듈화)** main / game / field / sound / popup 클래스를 생성하여 기존의 변수와 함수들을 기능에 맞게 배치함
  - Object.freeze()를 사용하여 객체의 프로퍼티값을 수정하지 못하도록 함 => 함수의 매개변수를 입력할 때 오타로 인해 error가 일어나는 것을 방지함
    <br/>

## 💡배운 점

- this 바인딩

  - 문제점 : 이벤트 리스너를 통해 호출되는 콜백함수의 this가 currentTarget, 즉 이벤트를 바인딩한 DOM 요소를 가리키기 때문에 클래스의 인스턴스를 참조하지 못하고 undefined이 반환되는 문제가 발생한다.
    <br/>
  - 해결방안 :

    1. 화살표 함수

       ```javascript
       this.field.addEventListener('click', (event) =>
       	this.onFieldClickListener(event)
       );
       ```

       <br/>

    2. bind() 메서드

       ```javascript
       this.onFieldClickListener = this.onFieldClickListener.bind(this);
       this.field.addEventListener('click', this.onFieldClickListener);
       ```

    <br/>

    3. 콜백함수를 화살표 함수로 구현

       ```javascript
       onFieldClickListener = (event) => {
       	const target = event.target;
       	if (target.matches('.gift')) {
       		target.remove();
       		this.onItemClick && this.onItemClick(ItemType.gift);
       	} else if (target.matches('.bomb')) {
       		this.onItemClick && this.onItemClick(ItemType.bomb);
       	}
       };
       ```

    <br />

- getBoundingClientRect()

  - 정의: element의 크기와 viewport에 상대적인 위치 정보를 제공하는 DOMRect 객체를 반환한다.
  - 메서드가 반환하는 DOMRect 객체의 width와 height 프로퍼티를 이용하여 게임 필드 영역의 위치값을 알아내었고, 선물박스와 폭탄아이템이 필드 내에 배치되도록 하였다.

    <br/>

- set[]ClickListener()의 용도
  <br/>

  > 📌외부 클래스에 내장된 addEventListener에게 콜백함수를 전달하기 위함.

  - 모든 함수가 main.js에 있었을 때는 필요가 없었지만, 모듈화하면서 각각의 class 내부로 이벤트 리스너가 들어갔음. main.js에서 사용하기 위한 별도의 리스너 함수(예를들면, setClickListener)를 설정하고 클래스 내부에 콜백함수가 전달하여 이벤트를 처리함.
    <br/>

- 빌더 패턴 사용

  - 객체를 만들 때 간단명료하고 가독성 좋게 만듦
  - 메서드 체이닝을 이용

    ```javascript
    export class GameBuilder {
    	gameDuration(duration) {
    		this.gameDuration = duration;
    		return this;
    	}

    	giftCount(num) {
    		this.giftCount = num;
    		return this;
    	}

    	bombCount(num) {
    		this.bombCount = num;
    		return this;
    	}

    	build() {
    		return new Game(this.gameDuration, this.giftCount, this.bombCount);
    	}
    }
    ```

    ```javascript
    //호출할 때
    const game = new GameBuilder()
    	.gameDuration(5)
    	.giftCount(3)
    	.bombCount(3)
    	.build();
    ```

  <br/>
