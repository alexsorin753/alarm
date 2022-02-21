window.onload = function() {
   current_time();
}
document.addEventListener('DOMContentLoaded', function() {
   timer_alarm(); alarm_clock()
});

function current_time() {
   const cur_time = document.querySelector('.current_time');

   function set_time() {
      let time = new Date();
      let hrs = () => {
         if(time.getHours() > 12) {
            let pm = time.getHours() % 12;
            if(pm < 10) return '0' + pm;
            else return pm;
         } else {
            if(time.getHours() < 10) return '0' + time.getHours();
            else return time.getHours();
         }
      }
      let min = () => time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
      let sec = () => time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
   
      cur_time.children[0].textContent = `${hrs()}:${min()}:${sec()}`;

      if(time.getHours() > 12) cur_time.children[1].textContent = "PM";
      else cur_time.children[1].textContent = "AM";      
   }; set_time();

   setInterval(set_time, 1000);
}

function timer_alarm() {
   const title = document.head.getElementsByTagName('TITLE')[0];
   const timer_alarm = document.querySelector('.timer_alarm');
   const form = timer_alarm.getElementsByClassName('timer_alarm_form')[0];   
   const reset_timer = timer_alarm.getElementsByClassName('timer_alarm_reset')[0];
   const stop_watch = timer_alarm.getElementsByClassName('fa-stopwatch')[0];
   const alarm_volume = timer_alarm.getElementsByClassName('fa-volume-high')[0];

   const audio = new Audio('./audio/991.wav');

   form.children[4].addEventListener('click', function(e) {
      e.preventDefault();
      let inp_hrs = form.children[1].value;
      let inp_min = form.children[2].value;
      let inp_sec = form.children[3].value;

      if(inp_hrs > 0 || inp_min > 0 || inp_sec > 0) {
         function dom_change(formDIS, stop_watchDIS, alarm_volumeDIS, timer_alarmBGC, timer_alarmCOL, reset_timerDIS, title_txt, timer_alarm_TXT) {
            if(formDIS != undefined) form.style.display = formDIS;
            if(stop_watchDIS != undefined) stop_watch.style.display = stop_watchDIS;
            if(alarm_volumeDIS != undefined) alarm_volume.style.display = alarm_volumeDIS;
            if(timer_alarmBGC != undefined) timer_alarm.style.backgroundColor = timer_alarmBGC;
            if(timer_alarmCOL != undefined) timer_alarm.style.color = timer_alarmCOL;
            if(reset_timerDIS != undefined) reset_timer.style.display = reset_timerDIS;
            if(title_txt != undefined) title.textContent = title_txt;
            if(timer_alarm_TXT != undefined) timer_alarm.children[1].textContent = timer_alarm_TXT;
         }; dom_change("none", "block", undefined, "#2A9D8F", "white", "block",);

         function seconds_converter() {
            let hrs_con = 0;
            let min_con = 0;
            let sec_con = 0;

            if(inp_hrs) hrs_con = parseInt(inp_hrs) * 3600;
            if(inp_min) min_con = parseInt(inp_min) * 60;
            if(inp_sec) sec_con = parseInt(inp_sec);

            return hrs_con + min_con + sec_con;
         };
         let audio_interval, alarm_interval;
         let seconds_left = seconds_converter();

         function time_set(first) {
            if(!first) seconds_left--;
            let out_hrs = Math.floor( seconds_left / 3600 );
            let out_min = Math.floor( (seconds_left % 3600) / 60 );
            let out_sec = Math.floor( (seconds_left % 3600) % 60 );

            if(out_hrs < 10) out_hrs = "0" + out_hrs;
            if(out_min < 10) out_min = "0" + out_min;
            if(out_sec < 10) out_sec = "0" + out_sec;

            timer_alarm.children[1].textContent = `${out_hrs}:${out_min}:${out_sec}`;
            title.textContent = `Timer Alarm - ${out_hrs}:${out_min}:${out_sec}`;
            return seconds_left;
         }; time_set(true);

         function timer() {
            if(time_set() === 0) {
               dom_change(undefined, "none", "block", "#F4A261", undefined, undefined, "Alarm is ringing...");

               clearInterval(set_timer);
               audio_interval = setInterval(() => audio.play(), 0);
               alarm_interval = setInterval(() => {
                  alarm_volume.animate([
                     {opacity: 0},
                     {opacity: 1},
                     {opacity: 0}
                  ], 500);
               }, 500);
            } else {
               stop_watch.animate([
                  {opacity: 1},
                  {opacity: 0}
               ], 1000);               
            };
         };
         let set_timer = setInterval(timer, 1000);
         
         reset_timer.addEventListener('click', function() {
            dom_change("flex", "none", "none", "", "", "none", "Alarm", "00:00:00");
            
            audio.pause();
            audio.currentTime = 0;
            clearInterval(audio_interval);
            clearInterval(set_timer);
            clearInterval(alarm_interval);
         });         
      };
   });
};
// on title maybe add for example "120min until 02:30PM"
function alarm_clock() {
   const title = document.head.getElementsByTagName('TITLE')[0];
   const alarm_clock = document.querySelector('.alarm_clock');
   const clock = alarm_clock.children[1];
   const alarm_form = document.getElementsByClassName('alarm_clock_form')[0];
   const stop_watch = alarm_clock.getElementsByClassName('fa-stopwatch')[0];
   const alarm_volume = alarm_clock.getElementsByClassName('fa-volume-high')[0];
   const alarm_reset = document.getElementsByClassName('alarm_clock_reset')[0];
   const cur_time = document.querySelector('.current_time');

   const audio = new Audio('./audio/991.wav');

   alarm_form.children[4].addEventListener('click', function(e) {
      e.preventDefault();
      const current_time = () => {
         let time0 = document.querySelector('.current_time').children[0].textContent;
         let time1 = document.querySelector('.current_time').children[1].textContent;

         return time0.substring(0, 5) + " " + time1;
      } 

      const inp_hrs = parseInt(alarm_form.children[1].value);
      const inp_min = parseInt(alarm_form.children[2].value);
      const am_pm = alarm_form.children[3].value;

      inp_hrs < 10 ? hrs = "0" + inp_hrs : hrs = inp_hrs;
      inp_min < 10 ? min = "0" + inp_min : min = inp_min;  

      let txt = `${hrs}:${min} ${am_pm}`; 

      function dom_change(clock_txt, title_txt, cur_timeBGC, cur_timeCOL, alarm_clockBGC, alarm_clockCOL, alarm_resetDIS, alarm_formDIS, stop_watchDIS, alarm_volumeDIS) {
         if (clock_txt != undefined) clock.textContent = clock_txt;
         if (title_txt != undefined) title.textContent = title_txt;
         if (cur_timeBGC != undefined) cur_time.style.backgroundColor = cur_timeBGC;
         if (cur_timeCOL != undefined) cur_time.style.color = cur_timeCOL;
         if (alarm_clockBGC != undefined) alarm_clock.style.backgroundColor = alarm_clockBGC;
         if (alarm_clockCOL != undefined) alarm_clock.style.color = alarm_clockCOL;
         if (alarm_resetDIS != undefined) alarm_reset.style.display = alarm_resetDIS;
         if (alarm_formDIS != undefined) alarm_form.style.display = alarm_formDIS;
         if (stop_watchDIS != undefined) stop_watch.style.display = stop_watchDIS;
         if (alarm_volumeDIS != undefined) alarm_volume.style.display = alarm_volumeDIS;
      };
      dom_change(txt, `Alarm Clock set at ${txt}`, "#2A9D8F", "white", "#2A9D8F", "white", "block", "none", "block");

      function anim_watch() {
         stop_watch.animate([
                  {opacity: .3},
                  {opacity: 1}
               ], 1000);
      }; anim_watch();

      function anim_alarm() {
         alarm_volume.animate([
            {opacity: .3},
            {opacity: 1}
         ], 500);
      };

      let watch_interval = setInterval(anim_watch, 1000);
      let alarm_interval, alarm_sound;
      let check_clock = setInterval(() => {
         if(current_time() === txt) {
            dom_change(undefined, "Alarm is ringing...", "#F4A261", undefined, "#F4A261", undefined, undefined, undefined, "none", "block");

            clearInterval(check_clock);
            clearInterval(watch_interval);

            anim_alarm();
            alarm_interval = setInterval(anim_alarm, 500);
            alarm_sound = setInterval(() => audio.play(), 0);
         }
      }, 1000);

      alarm_reset.addEventListener('click', function() {
         dom_change("--:--", "Alarm", "", "", "", "", "none", "flex", "none", "none");

         audio.pause();
         audio.currentTime = 0;
         clearInterval(alarm_sound);
         clearInterval(watch_interval);
         clearInterval(check_clock);
         clearInterval(alarm_interval);
      });
   });
};