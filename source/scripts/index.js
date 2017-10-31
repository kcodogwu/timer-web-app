'use strict';

window.onload = function onload() {
  var endpoint = '2017-10-30 14:11:00Z';

  var getRemainingTime = function getRemainingTime(stopTime) {
    var t = Date.parse(stopTime) - Date.parse(new Date());
    var seconds = Math.floor((t/1000) % 60);
    var minutes = Math.floor((t / (1000 * 60)) % 60);
    var hours = Math.floor((t/(1000 * 60 * 60)));

    return { totalTime: t, hours: hours, minutes: minutes, seconds: seconds };
  };

  var setClock = function setClock(id, stopTime) {
    var clock = document.getElementById(id);
    var hoursElement = clock.querySelector('.hours');
    var minutesElement = clock.querySelector('.minutes');
    var secondsElement = clock.querySelector('.seconds');

    var clockTicks = function clockTicks() {
      var t = getTimeRemaining(stopTime);

      hoursElement.innerHTML =  ('0' + t.hours).slice(-2);
      minutesElement.innerHTML =  ('0' + t.minutes).slice(-2);
      secondsElement.innerHTML =  t.seconds.slice(-2);
      if(t.total <= 0 ) clearInterval(timeinterval); 
    };

    clockTicks(); // avoid delay by excuting the function once

    var timeinterval = setInterval(clockTicks, 1000);
  };

  setClock('clockdiv', deadline);
};