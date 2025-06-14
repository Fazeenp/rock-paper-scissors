// Element references
const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const sci = document.getElementById('sci');
const reset = document.getElementById('reset');
const scoreSpace = document.querySelector('.score-space');
const resultSp = document.querySelector('.result-space');

// Emoji mapping
const emojiMap = {
  rock: "✊",
  paper: "🖐️",
  scissors: "✌️"
};

// Scorecard with persistent data
let scorecard = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreUI();

// Event listeners
rock.addEventListener('click', () => playRound('rock'));
paper.addEventListener('click', () => playRound('paper'));
sci.addEventListener('click', () => playRound('scissors'));
reset.addEventListener('click', resetGame);

// Main game function
function playRound(player) {
  const comp = getComputerChoice();

  let resultType = '';
  if (comp === player) {
    scorecard.ties++;
    resultType = "It's a draw! 🤝";
  } else if (
    (comp === 'rock' && player === 'scissors') ||
    (comp === 'paper' && player === 'rock') ||
    (comp === 'scissors' && player === 'paper')
  ) {
    scorecard.losses++;
    resultType = "You lose! 💻";
  } else {
    scorecard.wins++;
    resultType = "You win! 🎉";
  }

  localStorage.setItem('score', JSON.stringify(scorecard));

  resultSp.innerHTML = `
    <div class="emoji-battle">
      ${emojiMap[player]} <span class="vs">vs</span> ${emojiMap[comp]}
    </div>
    <div class="result-text">${resultType}</div>
  `;

  updateScoreUI();
}

// Random computer choice
function getComputerChoice() {
  const rand = Math.random();
  if (rand < 1 / 3) return 'rock';
  if (rand < 2 / 3) return 'paper';
  return 'scissors';
}

// Reset game state
function resetGame() {
  scorecard = { wins: 0, losses: 0, ties: 0 };
  localStorage.removeItem('score');
  resultSp.innerHTML = `<div class="result-text">Game reset. Ready to play!</div>`;
  updateScoreUI();
}

// Update score display
function updateScoreUI() {
  scoreSpace.innerText = `Wins: ${scorecard.wins} | Losses: ${scorecard.losses} | Ties: ${scorecard.ties}`;
}
