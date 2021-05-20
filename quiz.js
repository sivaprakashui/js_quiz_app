/*creating a question array -->each object in this array will have a key value pair */
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
    /*to check whether the user reached the last question */
    var last_index_of_questions = question.length - 1
    /*if user reached the end of the quit */
    if (current_question === last_index_of_questions) {
        alert('you have answered all questions')
        calculateQuizResult()
        displayResult()

        return
    }
    /*increase the current question index */
    current_question++
    /*create a variable and make a reference to question-div from html file */
    var question_div = document.getElementById('question-div')
    /*remove any HTML code from question-div before displaying a new question */
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
    /*this is gonna return the array of all answers (p tags)*/
    var answers = document.getElementsByClassName('answer')
    /*console.log(answers)*/
    /*looping and adding EventListeners*/
    for (var i = 0; i < answers.length; i++) {
        answers[i].addEventListener('mouseover', changeAnswerBackgroundColor)
        answers[i].addEventListener('mouseout', changeAnswerBackgroundColor)
        answers[i].addEventListener('click', selectAnswer)
    }
    function changeAnswerBackgroundColor(e) {
        /* if the background color is not white --> there is a another color*/
        if (e.target.style.background === 'yellow') {
        } else if (e.target.style.backgroundColor !== '') {
            e.target.style.backgroundColor = ''
            /*if there is no color add your color */
        } else {
            e.target.style.backgroundColor = 'purple'
        }
    }

    function selectAnswer(e) {
        /*get the question id and store it in the user_answer array */
        var question_id = parseInt(document.getElementById('question-id').innerHTML.trim())
        /*parseInt is going to convert string to integer because question_id must be a integer */

        /*get user answer from each element which is clicked by a user  */
        var user_answer = e.target.innerHTML
        /*store user answer in the question array */
        question[question_id].user_answer = user_answer
        /*alert(user_answer)*/
        /*Create a function to remove from all answers */
        removeBackgroundColorFromAllAnswers()
        /*change the background color of the selected answer */
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
        /*if the user answered correctly for this question */
        if (correct_answer === user_answer) {
            /*giving user a point */
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
