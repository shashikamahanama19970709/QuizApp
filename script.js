//set quition

const questions=[
    {
        question:"Who invented the telephone?",
        answers:[
            {text:"Alexander Graham Bel",correct:true},
            {text:"Thomas Edison",correct:false},
            {text:"Isaac Newton",correct:false},
            {text:"Nikola Tesla",correct:false},

        ]
    },
    {
        question:" Who is the lead singer of the band Coldplay?",
        answers:[
            
            {text:"Dave Grohl",correct:false},
            {text:"Bono",correct:false},
            {text:"Chris Martin",correct:true},
            {text:"Justin Timberlake",correct:false},

        ]
    },
    {
        
        question:" What is the largest mammal in the world?",
        answers:[
           
            {text:"African elephant",correct:false},
            {text:"Blue whale",correct:true},
            {text:"Hippopotamus",correct:false},
            {text:"Gorilla",correct:false},

        ]
    },
    {
        question:" What is the smallest planet in our solar system?",
        answers:[
            {text:" Venus",correct:true},
            {text:"Mars",correct:false},
            {text:"Mercury",correct:false},
            {text:"Jupiter",correct:false},

        ]
    },
    {
        question:" Who is the author of the Harry Potter series?",
        answers:[
            
            {text:"Stephen King",correct:false},
            {text:"George R.R. Martin",correct:false},
            {text:"James Patterson",correct:false},
            {text:" J.K. Rowling",correct:true},

        ]
    }
];


const questionElement =document.getElementById("question");
const answerButtons =document.getElementById("answer-buttons");
const nextButton =document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();

}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1 ;
    questionElement.innerHTML = questionNo + "."+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct =answer.correct;
        }
        button.addEventListener("click",selectAnswer);



    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
//  chnging background color after select them
function selectAnswer(e){
    const selectedBtn= e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");

        score++;

    }else{
        selectedBtn.classList.add("incorrect");
    }
    // in here it disable to click more than once
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    //display next button
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML =` You scored ${score} out of ${questions.length}"!`;
    nextButton.innerHTML="play Again";
    nextButton.style.display= "block";

}

//if there is no onther next question then ishow the score
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();