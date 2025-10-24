<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PortaLytix | Student Portfolio Analyzer</title>
<style>
/* General Styles */
* { margin:0; padding:0; box-sizing:border-box; font-family:Arial, sans-serif; }
body { background:#f0f4f8; color:#333; line-height:1.6; }
.container { max-width:900px; margin:auto; padding:2rem; }
h1,h2,h3 { margin-bottom:1rem; }
a { text-decoration:none; }

/* Header */
header { background:#0f172a; color:#fff; padding:1rem 0; position:sticky; top:0; z-index:10; }
header h1 { text-align:center; margin-bottom:0.5rem; }
header nav { text-align:center; }
header nav a { color:#fff; margin:0 1rem; transition:0.3s; }
header nav a:hover { color:#38bdf8; }

/* About */
.about-container { display:flex; flex-wrap:wrap; align-items:center; gap:2rem; padding:4rem 0; }
.profile { width:150px; border-radius:50%; border:5px solid #38bdf8; }
.about-container div { flex:1; }

/* Skills */
.skills-container { display:flex; flex-direction:column; gap:1rem; max-width:500px; margin:auto;}
.skill span { font-weight:bold; }
.progress { background:#e0e0e0; border-radius:12px; overflow:hidden; }
.progress div { height:12px; background:#38bdf8; }

/* Projects */
.projects-container { display:flex; flex-wrap:wrap; gap:1.5rem; justify-content:center;}
.project-card { background:#fff; padding:1.5rem; border-radius:1rem; box-shadow:0 4px 10px rgba(0,0,0,0.1); width:260px; transition:0.3s;}
.project-card:hover { transform:translateY(-10px);}
.project-card a { color:#38bdf8; font-weight:bold; display:block; margin-top:0.5rem; }

/* Analyzer */
#analyzer input { width:80%; padding:0.5rem; margin:0.5rem 0; border-radius:6px; border:1px solid #ccc; }
#analyzer button { padding:0.7rem 1.5rem; border:none; background:#38bdf8; color:white; border-radius:6px; cursor:pointer; }
#analyzer button:hover { background:#0ea5e9; }
#output { margin-top:1rem; font-weight:bold; }

/* Contact */
#contact { background:#0f172a; color:#fff; padding:4rem 0; text-align:center;}
#contact a { color:#38bdf8; }

/* Footer */
footer { text-align:center; padding:2rem 0; background:#1e293b; color:#94a3b8; }

/* Responsive */
@media(max-width:768px){
    .about-container { flex-direction:column; text-align:center; }
    .profile { margin:auto; }
}
</style>
</head>
<body>

<header>
  <div class="container">
    <h1>👋 Hi, I'm Agnibesh</h1>
    <nav>
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#projects">Projects</a>
      <a href="#analyzer">Analyzer</a>
      <a href="#contact">Contact</a>
    </nav>
  </div>
</header>

<section id="about">
  <div class="container about-container">
    <img src="https://via.placeholder.com/150" alt="Profile" class="profile">
    <div>
      <h2>About Me</h2>
      <p>I'm a student developer building interactive and meaningful web projects. Passionate about coding, learning, and exploring modern web technologies.</p>
    </div>
  </div>
</section>

<section id="skills">
  <div class="container">
    <h2>Skills</h2>
    <div class="skills-container">
      <div class="skill"><span>HTML</span><div class="progress"><div style="width:90%"></div></div></div>
      <div class="skill"><span>CSS</span><div class="progress"><div style="width:85%"></div></div></div>
      <div class="skill"><span>JavaScript</span><div class="progress"><div style="width:80%"></div></div></div>
      <div class="skill"><span>React</span><div class="progress"><div style="width:70%"></div></div></div>
    </div>
  </div>
</section>

<section id="projects">
  <div class="container">
    <h2>Projects</h2>
    <div class="projects-container">
      <div class="project-card">
        <h3>Portfolio Website</h3>
        <p>Responsive portfolio website using HTML, CSS, JS.</p>
        <a href="#">View Code</a>
      </div>
      <div class="project-card">
        <h3>Weather App</h3>
        <p>Realtime weather forecast app using API.</p>
        <a href="#">View Code</a>
      </div>
      <div class="project-card">
        <h3>Student Portal</h3>
        <p>Dashboard to manage assignments and grades.</p>
        <a href="#">View Code</a>
      </div>
    </div>
  </div>
</section>

<section id="analyzer">
  <div class="container">
    <h2>Portfolio Analyzer</h2>
    <input type="text" id="name" placeholder="Your Name">
    <input type="text" id="skillsInput" placeholder="Skills (comma separated)">
    <input type="text" id="projectsInput" placeholder="Projects (comma separated)">
    <input type="text" id="achievementsInput" placeholder="Achievements (comma separated)">
    <button id="analyzeBtn">Analyze Portfolio</button>

    <div id="output"></div>
    <canvas id="portfolioChart" width="400" height="200"></canvas>
  </div>
</section>

<section id="contact">
  <div class="container">
    <h2>Contact Me</h2>
    <p>Email: <a href="mailto:agnibesh006@gmail.com">agnibesh006@gmail.com</a></p>
  </div>
</section>

<footer>
  <p>© 2025 Agnibesh Maity | Built with ❤️ HTML, CSS & JS</p>
</footer>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
// Smooth scroll
document.querySelectorAll('header nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

// Analyzer
document.getElementById('analyzeBtn').addEventListener('click', () => {
  const name = document.getElementById('name').value || "Student";
  const skills = document.getElementById('skillsInput').value.split(',').filter(s => s.trim());
  const projects = document.getElementById('projectsInput').value.split(',').filter(s => s.trim());
  const achievements = document.getElementById('achievementsInput').value.split(',').filter(s => s.trim());

  let score = skills.length*8 + projects.length*10 + achievements.length*12 + Math.floor(Math.random()*16);
  if(score>100) score=100;

  let feedback = "";
  if(score>85) feedback="🏆 Excellent portfolio!";
  else if(score>65) feedback="💪 Good portfolio, keep adding projects!";
  else feedback="🚀 Needs improvement, build more projects.";

  const output = document.getElementById('output');
  output.innerHTML = `
    Name: ${name}<br>
    Skills: ${skills.join(', ') || "None"}<br>
    Projects: ${projects.join(', ') || "None"}<br>
    Achievements: ${achievements.join(', ') || "None"}<br>
    Portfolio Score: ${score}/100<br>
    ${feedback}
  `;

  const ctx = document.getElementById('portfolioChart').getContext('2d');
  if(window.portfolioChart) window.portfolioChart.destroy();
  window.portfolioChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels:['Skills','Projects','Achievements'],
      datasets:[{ label:'Counts', data:[skills.length,projects.length,achievements.length], backgroundColor:['#38bdf8','#f72585','#3a0ca3'] }]
    },
    options:{ responsive:true, plugins:{legend:{display:false}} }
  });
});
</script>

</body>
</html>
