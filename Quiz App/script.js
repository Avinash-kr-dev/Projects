document.addEventListener('DOMContentLoaded', () => {

    const startBtn = document.getElementById('start-btn')
    const nextBtn = document.getElementById('next-btn')
    const restartBtn = document.getElementById('restart-btn')
    const questionContainer = document.getElementById('question-container')
    const questionText = document.getElementById('question-text')
    const choicesList = document.getElementById('choices-list')
    const resultContainer = document.getElementById('result-container')
    const scoreDisplay = document.getElementById('score')

    const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
      mark: 1,
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
      mark: 1,
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
      mark: 2,
    },
  ];


  let currentQuestionIndex = 0;
  let score = 0;
  let totalMarks = questions.reduce((total, question) => total + question.mark, 0);

  startBtn.addEventListener('click', startQuiz)

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showResult()
    }
  });

  restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0
    score = 0;
    totalMarks = questions.reduce((total, question) => total + question.mark, 0);
    resultContainer.classList.add("hidden")
    startQuiz()
  })


  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion()
  }

  function showQuestion(){
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = "" //clear previous choices
    questions[currentQuestionIndex].choices.forEach(choice => {
        const li = document.createElement("li")
        li.textContent = choice
        li.addEventListener("click", () => {
            selectAnswer(choice)
            li.classList.add("selected")
        } );
        choicesList.appendChild(li);
    });
  }

  function selectAnswer(choice){
    const correctAnswer = questions[currentQuestionIndex].answer
    const options = choicesList.querySelectorAll("li")

    options.forEach(option => {
        option.style.pointerEvents = "none" //disable further selection
    })


    if(choice === correctAnswer){
        score++
        totalMarks += questions[currentQuestionIndex].mark
    }
    nextBtn.classList.remove("hidden")
  };

  function showResult() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`
  }

});