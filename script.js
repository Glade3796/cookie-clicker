//Initial load state:
const loadState = {
  theCounter: 0,
  ClickIncFactor: 1,
  incrementor: 0,
  autoIncTimer: 1000,
  autoIncVal: 0,
  autoClickTimer: 0,
  comradeNum: 0,
  comradeCost: 20,
  foxSquadNum: 0,
  foxSquadCost: 1000,
  campaignNum: 0,
  campaignCost: 2500,
  free0: false,
  free1: false,
  free2: false,
};
let cookie = loadState;
//continuosly updates all displays and stores gamestate
function counterUpdateStore() {
  //displays
  dispCounter.textContent = `\u2766${Math.floor(cookie.theCounter)}`;
  dispCookiePerX.textContent = `${cookie.ClickIncFactor}`;
  //   dispCookiesPerSec.textContent = `${cookie.autoIncVal}`;
  dispComradeNum.textContent = `${cookie.comradeNum}`;
  let autoClickTNum = Math.floor(cookie.autoClickTimer / 1000);
  //sabteam effectiveness display
  let effectDisplay = "no sab teams";
  if (cookie.foxSquadNum === 0) {
    effectDisplay = "no sab teams";
  } else if (autoClickTNum === 0 && cookie.foxSquadNum >= 1) {
    effectDisplay = "kicking ass";
  } else if (autoClickTNum < 3) {
    effectDisplay = "wrecking hunts";
  } else if (autoClickTNum < 5) {
    effectDisplay = "getting better";
  } else if (autoClickTNum < 10) {
    effectDisplay = "unorganised";
  } else if (autoClickTNum >= 10) {
    effectDisplay = "utter noobs";
  } else effectDisplay = "no sab team";
  dispCookiesPerSec.textContent = effectDisplay;
  dispFoxSquad.textContent = `${cookie.foxSquadNum}`;
  //icons
  let campaign = `\uD83D\uDC69\u200D\uD83D\uDCBB`;
  let recruit = "\uD83E\uDD77";
  let fox = `\uD83E\uDD8A`;
  dispComrades.textContent =
    `${recruit.repeat(cookie.comradeNum)}` +
    `${fox.repeat(cookie.foxSquadNum)}` +
    `${campaign.repeat(cookie.campaignNum)}`;
  let dog = "";
  let cow = "";
  let badger = "";
  if (cookie.free0 === true) {
    dog = "\uD83D\uDC15";
  }
  if (cookie.free1 === true) {
    cow = "\uD83D\uDC04";
  }
  if (cookie.free2 === true) {
    badger = "\uD83E\uDDA1";
  }
  dispFree.textContent = dog + cow + badger;
  comradeTxt.textContent = `Recruit \u2766${Math.floor(cookie.comradeCost)}`;
  foxSquadTxt.textContent = `Hunt Sab team \u2766${Math.floor(
    cookie.foxSquadCost
  )}`;
  campaignTxt.textContent = `Online awareness \u2766${Math.floor(
    cookie.campaignCost
  )}`;
  dispCampaign.textContent = `\u2766${cookie.autoIncVal * 10} per sec`;
  //freed buttons
  free0Btn.hidden = cookie.free0;
  free1Btn.hidden = cookie.free1;
  free2Btn.hidden = cookie.free2;

  //storage
  localStorage.setItem("cookie", JSON.stringify(cookie));
}
//load from storage
function loadScore() {
  cookie = JSON.parse(localStorage.getItem("cookie"));
}

//DOM elements
const theButton = document.getElementById("theBtn");
const dispCounter = document.getElementById("counterDisp");
const dispCookiePerX = document.getElementById("cookiesPerX");
const autoClickInfo = document.getElementById("autoClickInfo");
const intervalInfo = document.getElementById("intervalInfo");
const dispCookiesPerSec = document.getElementById("cookiesPerSec");

const comradeBtn = document.getElementById("recruitComrade");
const dispComradeNum = document.getElementById("comradeNum");
const comradeTxt = document.getElementById("recruitComTxt");

const foxSquadBtn = document.getElementById("foxSquad");
const dispFoxSquad = document.getElementById("foxSquadNum");
const foxSquadTxt = document.getElementById("getFoxSquad");

const campaignBtn = document.getElementById("ic1");
const dispCampaign = document.getElementById("campaignNum");
const campaignTxt = document.getElementById("getCampaign");

const free0Btn = document.getElementById("free0");
const free1Btn = document.getElementById("free1");
const free2Btn = document.getElementById("free2");

const dispFree = document.getElementById("freed");

const dispComrades = document.getElementById("numberOfcomrades");

const resetBtn = document.getElementById("resetBtn");

