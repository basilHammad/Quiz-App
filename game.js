const questionCont = document.getElementById("question");
const choicesCont = document.querySelectorAll(".choices div");
const scoreCont = document.querySelector(".score span");
const questionNumCont = document.querySelector(".question-num-cont h3 span");
const counter = document.querySelector(".counter");
let score = 0;
let counterWidth = 0;
let questionCounter = 0;
const maxQuestionsNum = 10;

fetch("./questions.json")
  .then((resp) => resp.json())
  .then((data) => {
    const questons = data.results;
    let currentQuestions = {};
    let availableQuestions = [...questons];

    pickNewQustion = () => {
      if (
        availableQuestions.length === 0 ||
        questionCounter === maxQuestionsNum
      ) {
        localStorage.setItem('recntScore' , score)
        window.location.assign('end.html')
      } else {
        const randomQuestionIndex = Math.floor(
          Math.random() * availableQuestions.length
        );
        const question = availableQuestions[randomQuestionIndex];
        currentQuestions = question;
        availableQuestions.splice(randomQuestionIndex, 1);
        let choices = [...question.incorrect_answers];
        choices.push(question.correct_answer);
        choices.sort();
        questionCont.innerText = question.question;
        questionCounter++;
        counterWidth += 10;
        counter.style.setProperty("width", `${counterWidth}%`);
        questionNumCont.innerText = `${questionCounter}/${maxQuestionsNum}`;

        choicesCont.forEach((cont, i) => {
          cont.innerText = choices[i];
        });
      }
    };

    pickNewQustion();

    choicesCont.forEach((cont) => {
      cont.addEventListener("click", (e) => {
        if (e.target.innerText === currentQuestions.correct_answer) {
          score += 10;
          scoreCont.innerText = score;

          choicesCont.forEach((div) => {
            div.classList.add("stop");
          });

          e.target.style.setProperty("background-color", "green");

          setTimeout(() => {
            e.target.style.setProperty("background-color", "#6CBEED");
            choicesCont.forEach((div) => {
              div.classList.remove("stop");
            });
            pickNewQustion();
          }, 500);
        } else {
          e.target.style.setProperty("background-color", "red");

          choicesCont.forEach((div) => {
            div.classList.add("stop");
          });

          setTimeout(() => {
            e.target.style.setProperty("background-color", "#6CBEED");

            choicesCont.forEach((div) => {
              div.classList.remove("stop");
            });

            pickNewQustion();
          }, 500);
        }
      });
    });
  })
  .catch((err) => {
    console.log("error");
  });
