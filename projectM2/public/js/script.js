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
  


   const tabForms =  document.querySelectorAll('.tab-forms');
   tabForms.forEach((item) => {
    item.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formAction = item.action;
      await axios.get(`${formAction}`)
       .then((data) => {
        console.log(data.data.habitEditDetails);
        const habitName = document.querySelector('.habit-name').value = `${data.data.habitEditDetails.Habit}`
        const habitGoal = document.querySelector('.habit-goal').value = `${data.data.habitEditDetails.Goal}`
        const habitTasks = document.querySelector('.habit-tasks').value = `${data.data.habitEditDetails.Tasks}`
        const habiDuration = document.querySelector('.habit-duration').value = `${data.data.habitEditDetails.Duration}`
       })
     })
   })
});


