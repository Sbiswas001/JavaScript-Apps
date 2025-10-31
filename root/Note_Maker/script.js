const quotes = [
  { quote: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { quote: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
  { quote: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
  { quote: "If you are working on something exciting, it will keep you motivated.", author: "Steve Jobs" },
  { quote: "Success is not in what you have, but who you are.", author: "Bo Bennett" },
  { quote: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt" },
  { quote: "Do what you can with all you have, wherever you are.", author: "Theodore Roosevelt" },
  { quote: "Everything you can imagine is real.", author: "Pablo Picasso" },
  { quote: "What we think, we become.", author: "Buddha" },
  { quote: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { quote: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
  { quote: "Believe in yourself and all that you are.", author: "Christian D. Larson" },
  { quote: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
  { quote: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { quote: "Your time is limited, don’t waste it living someone else’s life.", author: "Steve Jobs" },
  { quote: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" },
  { quote: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
  { quote: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { quote: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
  { quote: "Do not wait to strike till the iron is hot; but make it hot by striking.", author: "William Butler Yeats" },
  { quote: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
  { quote: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { quote: "Act as if what you do makes a difference. It does.", author: "William James" },
  { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { quote: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { quote: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde" },
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { quote: "We cannot solve our problems with the same thinking we used when we created them.", author: "Albert Einstein" },
  { quote: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { quote: "Doubt kills more dreams than failure ever will.", author: "Suzy Kassem" },
  { quote: "You are never too old to set another goal or to dream a new dream.", author: "C. S. Lewis" },
  { quote: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { quote: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
  { quote: "Change your thoughts and you change your world.", author: "Norman Vincent Peale" },
  { quote: "Do what you feel in your heart to be right, for you’ll be criticized anyway.", author: "Eleanor Roosevelt" }
];

const gradients = [
  "linear-gradient(135deg, #67b26f, #4ca2cd)",
  "linear-gradient(120deg, #a1c4fd, #c2e9fb)",
  "linear-gradient(120deg, #f093fb, #f5576c)",
  "linear-gradient(135deg, #ffecd2, #fcb69f)",
  "linear-gradient(120deg, #30cfd0, #330867)",
  "linear-gradient(140deg, #fffbd5, #b20a2c)",
  "linear-gradient(135deg, #fc00ff, #00dbde)",
  "linear-gradient(100deg, #a8edea, #fed6e3)",
  "linear-gradient(135deg, #ee9ca7, #ffdde1)",
  "linear-gradient(120deg, #614385, #516395)",
  "linear-gradient(135deg, #e0c3fc, #8ec5fc)",
  "linear-gradient(120deg, #ff6a00, #ee0979)",
  "linear-gradient(135deg, #43cea2, #185a9d)",
  "linear-gradient(120deg, #f7971e, #ffd200)",
  "linear-gradient(135deg, #485563, #29323c)",
  "linear-gradient(120deg, #de6161, #2657eb)",
  "linear-gradient(132deg, #11998e, #38ef7d)",
  "linear-gradient(120deg, #ff758c, #ff7eb3)",
  "linear-gradient(135deg, #1e3c72, #2a5298)",
  "linear-gradient(120deg, #4568dc, #b06ab3)"
];

const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const quoteCard = document.getElementById('single-quote-item');
const showHistoryBtn = document.getElementById('show-history');
const closeHistoryBtn = document.getElementById('close-history');
const historySidebar = document.getElementById('history-sidebar');
const historyList = document.getElementById('history-list');
const themeToggleBtn = document.getElementById('theme-toggle');
const copyQuoteBtn = document.getElementById('copy-quote');
const screenshotQuoteBtn = document.getElementById('screenshot-quote');
const toggleAuthorBtn = document.getElementById('toggle-author');

let history = [];
let authorVisible = true;

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}
function getRandomGradient() {
  const idx = Math.floor(Math.random() * gradients.length);
  return gradients[idx];
}
function setRandomBg() {
  document.body.style.background = getRandomGradient();
}
function displayQuote() {
  const q = getRandomQuote();
  quoteText.textContent = `"${q.quote}"`;
  authorText.textContent = `- ${q.author}`;
  setRandomBg();
  history.push({quote: q.quote, author: q.author});
}
function renderHistory() {
  historyList.innerHTML = '';
  [...history].reverse().forEach(entry => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerHTML = `"${entry.quote}" <span style='color:#888;'>- ${entry.author}</span>`;
    historyList.appendChild(li);
  });
}
function openHistorySidebar() {
  renderHistory();
  historySidebar.style.display = 'flex';
}
function closeHistorySidebar() {
  historySidebar.style.display = 'none';
}
function toggleTheme() {
  document.body.classList.toggle('dark');
  // save preference
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}
function copyQuoteToClipboard() {
  const text = `${quoteText.textContent} ${authorText.textContent}`.trim();
  navigator.clipboard.writeText(text).then(() => {
    copyQuoteBtn.classList.add('copied');
    copyQuoteBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyQuoteBtn.classList.remove('copied');
      copyQuoteBtn.textContent = 'Copy';
    }, 1000);
  });
}
function takeQuoteScreenshot() {
  if (window.html2canvas) {
    const prevBg = quoteCard.style.background;
    const randomGradient = getRandomGradient();
    quoteCard.style.background = randomGradient;
    html2canvas(quoteCard, {
      backgroundColor: null,
      useCORS: true
    }).then(canvas => {
      quoteCard.style.background = prevBg;
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'quote.png';
      link.click();
    });
  }
}
function toggleAuthor() {
  authorVisible = !authorVisible;
  authorText.style.display = authorVisible ? '' : 'none';
  toggleAuthorBtn.textContent = authorVisible ? 'Hide Author' : 'Show Author';
  if (authorVisible) {
    toggleAuthorBtn.classList.remove('author-hidden');
  } else {
    toggleAuthorBtn.classList.add('author-hidden');
  }
}

window.onload = function() {
  // Load stored theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');
  displayQuote();
  authorText.style.display = authorVisible ? '' : 'none';
}
newQuoteBtn.addEventListener('click', displayQuote);
showHistoryBtn.addEventListener('click', openHistorySidebar);
closeHistoryBtn.addEventListener('click', closeHistorySidebar);
themeToggleBtn.addEventListener('click', toggleTheme);
copyQuoteBtn.addEventListener('click', copyQuoteToClipboard);
screenshotQuoteBtn.addEventListener('click', takeQuoteScreenshot);
toggleAuthorBtn.addEventListener('click', toggleAuthor);
