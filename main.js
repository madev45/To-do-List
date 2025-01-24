     function saveData() {
    let inputField = document.getElementById("user-input");
    let inputValue = inputField.value;

    // Agar input empty hai, toh return kar dein
    if(inputValue === "") return;
 
    // Input ko LocalStorage mein save karna
    let tasks = JSON.parse(localStorage.getItem("userTask"))||[];
    
    let obj ={
      content : inputValue,
      status : ""
    }
    
    tasks.push(obj)
    
    
    localStorage.setItem("userTask", JSON.stringify(tasks));
     
    
     display()
    // Input field ko clear karna
    inputField.value = "";
}


function display() {
  let saveData ; 
  
  
   saveData =  JSON.parse(localStorage.getItem("userTask"))||[] ;
  
    let container =  document.querySelector(".container"); 
  container.innerHTML = "";
    if(saveData && saveData.length > 0) {
      
        saveData.forEach((data, index) => {  
      
                     let div =  document.createElement("div");
        div.classList.add("new-div")
        div.innerHTML = `<p class = "output"></p>
      <div class="buttons">
      <button class="complete">Complete</button>
      <button class="remove">Remove</button>
      </div>
    `
    div.querySelector(".output").innerHTML = data.content;
    
    if (data.status == "on") {
      div.style.borderColor = "green"
      div.querySelector(".complete").style.display ="none"
      div.querySelector(".output").style.textDecoration = "line-through"
      let span = document.createElement("span") 
      span.classList.add("span") 
      span.textContent = "Completed"
      div.querySelector(".buttons").appendChild(span) 
    }
    
    div.querySelector(".complete").addEventListener("click",()=>{
      
      let taskS = JSON.parse(localStorage.getItem("userTask"))||[] ;
      taskS[index].status = "on"
      localStorage.setItem("userTask", JSON.stringify(taskS));
      
      display()
    })
    
    
    div.querySelector(".remove").addEventListener("click",()=>{ 
     
     let taskS = JSON.parse(localStorage.getItem("userTask"))||[] ;
     
    taskS = taskS.filter(task => task.content !== data.content);
     
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
