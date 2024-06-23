document.addEventListener("DOMContentLoaded", function () {
  const cardsData = [
    {
      imgSrc: "assets/images/app1.jpg",
      title: "App 1",
      description: "Description of App 1",
      link: "pages/app1.html"
    },
    {
      imgSrc: "assets/images/app2.jpg",
      title: "App 2",
      description: "Description of App 2",
      link: "pages/app2.html"
    },
    {
      imgSrc: "assets/images/form-validation.png",
      title: "Form Validation",
      description: "Form validation ensures the data submitted through a web form meets specific criteria before being sent to a server.",
      link: "pages/form-validation.html"
    }
    // Add more cards data as needed
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