const cheatBtn = document.getElementById("cheat");
//click button 'manual increment'
function manualInc() {
  cookie.theCounter += cookie.ClickIncFactor;
  console.log(`count: ${cookie.theCounter}, inc: ${cookie.ClickIncFactor}`);
  animate();
  //winstate
  if (cookie.free0 === true && cookie.free1 === true && cookie.free2 === true) {
    alert("You've been arrested. But you also win the game");
  }
}
//auto incrementor (consistent additions)
function autoInc() {
  console.log("intrval: " + cookie.autoIncVal);
  cookie.theCounter += cookie.autoIncVal;
}
//auto click - random button clicks
function autoClick() {
  console.log("tic");
  if (cookie.foxSquadNum > 0) {
    cookie.theCounter += cookie.incrementor;
    cookie.autoClickTimer =
      (Math.random() * 10 * 2 * 2000) / cookie.foxSquadNum;
    console.log("auto: " + cookie.autoClickTimer / 1000);
    manualInc();
    setTimeout(autoClick, cookie.autoClickTimer);
  }
}
//purchase functions
function recruitComrade() {
  if (cookie.theCounter >= cookie.comradeCost) {
    cookie.theCounter -= cookie.comradeCost;
    switch (cookie.free0) {
      case true:
        cookie.ClickIncFactor += 2;
        cookie.comradeNum++;
        cookie.comradeCost += 0.1 * cookie.comradeCost;
        break;
      case false:
        cookie.ClickIncFactor++;
        cookie.comradeNum++;
        cookie.comradeCost += 0.15 * cookie.comradeCost;
        break;
    }
  }
}

function addFoxSquad() {
  if (cookie.theCounter >= cookie.foxSquadCost) {
    cookie.theCounter -= cookie.foxSquadCost;
    switch (cookie.free1) {
      case true:
        cookie.foxSquadNum += 2;
        cookie.foxSquadCost += 0.1 * cookie.foxSquadCost;
        autoClick();
        break;
      case false:
        cookie.foxSquadNum++;
        cookie.foxSquadCost += 0.15 * cookie.foxSquadCost;
        autoClick();
        break;
    }
  }
}

function addCampaign() {
  if (cookie.theCounter >= cookie.campaignCost) {
    cookie.theCounter -= cookie.campaignCost;
    switch (cookie.free2) {
      case true:
        cookie.campaignNum++;
        cookie.campaignCost += 0.05 * cookie.campaignCost;
        cookie.autoIncVal = cookie.autoIncVal + 2;
        break;
      case false:
        cookie.campaignNum++;
        cookie.campaignCost += 0.1 * cookie.campaignCost;
        cookie.autoIncVal = cookie.autoIncVal + 1;
        break;
    }
  }
}

//free events
function free0event() {
  if (cookie.theCounter >= 10000) {
    cookie.theCounter -= 10000;
    alert("Cops arrest your friends and the sabs!");
    alert("Your friends are now more effective!");
    cookie.foxSquadNum -= cookie.foxSquadNum;
    cookie.comradeNum -= cookie.comradeNum;
    cookie.free0 = true;
    cookie.comradeCost = 20;
    cookie.foxSquadCost = 1000;
    cookie.campaignCost = cookie.campaignCost / 2;
  }
}
function free1event() {
  if (cookie.theCounter >= 100000) {
    cookie.theCounter -= 100000;
    alert("Cops arrest your friends and the sabs!");
    alert("The sabs are even more fierce");
    cookie.foxSquadNum -= cookie.foxSquadNum;
    cookie.comradeNum -= cookie.comradeNum;
    cookie.free1 = true;
    cookie.comradeCost = 20;
    cookie.foxSquadCost = 1000;
    cookie.campaignCost = cookie.campaignCost / 2;
  }
}
function free2event() {
  if (cookie.theCounter >= 200000) {
    cookie.theCounter -= 200000;
    alert("Cops arrest your friends and the sabs!");
    alert("The online community is on your side");
    cookie.foxSquadNum -= cookie.foxSquadNum;
    cookie.comradeNum -= cookie.comradeNum;
    cookie.free2 = true;
    cookie.comradeCost = 20;
    cookie.foxSquadCost = 1000;
    cookie.campaignCost = cookie.campaignCost / 2;
  }
}

//reset button
function reset(event) {
  event.preventDefault();
  if (confirm("Are you sure you want to reset?")) {
    localStorage.removeItem("cookie");
    cookie = loadState;
    location.reload();
  }
}
//cheat button
function cheat() {
  alert("cheaters never prosper");
  cookie.theCounter += 50000;
}
//animate function
function animate() {
  dispCounter.style["transform"] = "scale(1.4)";
  dispCounter.style["transition"] = "0.25s";
  setTimeout(() => (dispCounter.style["transform"] = "scale(1)"), 200);
}
//timers
setTimeout(autoClick, cookie.autoClickTimer);
setInterval(() => console.log(cookie.theCounter), 5000);
setInterval(autoInc, 100);
setInterval(counterUpdateStore, 100);

//event listeners
theButton.addEventListener("click", manualInc);
// theButton.addEventListener("click", animate);
resetBtn.addEventListener("click", reset);
comradeBtn.addEventListener("click", recruitComrade);
foxSquadBtn.addEventListener("click", addFoxSquad);
campaignBtn.addEventListener("click", addCampaign);
loadScore();
free0Btn.addEventListener("click", free0event);
free1Btn.addEventListener("click", free1event);
free2Btn.addEventListener("click", free2event);
cheatBtn.addEventListener("click", cheat);
