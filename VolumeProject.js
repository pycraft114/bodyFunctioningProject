/**
 * Created by chanwoopark on 2017. 2. 7..
 */

var workoutsTag = document.querySelector(".workouts");
var workoutLists = workoutsTag.children;
//----------------------calendar------------------------------------


var date;
var calendar = document.querySelector(".calendar");
calendar.addEventListener("change",function(){
   date = calendar.value;
   if(localStorage.getItem(date)/*변수로 담으슈*/ === null){
       workoutsTag.innerHTML = "";
   }else if(!!localStorage.getItem(date)){
       var stringType = localStorage.getItem(date);
       var objData = JSON.parse(stringType);
       workoutsTag.innerHTML = objData.workoutsContent;
   }
});




//------------------------add button--------------------------------

var workoutPrompt = function() {
    var inputVal = prompt("Enter Workout", "Enter Workout");
    //Creates <li>node containing input value user typed
    var newWorkout = document.createElement("li");
    newWorkout.innerHTML = inputVal;
    newWorkout.className = "workoutLists";


    for(var i = 0; i < workoutLists.length; i++) {
        if (inputVal === workoutLists[i].textContent/*indexof 로 있는지없는지 확인할것*/) {
            alert("Same workout exist");
            return;
        }
    }workoutsTag.appendChild(newWorkout);
};


//-----------------When clicked one of the workout lists---------------------

// ***********when clicked should change back color***************

var clickedWorkout;
var selectedNode;


workoutsTag.addEventListener("click",function(evt){
    selectedNode = evt.target;
    clickedWorkout = evt.target.innerHTML;
    var specificWorkout = date+clickedWorkout;
    var data = JSON.parse(localStorage.getItem(date));
    if(data) {
        if (data[specificWorkout] === undefined) {
            weightRepLists.innerHTML = "";
        } else if (!!data[specificWorkout]) {
            weightRepLists.innerHTML = data[specificWorkout];
        }
    }else{
        weightRepLists.innerHTML = "";
    }
});


//-------------------------save button--------------------------------
var dateValue = {};
function storeLists(){
    //workoutData is string type
    var workoutsContent = workoutsTag.innerHTML;
    if(workoutsContent === ""){
        localStorage.removeItem(date);
    }else if(!!workoutsContent) {
        dateValue["workoutsContent"] = workoutsContent;
        var stringType = JSON.stringify(dateValue);
        localStorage.setItem(date, stringType);
    }
}


//---------------------weight,rep add button-----------------------------
var weightRepLists = document.querySelector(".weightRepLists");
var weight = document.querySelector("#weight");
var rep = document.querySelector("#rep");
var volumeContainer = [];  //리스트 최신화필요함

function weightRepAdd(){
    var newWeightRep = document.createElement("li");
    newWeightRep.innerHTML = "["+weight.value+" Kg x "+rep.value+" Rep]<button type = 'button' class = 'deleteWeightRep'>-</button>"
    weightRepLists.appendChild(newWeightRep);
    volumeContainer.push((weight.value) * (rep.value));
    console.log(volumeContainer);

}

//-------------------weight,rep save button-------------------------------

function storeVolume(){
    var specificWorkout = date+clickedWorkout;
    var specificWorkoutValue = specificWorkout+"Volume";
    var latestData = JSON.parse(localStorage.getItem(date));
    latestData[specificWorkout] = weightRepLists.innerHTML;

    //localStorage.setItem(date+clickedWorkout,weightRepLists.innerHTML); HTML contents

    if(volumeContainer[0] !== undefined) {
        var totalVolume = volumeContainer.reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
        });
        latestData[specificWorkoutValue] = totalVolume;
    }
    localStorage.setItem(date,JSON.stringify(latestData));
    volumeContainer = [];
}

/* Delete workout 버튼 클릭시 초기화면으로 돌아와야되고
workout list 에 있는 노드제거는 물론 그 노드의 data까지 다 삭제해야됨*/

//----------------------delete workout button-----------------------------

function DeleteWorkout(){
    if(selectedNode.className === "workoutLists"){
        workoutsTag.removeChild(selectedNode);
    }else{}
    localStorage.removeItem(date);
    weightRepLists.innerHTML = "";
}

//---------------------delete Kg Rep button---------------------------------
// delegation 잘 사용하쇼********************************
weightRepLists.addEventListener("click",function(e){
    if(e.target.className === "deleteWeightRep"){
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    }
});

//----------------------------------------------------------------------------

//해당 운동의 볼륨만 나타내줄줄 알아야함
function getVolumes(arrOfDate, arr){
    for(var i = 0; i < arrOfDate.length; i++){
        var data = localStorage.getItem(arrOfDate[i]);
        var parsedData = JSON.parse(data);
        var volume = parsedData[arrOfDate[i]+clickedWorkout+"Volume"];
        if(!!volume) {
            arr.push(volume)
        }
    }
}

function dailyGraph() {
    var volumesByDate = [];
    var dates = Object.keys(localStorage);
    getVolumes(dates,volumesByDate);
    console.log(volumesByDate);
    console.log(dates);

    new Chartist.Line('.ct-chart2', {
        labels: dates,
        series: [volumesByDate]
    }, {
        low: 0,
        showArea: true,
        width: 300,
        height: 200

    });
}

//html script 불러오는 순서 중요함

