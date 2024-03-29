let start = document.getElementById("start");
let stop = document.getElementById("stop");
let reset = document.getElementById("reset");
let timeElement = document.getElementById("time");

let elapsed = 0;
let intervalId = null;

function setButtonStateIntial() {
  start.disabled = false;
  stop.disabled = true;
  reset.disabled = true;
}

function setButtonStateRunning() {
  start.disabled = true;
  stop.disabled = false;
  reset.disabled = true;
}

function setButtonStateStopped() {
  start.disabled = false;
  stop.disabled = true;
  reset.disabled = false;
}

function updateTime() {
  const ms = elapsed % 1000;
  const s = Math.floor(elapsed / 1000) % 60;
  const m = Math. floor(elapsed / (1000*60)) % 60;
  const h = Math.floor(elapsed / (1000*60*60));
  
  const msStr = ms.toString().slice(0,1);
  
  timeElement.innerHTML = `${h}: ${m}: ${s}: ${msStr}`;
}

start.addEventListener('click', function(event) {
  setButtonStateRunning();
  let pre = new Date();
  if (intervalId !== null) {return; }
  intervalId = setInterval(function() {
    const now = new Date();
    elapsed += now - pre;
    pre = now;
    updateTime();
  }, 100);
});

stop.addEventListener('click', function(event) {
  setButtonStateStopped();
  clearInterval(intervalId);
  intervalId = null;
});

reset.addEventListener('click', function(event) {
  setButtonStateIntial();
  elapsed = 0;
  updateTime();
});

