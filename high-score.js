const ul = document.querySelector(".high-scores");
const leaderBoardCont = document.querySelector(".leader-board");

console.log(ul);

const leaderBoard = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(leaderBoard);

ul.innerHTML = leaderBoard
    .map((user) => {
      return `<li>${user.name}<span>score : ${user.score}</span> </li>`;
    })
    .join("");