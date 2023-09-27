
function generateTrivia() {
  const difficulty = document.getElementById("difficulty").value;
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  
  fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`)
    .then(response => response.json())
    .then(data => {
      const questions = data.results;
      const quizContainer = document.getElementById("quiz-container");
      const questionsDiv = document.getElementById("questions");
      
      quizContainer.style.display = "block";
      questionsDiv.innerHTML = "";
      
      questions.forEach((question, index) => {
        const questionElement = document.createElement("div");
        questionElement.id = `question-${index}`;
        questionElement.innerHTML = `<p><strong>${index + 1}. ${question.question}</strong></p>`;
        
        const options = question.incorrect_answers.concat(question.correct_answer);
        shuffleArray(options);
        
        options.forEach(option => {
          const optionElement = document.createElement("div");
          optionElement.className = "option";
          optionElement.innerHTML = `<input type="${type === 'boolean' ? 'radio' : 'checkbox'}" name="question-${index}" value="${option}"> ${option}`;
          questionElement.appendChild(optionElement);
        });
        
        questionsDiv.appendChild(questionElement);
      });
    });
}

function checkAnswers() {
  const questions = document.getElementById("questions").querySelectorAll("div[id^='question-']");
  let score = 0;
  
  questions.forEach(question => {
    const selectedOptions = question.querySelectorAll("input:checked");
    const isCorrect = selectedOptions.length > 0 && selectedOptions[selectedOptions.length - 1].value === question.querySelector("input[value$='true']").value;
    
    if (isCorrect) {
      score += 100;
      question.style.backgroundColor = "#dff0d8";
    } else {
      question.style.backgroundColor = "#f2dede";
    }
  });
  
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `<p>Puntaje final: ${score} puntos</p>`;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
