window.onload = function() {
   console.log('onload'); curent_time();
}
document.addEventListener('DOMContentLoaded', function() {
   console.log('loaded')
});

function curent_time() {
   document.querySelector('.current_time');

   let time = new Date('March 13, 08 13:20'); // convert to am/pm

   let hrs = time.getHours();
   let min = time.getMinutes();
   let sec = time.getSeconds();

   console.log(hrs + ":" + min + ":" + sec)
}