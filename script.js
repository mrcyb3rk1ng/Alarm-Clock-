const alarmContainer = document.getElementById("appBody");
const addAlarmBtn = document.getElementById("addAlarmBtn");
const setAlarmBtn = document.getElementById("setAlarmBtn");
const watch = document.getElementById("watch");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const setAlarmContainer = document.getElementById("setAlarmContainer");
const popupContainer = document.getElementById("popupContainer");
const popupBg = document.getElementById("popupBg");
const emptyText = document.getElementById("emptyText");
const select = document.querySelectorAll("select");
const setAlarm = document.querySelectorAll("h3");

let ringtone;
const alarmsArray = [];

/* For Adding Hours Option */

for (let i = 1; i < 13; i++) {
   const option = document.createElement("option");
   i = i < 10 ? "0" + i : i ;
   option.textContent = i;
   hours.appendChild(option);
}

/* For Adding Minutes Option */

for (let i = 0; i < 60; i++) {
   const option = document.createElement("option");
   i = i < 10 ? "0" + i : i ;
   option.textContent = i;
   minutes.appendChild(option);
}

/* Clock */

setInterval(() => {
   const date = new Date();
   let getHour = date.getHours();
   let getMinute = date.getMinutes();
   let getSecond = date.getSeconds();
   
   let ampm = getHour < 12 || getHour == 0 ? "AM" : "PM" ;
   
   getHour = getHour < 10 && getHour > 0 ? "0" + getHour : getHour == 0 ? 12 : getHour ;
   getMinute = getMinute < 10 ? "0" + getMinute : getMinute ;
   getSecond = getSecond < 10 ? "0" + getSecond : getSecond ;

   watch.textContent = `${getHour}:${getMinute}:${getSecond} ${ampm}`;
   
   /* Playing Ringtone  */
   
   try {
      if (
         `${getHour}:${getMinute} ${ampm}` === alarmsArray[0] 
         || `${getHour}:${getMinute} ${ampm}` === alarmsArray[1] 
         || `${getHour}:${getMinute} ${ampm}` === alarmsArray[2] 
         || `${getHour}:${getMinute} ${ampm}` === alarmsArray[3] 
         || `${getHour}:${getMinute} ${ampm}` ===alarmsArray[4]
         ) {
         
         ringtone.play();
         
      } else if (
         `${getHour}:${getMinute} ${ampm}` !== alarmsArray[0]
         || `${getHour}:${getMinute} ${ampm}` !== alarmsArray[1]
         || `${getHour}:${getMinute} ${ampm}` !== alarmsArray[2]
         || `${getHour}:${getMinute} ${ampm}` !== alarmsArray[3]
         || `${getHour}:${getMinute} ${ampm}` !== alarmsArray[4]
         ) {
            
         ringtone.pause();
         
      }
   } catch (e) {}
   
},1000);

/* Adding Alarm */

addAlarmBtn.addEventListener('click', () => {
   popupContainer.style.display = "block";
   popupBg.style.display = "block";
   ringtone = new Audio(select[0].value);
});

/* Setting Alarm */
let alarmIndex = 0;
setAlarmBtn.addEventListener('click', () => {
   popupContainer.style.display = "none";
   popupBg.style.display = "none";
   emptyText.style.display = "none";
   
   const alarmTime = document.createElement("h3");
   alarmTime.setAttribute("class", "alarmTime");
   alarmTime.textContent = `${select[1].value}:${select[2].value} ${select[3].value}`;
   setAlarmContainer.appendChild(alarmTime);
   
   alarmsArray[alarmIndex] = (`${select[1].value}:${select[2].value} ${select[3].value}`);
   alarmIndex++;
   
   if (alarmIndex == 5) {
      addAlarmBtn.setAttribute("disabled", true);
   }
});
