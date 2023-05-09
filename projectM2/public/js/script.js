// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  // console.log("projectM2 JS imported successfully!");
  const progressBar = document.querySelector(".progress-bar");
  const weekText = document.querySelector(".week-percentage");
   function stopAnimation(){
    setTimeout(() => {
      progressBar.style.animationPlayState = 'paused';
      weekText.style.animationPlayState = 'paused';
      setTimeout(() => {
        startAnimation();
      },3500)
    },2500);
  }
  
  function startAnimation(){
    progressBar.style.animationPlayState = 'running';
    weekText.style.animationPlayState = 'running';
    stopAnimation()
  }
   stopAnimation();
});


