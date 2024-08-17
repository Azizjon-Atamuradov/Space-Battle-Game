const button = document.getElementById('start');

 
// button.addEventListener('click', function() {
//     alert('hey')
// });

 // Preventing the default action when a link is clicked
 

link.addEventListener('click', function(event) {
    event.preventDefault(); // Prevents the browser from following the link
    alert('Link click prevented!');
});



 
