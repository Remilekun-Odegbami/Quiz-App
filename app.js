const startBox = document.querySelector(".start-box");
const startBtn = document.querySelector(".start-btn .start");
const infoBox = document.querySelector(".info-box");
const quitBtn = infoBox.querySelector(".btns .quit");
const continueBtn = infoBox.querySelector(".btns .restart");
const contactBox = document.querySelector('.contact-box');
const contactBtn = document.querySelector("#contact")
const quizBox = document.querySelector('.quiz-box');
const nextBtn = document.querySelector(".quiz-box .next-btn");
const queCounter = quizBox.querySelector(".total-que");
const queText = document.querySelector(".que-text");
const optionList = document.querySelector(".option-list");
const hint = document.querySelector(".hint");


//if start Quiz is clicked

startBtn.onclick = ()=> {
   infoBox.classList.add("activeInfo"); //show the info box
   startBox.classList.remove("activeStart")
}

quitBtn.onclick = ()=> {
   infoBox.classList.remove("activeInfo"); //hide the info box
}

//if contactBtn is clicked
contactBtn.onclick = ()=> {
    infoBox.classList.remove('activeInfo');
    contactBox.classList.add("activeContact"); 
}

// if continue btn is clicked
continueBtn.onclick = () => {
    infoBox.classList.remove('activeInfo');
    startBox.classList.remove("activeStart")
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    totalQueCount(1);
   
}

let queCount = 0; //questions from the Questions array in question.js
let queNum = 1;

//If Next btn is clicked
nextBtn.onclick = () => {
    
    if(queCount < questions.length -1) {
        queCount++;
        queNum++;
        showQuestions(queCount);
        totalQueCount(queNum);
        hint.classList.add("disabled")
        
    } else {
        alert("Questions completed!")
    }
}

function totalQueCount(index) {
    let questionCountTag = '<span><p>'+ queNum + '</p> of <p>' + questions.length + '</p> Questions </span>'
    queCounter.innerHTML = questionCountTag;
}


function showQuestions(index){
   
    let queTag = '<span>' + questions[index].num + ". " + questions[index].question + '</span>';
    let optionTag = '<div class="option"> <span> '+ questions[index].options[0] + '</span></div>'
                    + '<div class="option"> <span> '+ questions[index].options[1] + '</span></div>'
                    + '<div class="option"> <span> '+ questions[index].options[2] + '</span></div>'
                    + '<div class="option"> <span> '+ questions[index].options[3] + '</span></div>';

    queText.innerHTML = queTag; 
    optionList.innerHTML = optionTag; 
    const option = optionList.querySelectorAll(".option");
  
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)")
        }
 

}  


function optionSelected(answer){
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    let allOptions = optionList.children.length;
    let allHint = hint.children.length;
    
    if(userAns.trim() == correctAns.trim()){
        answer.classList.add("correct")
        console.log(" answer is correct");

    hint.innerHTML = '<span>' + 'You are correct! \n' + questions[queCount].hint + '</span>'
    }else {
        answer.classList.add("correct")
        answer.classList.add("incorrect")
        console.log("wrong");
         hint.innerHTML = '<span>' + 'You are wrong! \n' + questions[queCount].hint + '</span>'
    }

    // Automatically select correct answer if answer is incorrect
     for (let i = 0; i < allOptions; i++) {
       if(optionList.children[i].textContent == correctAns){
        optionList.children[i].setAttribute("class", "option correct");
       }
     }

// To disable all options
for(let i = 0; i < allOptions.length; i++) {
    optionList.children[i].classList.add("disabled");
    for(let j = 0; j < allHint.length; j++){
        hint.children[j].classList.add("disabled")
    }
    
}

}

