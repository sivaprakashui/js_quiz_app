var question = [
    {},
    {
        q: 'What is the result of 2+2',
        a1: "It's 4",
        a2: "It's 5",
        a3: "Its's 6",
        a4: "It's 7",
        correct_answer: "It's 4",
        user_answer: ''
    },
    {
        q: 'What is the result of 3+3',
        a1: "It's 8",
        a2: "It's 6",
        a3: "Its's 9",
        a4: "It's 10",
        correct_answer: "It's 6",
        user_answer: ''
    },
    {
        q: 'What is the result of 1+0',
        a1: "It's 7",
        a2: "It's 5",
        a3: "It's 1",
        a4: "It's 7",
        correct_answer: "It's 1",
        user_answer: ''
    }
]

var current_question = 0
getNextQuestion()
function getNextQuestion() {
    var last_index_of_questions = question.length - 1
    if (current_question === last_index_of_questions) {
        alert('you have answered all questions')
        calculateQuizResult()
        displayResult()

        return
    }
    current_question++
    var question_div = document.getElementById('question-div')
    question_div.innerHTML = ''
    question_div.innerHTML =
        '<div class="card">' +
        '<div class="card-body">' +
        '<h5 class="card-title"></h5>' +
        '<p class="card-text"><span id="question-id">' +
        current_question +
        '</span> -' +
        question[current_question].q +
        '</p>' +
        '<hr />' +
        '<p class="answer">' +
        question[current_question].a1 +
        '</p>' +
        '<p class="answer">' +
        question[current_question].a2 +
        '</p>' +
        '<p class="answer">' +
        question[current_question].a3 +
        '</p>' +
        '<p class="answer">' +
        question[current_question].a4 +
        '</p>' +
        '<a href="#" onClick="getNextQuestion()" class="btn btn-primary">Next</a>' +
        '</div>' +
        '</div>'
    addEventListenersToElements()
}

function addEventListenersToElements() {
    var answers = document.getElementsByClassName('answer')
    /*console.log(answers)*/
    for (var i = 0; i < answers.length; i++) {
        answers[i].addEventListener('mouseover', changeAnswerBackgroundColor)
        answers[i].addEventListener('mouseout', changeAnswerBackgroundColor)
        answers[i].addEventListener('click', selectAnswer)
    }
    function changeAnswerBackgroundColor(e) {
        if (e.target.style.background === 'yellow') {
        } else if (e.target.style.backgroundColor !== '') {
            e.target.style.backgroundColor = ''
        } else {
            e.target.style.backgroundColor = 'purple'
        }
    }

    function selectAnswer(e) {
        var question_id = parseInt(document.getElementById('question-id').innerHTML.trim())

        var user_answer = e.target.innerHTML
        question[question_id].user_answer = user_answer
        /*alert(user_answer)*/
        removeBackgroundColorFromAllAnswers()
        e.target.style.background = 'yellow'
    }
    function removeBackgroundColorFromAllAnswers() {
        var answers = document.getElementsByClassName('answer')

        for (var i = 0; i < answers.length; i++) {
            answers[i].style.background = ''
        }
    }
}

function calculateQuizResult() {
    var points = 0
    for (var i = 1; i < question.length; i++) {
        var user_answer = question[i].user_answer.trim()
        var correct_answer = question[i].correct_answer.trim()

        if (correct_answer === user_answer) {
            points++
        }
    }
    return points
}

function displayResult() {
    var points = calculateQuizResult()
    var number_of_question = question.length - 1
    var percentage = (points / number_of_question) * 100
    var question_div = document.getElementById('question-div')
    question_div.innerHTML = ''
    question_div.innerHTML = '<div class="card result">' + '<div class="card-body">' + '<h5 class="card-title text-center">Your Result:' + percentage.toFixed(2) + '% </h5>' + '<hr />' + '</div>' + '</div>'
}

// function checkAnswer() {
//     if (answer !== '') {
//         document.getElementById('btn').disabled = true
//         alert('please click a answer')
//     }
// }
