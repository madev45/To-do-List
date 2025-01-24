     function saveData() {
    let inputField = document.getElementById("user-input");
    let inputValue = inputField.value;

    // Agar input empty hai, toh return kar dein
    if(inputValue === "") return;
 
    // Input ko LocalStorage mein save karna
    let tasks = JSON.parse(localStorage.getItem("userTask"))||[];
    
    
    
    tasks.push(inputValue)
    
    
    localStorage.setItem("userTask", JSON.stringify(tasks));
     
    
     display()
    // Input field ko clear karna
    inputField.value = "";
}


function display() {
  let saveData ; 
  
  try {
   saveData =  JSON.parse(localStorage.getItem("userTask"))||[] ;
  } catch (e) {
    console.log(e)
    saveData = []
  }
  
    let container =  document.querySelector(".container"); 
  container.innerHTML = "";
    if(saveData && saveData.length > 0) {
      
        saveData.forEach((data) => {  
      
                     let div =  document.createElement("div");
        div.classList.add("new-div")
        div.innerHTML = `<p class = "output"></p>
      <div class="buttons">
      <button class="remove">Remove</button>
      </div>
    `
    div.querySelector(".output").innerHTML = data ;
    
    
    
    
    div.querySelector(".remove").addEventListener("click",()=>{ 
     
     let taskS = JSON.parse(localStorage.getItem("userTask"))||[] ;
     
    taskS = taskS.filter(task => task !== data);
     
     localStorage.setItem("userTask", JSON.stringify(taskS));
     
      display()
    }) 
    container.appendChild(div);
        })
        
    }
}
// Page load hone par check karna ke agar LocalStorage mein koi data hai toh wo input field mein dikhayein
window.onload = function() {
    setTimeout(display,100)

};