const userName = document.querySelector("input");
const btn = document.getElementById("save");

const recentScore = JSON.parse(localStorage.getItem("recntScore")) || [];
const leaderBoard = JSON.parse(localStorage.getItem("highScores")) || [];

btn.onclick = () => {
  if (userName.value === "") {
    userName.classList.add("required");
    userName.focus();
  } else {
    const newUser = {
      name: userName.value,
      score: recentScore,
    };

    leaderBoard.push(newUser);
    leaderBoard.sort((a, b) => b.score - a.score).splice(5);
    localStorage.setItem("highScores", JSON.stringify(leaderBoard));
    window.location.assign("home.html");
  }
};
