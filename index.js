'use strict';

let questionNumber = 0;
let score = 0;

// Question pool and answers
const QUESTIONS = [
   {
      question: 'What technology is used to record cryptocurrency transactions?',
      answers: {
         a: 'Digital wallet',
         b: 'Mining',
         c: 'Blockchain',
         d: 'Token'
      },
      correctAnswer: 'Blockchain'
   },
   {
      question: 'What tool would you use to reduce the digital image size?',
      answers: {
         a: 'Filter',
         b: 'Brush',
         c: 'Rotate',
         d: 'Crop'
      },
      correctAnswer: 'Crop'
   },
   {
      question: 'What kind of malware is designed to take advantage of a security hole before it is known?',
      answers: {
         a: 'Zero-day exploit',
         b: 'Virus',
         c: 'Ransomware',
         d: 'Trojan horse'
      },
      correctAnswer: 'Zero-day exploit'
   },
   {
      question: 'What does acronym FOSS stand for?',
      answers: {
         a: 'Free and Open-Source Software',
         b: 'Full Option Sensor System',
         c: 'Follow-On Support Service',
         d: 'Fiber Optics Science System'
      },
      correctAnswer: 'Free and Open-Source Software'
   },
   {
      question: 'What does it mean to uncloud?',
      answers: {
         a: 'Organize cloud storage',
         b: 'Remove all files from the cloud',
         c: 'Print a file from the cloud',
         d: 'Delete a cloud service account'
      },
      correctAnswer: 'Organize cloud storage'
   },
   {
      question: 'What is a container?',
      answers: {
         a: 'A way of shipping things',
         b: 'A device to store things in your garage',
         c: 'Standard unit of software that packages up code and all its dependencies',
         d: 'Application management'
      },
      correctAnswer: 'Standard unit of software that packages up code and all its dependencies'
   },
   {
      question: 'What technology is used to make telephone calls over the Internet possible?',
      answers: {
         a: 'Bluetooth',
         b: 'Ethernet',
         c: 'NFC',
         d: 'VoIP'
      },
      correctAnswer: 'VoIP'
   },   
   {
      question: 'Which of the following is not stored as a file?',
      answers : {
         a: 'Archive',
         b: 'Document',
         c: 'Video',
         d: 'Folder'
      },
      correctAnswer: 'Folder'
   },
   {
      question: 'What programming language are you learning in this course?',
      answers: {
         a: 'Java',
         b: 'Python',
         c: 'JavaScript',
         d: 'ECMA'
      },
      correctAnswer: 'JavaScript'
   },
   {
      question: 'Which direction does JQuery closest method traverse the DOM?',
      answers: {
         a: 'Down',
         b: 'Left',
         c: 'Up',
         d: 'Right'
      },
      correctAnswer: 'Up'
   }
];

// Generate questions based on QUESTIONS repository
function generateQuestionsElement(questionList){
   if(questionNumber < QUESTIONS.length){   
      return `
         <h1>${questionList.question}</h1>
         <form action="" method="get" class="questions_form">
            <label for="option" class="options option-1">
               <input type="radio" name="option" value="${questionList.answers.a}" required>
               <span>${questionList.answers.a}</span>
            </label>
            <label for="option" class="options option-2">
               <input type="radio" name="option" vale="${questionList.answers.b}" required>
               <span>${questionList.answers.b}</span>
            </label>
            <label for="option" class="options option-3">
               <input type="radio" name="option" value="${questionList.answers.c}" required>
               <span>${questionList.answers.c}</span>
            </label>
            <label for="option" class="options option-4">
               <input type="radio" name="option" value="${questionList.answers.d}" required>
               <span>${questionList.answers.d}</span>
            </label>
            <button type="submit" role="button" aria-label="question submit button" aria-pressed="false" class="btn">Submit</button>
         </form>`;
   } else {
      retakeQuiz();
   }   
}

function startQuiz(){
   $('.navbar').find('a').addClass('hidden'); // don't display question and score
   $('.start_btn').on('click', function(event){
      //prevent page default
      event.preventDefault();
      $('.intro').addClass('hidden'); // remove introduction page 
      $('.navbar').find('a').removeClass('hidden'); // display question number and score
      //On click add first question to the screen;
      generateQuestionList();
   });
}

function generateQuestionList(){
   const questionList = QUESTIONS[questionNumber];
   const questions = generateQuestionsElement(questionList);
   $('.js_questionsForm').html(questions);
   checkUserAnswer();
   changeQuestionNumber();
}

function changeQuestionNumber(){
   questionNumber++;
   $('.js_question_count').find('span').text(`${questionNumber} / ${QUESTIONS.length}`);
}

function changeScore(){
   score++;
   $('.js_score_count').find('span').text(`${score}`);
}

function nextQuestion(){
   $('.js_next_question').on('click', function(event){
      generateQuestionList();
   });
}

function checkUserAnswer(){
   $('form').on('submit', function(event) {
      event.preventDefault();
      let userSelected = $('input:checked');
      let usersAnswer = userSelected.val();
      let correctAnswer = `${QUESTIONS[questionNumber - 1].correctAnswer}`;
      if(usersAnswer.toLowerCase() === correctAnswer.toLowerCase()){
         $('.js_questionsForm').html(displayCorrectFeedBackPage);
         changeScore();
         nextQuestion();
      } else {
         $('.js_questionsForm').html(displayIncorrectFeedBackPage);
         nextQuestion();         
      }
   });
}

function displayCorrectFeedBackPage(){
   return `
      <div class="correct">
         <img src="https://i.ibb.co/9Yjhqhr/Green-Check-Mark.jpg" alt="check mark">
         <p>Congrats, You got that right</p>
         <form>
            <button role="button" aria-label="next question" aria-pressed="false" class="btn js_next_question">Next Question</button>
         </form>
      </div>`;
}

function displayIncorrectFeedBackPage(){
   return `
      <div class="correct">
         <img src="https://banner2.kisspng.com/20180223/hcw/kisspng-ico-font-awesome-scalable-vector-graphics-icon-red-x-word-no-vector-material-5a90eae643c105.9898124415194467582775.jpg" alt="red x">
         <p>Sorry but that isn't correct.</p>
         <p>The correct answer is: ${QUESTIONS[questionNumber - 1].correctAnswer}.</p>
         <button role="button" aria-label="next question" aria-pressed="false" class="btn js_next_question">Next Question</button>
      </div>`;
}

function retakeQuiz(){
   $('.navbar').find('a').addClass('hidden');
   $('.js_questionsForm').html(renderResults);
   $('main').on('click', '.js_retake', function(event) {
      location.reload();
    });
}

function renderResults(){
   if(score > 7){
      return `
         <div class="correct">
            <img src="https://i.ibb.co/RyBxMxJ/Smiling-Face-Emoji-large.png" alt="smiley face">
            <p>You did great!!!</p>
            <p>You were able to to get ${score} out of ${QUESTIONS.length} questions correct</p>
            <form>
               <button role="button" aria-label="next question" aria-pressed="false" class="btn js_retake">Retake Quiz</button>
            </form>
         </div>`;
   } else {
      return `
         <div class="correct">
            <img src="https://i.ibb.co/Cht6fsy/Sad-Face-Emoji-large.png" alt="sad face">
            <p>Better Luck Next Time</p>
            <p>You only got ${score} out of ${QUESTIONS.length} questions correct</p>
            <form>
               <button role="button" aria-label="next question" aria-pressed="false" class="btn js_retake">Retake Quiz</button>
            </form>
         </div>`;
   }
   
}

$(startQuiz);