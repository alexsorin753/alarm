window.onload = function() {
   console.log('onload'); current_time();
}
document.addEventListener('DOMContentLoaded', function() {
   console.log('loaded'); timer_alarm();
});

function current_time() {
   let cur_time = document.querySelector('.current_time');

   function set_time() {
      let time = new Date();
      let hrs = () => {
         if(time.getHours() > 12) {
            let pm = time.getHours() % 12;
            if(pm < 10) return '0' + pm;
            else return pm;
            // pm < 10 ? "0" + pm : pm;
         } else {
            if(time.getHours() < 10) return '0' + time.getHours();
            else return time.getHours();
            // time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
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
   let timer_alarm = document.querySelector('.timer_alarm');
   let form = timer_alarm.getElementsByClassName('timer_alarm_form')[0];   
   let reset_timer = timer_alarm.getElementsByClassName('timer_alarm_reset')[0];
   let stop_watch = timer_alarm.getElementsByClassName('fa-stopwatch')[0];
   let alarm_volume = timer_alarm.getElementsByClassName('fa-volume-high')[0];

   let audio = new Audio('./audio/991.wav');
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

         let seconds_left = seconds_converter();
         
         function timer() {
            
            if(seconds_left === 0) {
               clearInterval(set_timer);
               stop_watch.style.display = "none";
               alarm_volume.style.display = "block";
               timer_alarm.style.backgroundColor = "#F4A261";
               audio.play();
            }

            let out_hrs = Math.floor( seconds_left / 3600 );
            let out_min = Math.floor( (seconds_left % 3600) / 60 );
            let out_sec = Math.floor( (seconds_left % 3600) % 60 );

            if(out_hrs < 10) out_hrs = "0" + out_hrs;
            if(out_min < 10) out_min = "0" + out_min;
            if(out_sec < 10) out_sec = "0" + out_sec;

            timer_alarm.children[1].textContent = `${out_hrs}:${out_min}:${out_sec}`;
            seconds_left--;
         }

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
            audio.pause();
         });         
      }
   });
}