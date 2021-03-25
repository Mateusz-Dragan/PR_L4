setTimeout(function () {
    console.log('poczatek');
}, 0);

let preQuestions = null;

fetch('https://quiztai.herokuapp.com/api/quiz')
    .then(resp => resp.json())
    .then(resp => {
        preQuestions = resp;
        setQuestion(index);
    });


let next = document.querySelector('.next');

let question = document.querySelector('.question');
let answers = document.querySelectorAll('.list-group-item');

let pointsElem = document.querySelector('.score');
let restart = document.querySelector('.restart');
let index = 0;
let points = 0;

let games = localStorage.getItem('games');
let average = localStorage.getItem('average');

let pts = document.querySelector('.userScorePoint');
let ave = document.querySelector('.average');


function activateAnswers() {
    for (let i = 0; i < answers.length; i++) {
        answers[i].addEventListener('click', doAction);
    }
}

function disableAnswers() {
    for (let i = 0; i < answers.length; i++) {
        answers[i].removeEventListener('click', doAction);
    }
}

activateAnswers();

next.addEventListener('click', function () {
    index++;
    if (index < preQuestions.length){
        setQuestion(index);
        activateAnswers();
    }else{
        saveData();
        list.style.display = 'none';
        results.style.display = 'block';
    }
});

previous.addEventListener('click', function () {


    if (index > 0){
        index--;
        setQuestion(index);
        activateAnswers();
    }
});

function markCorrect(elem) {
    elem.classList.add('correct');
}

function markInCorrect(elem) {
    elem.classList.add('incorrect');
}

function clearClass() {
    for (let i = 0; i < answers.length; i++) {
        let elem = answers[i];

        if (elem.classList.contains('correct')) {
            elem.classList.remove('correct');
        }
        if (elem.classList.contains('incorrect')) {
            elem.classList.remove('incorrect');
        }
    }
}

function setQuestion(index) {
    clearClass();
    activateAnswers();
    question.innerHTML = preQuestions[index].question;

    if (preQuestions[index].answers.length === 2) {
        answers[2].style.display = 'none';
        answers[3].style.display = 'none';
    } else {
        answers[2].style.display = 'block';
        answers[3].style.display = 'block';
    }

    answers[0].innerHTML = preQuestions[index].answers[0];
    answers[1].innerHTML = preQuestions[index].answers[1];
    answers[2].innerHTML = preQuestions[index].answers[2];
    answers[3].innerHTML = preQuestions[index].answers[3];
}


function doAction(event) {
    //event.target - Zwraca referencję do elementu, do którego zdarzenie zostało pierwotnie wysłane.
    if (event.target.innerHTML === preQuestions[index].correct_answer) {
        points++;
        pointsElem.innerText = points;
        markCorrect(event.target);
    } else {
        markInCorrect(event.target);
    }
    disableAnswers();
}


restart.addEventListener('click', function (event) {
    event.preventDefault();

    index = 0;
    points = 0;
    let userScorePoint = document.querySelector('.score');
    userScorePoint.innerHTML = points;
    setQuestion(index);
    activateAnswers();
    list.style.display = 'block';
    results.style.display = 'none';
});

function saveData() {
    average *= games;
    average += points;
    games++;
    average = average / games;
    localStorage.setItem('games', games);
    localStorage.setItem('average', average);
}