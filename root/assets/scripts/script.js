document.addEventListener("DOMContentLoaded", function () {
  const cardsData = [
    {
      imgSrc: "assets/images/age-calculator/ageicon.jpg",
      title: "Age Calculator",
      description: "Calculates the age of an user.",
      link: "pages/age-calculator.html"
    },
    {
      imgSrc: "assets/images/calculator/calculatoricon.jpg",
      title: "Calculator",
      description: "A simple calculator",
      link: "pages/calculator.html"
    },
    {
      imgSrc: "assets/images/form-validation/form-validation.png",
      title: "Form Validation",
      description: "Form validation ensures the data submitted through a web form meets specific criteria before being sent to a server.",
      link: "pages/form-validation.html"
    },
    {
      imgSrc: "assets/images/mini-calendar/minicalendar.jpg",
      title: "Mini Calendar",
      description: "Calendar which shows today's date.",
      link: "pages/mini-calendar.html"
    },
    {
      imgSrc: "assets/images/music-player/musicplayer.jpg",
      title: "Music Player",
      description: "Music Player which plays Despacito song",
      link: "pages/music-player.html"
    },
    {
      imgSrc: "assets/images/password-generator/pass.png",
      title: "Password Generator",
      description: "Generates a random password",
      link: "pages/password-generator.html"
    },
  ]

  const cardsContainer = document.getElementById("cards-container")

  cardsData.forEach(card => {
    const cardElement = document.createElement("div")
    cardElement.classList.add("card")

    cardElement.innerHTML = `
            <img src="${card.imgSrc}" alt="${card.title}">
            <div class="card-content">
                <h2>${card.title}</h2>
                <p>${card.description}</p>
                <a href="${card.link}" class="button">Go to ${card.title}</a>
            </div>
        `

    cardsContainer.appendChild(cardElement)
  })
})
