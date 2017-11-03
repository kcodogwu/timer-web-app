'use strict';

window.onload = function onload() {
  var t = 0;
  var h = 0;
  var m = 0;
  var s = 0;
  var pFlag = false;
  var hrs = document.getElementById('hrs');
  var mins = document.getElementById('mins');
  var secs = document.getElementById('secs');
  var start = document.getElementById('start');
  var pause = document.getElementById('pause');
  var stop = document.getElementById('stop');
  var invalid = document.getElementById('invalid');
  var timeInterval;

  var reset = function reset() {
    hrs.value = '00';
    mins.value = '00';
    secs.value = '00';
    hrs.disabled = false;
    mins.disabled = false;
    secs.disabled = false;
    start.disabled = false;
    pause.disabled = true;
    stop.disabled = true;
    t = 0;
  };

  var addEvent = function addEvent(element, eventType, eventHandler) {
    if (element.attachEvent)
      element.attachEvent('on' + eventType, eventHandler)
    ; else
      element.addEventListener(eventType, eventHandler)
    ;
  };
  
  var getRemainingTime = function getRemainingTime() {
    var seconds = Math.floor((t/1000) % 60);
    var minutes = Math.floor((t / (1000 * 60)) % 60);
    var hours = Math.floor((t/(1000 * 60 * 60)));

    return { totalTime: t, hours: hours, minutes: minutes, seconds: seconds };
  };

  var setClock = function setClock() {
    var clockTicks = function clockTicks() {
      var timeObj = getRemainingTime();

      hrs.value =  ('0' + timeObj.hours).slice(-2);
      mins.value =  ('0' + timeObj.minutes).slice(-2);
      secs.value =  ('0' + timeObj.seconds).slice(-2);

      if(timeObj.totalTime <= 0 ) {
        clearInterval(timeInterval);
        hrs.style.backgroundColor = 'red';
        mins.style.backgroundColor = 'red';
        secs.style.backgroundColor = 'red';
        reset();
      } else if (timeObj.totalTime <= 60000) { // 1 minute left
        hrs.style.backgroundColor = 'orange';
        mins.style.backgroundColor = 'orange';
        secs.style.backgroundColor = 'orange';
      } else {
        hrs.style.backgroundColor = 'rgb(70, 70, 70)';
        mins.style.backgroundColor = 'rgb(70, 70, 70)';
        secs.style.backgroundColor = 'rgb(70, 70, 70)';
      }

      t -= 1000;
    };

    clockTicks(); // avoid delay by excuting the function once
    timeInterval = setInterval(clockTicks, 1000);
  };

  var validate = function validate() {
    h = Math.floor(hrs.value);
    m = Math.floor(mins.value);
    s = Math.floor(secs.value);

    if (isNaN(h) || isNaN(m) || isNaN(s))
      return false
    ; else if (m >= 60 || s >= 60)
      return false
    ; else
      return true
    ;
  };

  var startListener = function startListener() {
    if (validate()) {
      invalid.style.display = 'none';
      invalid.style.visibility = 'hidden';
      hrs.disabled = true;
      mins.disabled = true;
      secs.disabled = true;
      start.disabled = true;
      pause.disabled = false;
      stop.disabled = false;
      t = (h * 60 * 60 * 1000) + (m * 60 * 1000) + (s * 1000);
      setClock();
    } else {
      invalid.style.display = 'block';
      invalid.style.visibility = 'visible';
      reset();
    }
  };

  var pauseListener = function pauseListener() {
    pFlag = !pFlag;

    if (pFlag) {
      pause.innerHTML = 'Resume';
      clearInterval(timeInterval);
    } else {
      pause.innerHTML = 'Pause';
      setClock();
    }
  };

  var stopListener = function stopListener() {
    reset();
  };

  pause.disabled = true;
  stop.disabled = true;
  addEvent(start, 'click', startListener);
  addEvent(pause, 'click', pauseListener);
  addEvent(stop, 'click', stopListener);
};