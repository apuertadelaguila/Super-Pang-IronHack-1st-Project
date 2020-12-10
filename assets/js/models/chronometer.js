class Chronometer {
    constructor() {
      this.currentTime = 90;
      this.intervalId = 90;
    }
  
    startClick(callback) {
      this.intervalId = setInterval(() => {
        this.currentTime--;
        callback()
      }, 1000);
       
    }

    getSeconds() {
        return this.currentTime;
    }

    twoDigitsNumber(number) {
        return number < 10 ? `0${number}` : `${number}`;
      }
    
    stopClick() {
      clearInterval(this.intervalId);
    }

    reset() {
        secDec.innerText = 9;
        secUni.innerText = 0;
    }
}
  