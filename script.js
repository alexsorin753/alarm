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
         form.style.display = "none";
         stop_watch.style.display = "block";
         reset_timer.style.display = "block";
         timer_alarm.style.backgroundColor = "#2A9D8F";
         timer_alarm.style.color = "white";
         
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

         function timer() {
            let out_hrs = Math.floor( seconds_left / 3600 );
            let out_min = Math.floor( (seconds_left % 3600) / 60 );
            let out_sec = Math.floor( (seconds_left % 3600) % 60 );

            if(out_hrs < 10) out_hrs = "0" + out_hrs;
            if(out_min < 10) out_min = "0" + out_min;
            if(out_sec < 10) out_sec = "0" + out_sec;

            stop_watch.animate([
               {opacity: 1},
               {opacity: 0}
            ], 1000);

            timer_alarm.children[1].textContent = `${out_hrs}:${out_min}:${out_sec}`;
            title.textContent = `Timer Alarm - ${out_hrs}:${out_min}:${out_sec}`;
            seconds_left--; 

            if(seconds_left === 0) {
               clearInterval(set_timer);
               stop_watch.style.display = "none";
               alarm_volume.style.display = "block";
               timer_alarm.style.backgroundColor = "#F4A261";
               audio_interval = setInterval(() => audio.play(), 0);
               alarm_interval = setInterval(() => {
                  alarm_volume.animate([
                     {opacity: 0},
                     {opacity: 1},
                     {opacity: 0}
                  ], 500);
               }, 500);
               title.textContent = "bip, bip, bip..."; why
            };
         };

         let set_timer = setInterval(timer, 1000);
         
         reset_timer.addEventListener('click', function() {
            clearInterval(set_timer);            
            form.style.display = "flex";
            stop_watch.style.display = "none";
            alarm_volume.style.display = "none";
            timer_alarm.style.backgroundColor = "";
            timer_alarm.style.color = "";
            timer_alarm.children[1].textContent = "00:00:00";
            reset_timer.style.display = "none";
            audio.pause(); clearInterval(audio_interval);
            clearInterval(alarm_interval);
            title.textContent = "Alarm";
         });         
      };
   });
};

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

      const inp_hrs = parseInt(alarm_form.children[1].value) ;
      const inp_min = parseInt(alarm_form.children[2].value) ;
      const am_pm = alarm_form.children[3].value;

      inp_hrs < 10 ? hrs = "0" + inp_hrs : hrs = inp_hrs;
      inp_min < 10 ? min = "0" + inp_min : min = inp_min;  

      let txt = `${hrs}:${min} ${am_pm}`; 
      clock.textContent = txt;
      title.textContent = `Alarm Clock set at ${txt}`

      cur_time.style.backgroundColor = "#2A9D8F";
      cur_time.style.color = "white";
      alarm_clock.style.backgroundColor = "#2A9D8F";
      alarm_clock.style.color = "white";
      alarm_reset.style.display = "block";
      alarm_form.style.display = "none";
      stop_watch.style.display = "block";

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

      function play_audio() {
         audio.play();
      };

      let watch_interval = setInterval(anim_watch, 1000);
      let alarm_interval, alarm_sound;
      let check_clock = setInterval(() => {
         if(current_time() === txt) {
            cur_time.style.backgroundColor = "#F4A261";
            alarm_clock.style.backgroundColor = "#F4A261";
            stop_watch.style.display = "none";
            alarm_volume.style.display = "block";

            clearInterval(check_clock);
            clearInterval(watch_interval);

            anim_alarm();
            alarm_interval = setInterval(anim_alarm, 500);
            alarm_sound = setInterval(play_audio, 0);
            title.textContent = "bip, bip, bip..."
         }
      }, 1000);

      alarm_reset.addEventListener('click', function() {
         cur_time.style.backgroundColor = "";
         cur_time.style.color = "";
         alarm_clock.style.backgroundColor = "";
         alarm_clock.style.color = "";
         alarm_reset.style.display = "none";
         alarm_form.style.display = "flex";
         stop_watch.style.display = "none";
         alarm_volume.style.display = "none";
         clock.textContent = "--:--";
         title.textContent = "Alarm";

         audio.pause();
         clearInterval(watch_interval);
         clearInterval(check_clock);
         clearInterval(alarm_interval);
         clearInterval(alarm_sound);
      });
   });
};