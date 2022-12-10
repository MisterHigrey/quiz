const questions = [
  {
    question: "What language works in the browser?`",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "What does CSS mean?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 2,
  },
  {
    question: "What does HTML mean?",
    answers: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    correct: 1,
  },
  {
    question: "When JS was created??",
    answers: ["1996", "1995", "1994", "all answers is wrong"],
    correct: 2,
  },
];

const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

function showQuestion() {
  const headerTemplate = `<h2 class="title">${questions[questionIndex]["question"]}</h2>`;
  headerContainer.innerHTML = headerTemplate;

  let answerNum = 1;
  for (answerText of questions[questionIndex]["answers"]) {
    const questionTemplate = `<li>
	<label>
	  <input value="${answerNum}" type="radio" class="answer" name="answer" />
	  <span>${answerText}</span>
	</label>
  </li>`;
    listContainer.innerHTML += questionTemplate;
    answerNum++;
  }
}

function checkAnswer() {
  const checkedRadio = listContainer.querySelector(
    'input[type="radio"]:checked'
  );
  if (!checkedRadio) {
    submitBtn.blur();
    return;
  }

  const userAnswer = parseInt(checkedRadio.value);

  if (userAnswer === questions[questionIndex]["correct"]) {
    score++;
  }
  if (questionIndex !== questions.length - 1) {
    console.log("This is not last question");
    questionIndex++;
    clearPage();
    showQuestion();
    return;
  } else {
    console.log("This is the last question");
    clearPage();
    showResults();
  }
}

function showResults() {
  let title, message;
  if (score === questions.length) {
    title = "Congratulations 🤩";
    message = "U answered all the questions correctly 🥳";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Not bad 🤓";
    message = "U answered most of the question correctly 🤩";
  } else {
    title = "Attention, please ‼️";
    message = '"U answered less of the question correctly';
  }

  let result = `${score} of ${questions.length}`;

  const resultsTemplate = `        
  <h2 class="title">${title}</h2>
  <h3 class="summary">${message}</h3>
  <p class="result">${result}</p>`;

  headerContainer.innerHTML = resultsTemplate;

  submitBtn.blur();
  submitBtn.innerText = "Restart quiz";
  submitBtn.onclick = () => history.go();
}
