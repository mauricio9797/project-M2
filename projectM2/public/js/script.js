// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  // console.log("projectM2 JS imported successfully!");
  const progressBar = document.querySelector(".progress-bar"); 
   function startAnimation(){
    // progressBar.style.width = "0%";
    progressBar.style.animation = 'none'
    progressBar.style.animation = 'progressbar-animation 5s linear';
    // progressBar.style.width = '75%';
  }
  
  function resetAnimation(){
    progressBar.style.width = '75%';
    setTimeout(startAnimation, 5000);
  }
  
  setInterval(() => {
    startAnimation();
  }, 5000)
});


