/**
 * Created by chanwoopark on 2017. 2. 7..
 */

var workoutsTag = document.querySelector(".workouts");
var workoutsLists = workoutsTag.children;

//----------------------calendar------------------------------------
var date;
var calendar = document.querySelector(".calendar");
calendar.addEventListener("change",function(){
   date = calendar.value;
   if(localStorage.getItem(date) === null){
       workoutsTag.innerHTML = "";
   }else if(!!localStorage.getItem(date)){
       workoutsTag.innerHTML = localStorage.getItem(date);
   }
});




//------------------------add button--------------------------------

var workoutPrompt = function() {
    var inputVal = prompt("Enter Workout", "Enter Workout");
    //Creates <li>node containing input value user typed
    var newWorkout = document.createElement("li");
    newWorkout.innerHTML = inputVal;
    newWorkout.className = "workoutLists";


    for(var i = 0; i < workoutsList.length; i++) {
        if (inputVal === workoutsList[i].textContent) {
            alert("Same workout exist");
            return;
        }
    }workoutsTag.appendChild(newWorkout);
};


//-------------------------delete button------------------------------

// when clicked should change back color


var selectedNode;

/*workoutsLists*/.addEventListener("click",function(evt){selectedNode = evt.target});

function deleteButton(){
    if(selectedNode.className === "workoutLists"){
        workoutsTag.removeChild(selectedNode);
    }else{}
}

//-------------------------save button--------------------------------
function storeLists(){
    //workoutData is string type
    var workoutsData = workoutsTag.innerHTML;
    if(workoutsData === ""){
        localStorage.removeItem(date);
    }else if(!!workoutsData) {
        localStorage.setItem(date, workoutsData);
    }
}


//----------------------------------------------------------------------
