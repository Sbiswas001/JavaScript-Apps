let loginForm = document.getElementById("loginForm")

loginForm.addEventListener("submit", e => {
  e.preventDefault()

  validateName()

  validatePhone()

  validateEmail()
})

function validateName() {
  var name = document.getElementById("contact-name").value

  if (name.length == 0 && !name.match(/^[A-Za-z]*\s{1}[A-Za-z]*&/)) {
    document.getElementById("contact-name").classList.add("is-invalid")
  } else {
    document.getElementById("contact-name").classList.remove("is-invalid")
    document.getElementById("contact-name").classList.add("is-valid")
  }
}

function validatePhone() {
  var phone = document.getElementById("contact-phone").value

  if (phone.length !== 10 && !phone.match(/^[0-9]{10}$/)) {
    document.getElementById("contact-phone").classList.add("is-invalid")
  } else {
    document.getElementById("contact-phone").classList.remove("is-invalid")
    document.getElementById("contact-phone").classList.add("is-valid")
  }
}

function validateEmail() {
  var email = document.getElementById("contact-email").value

  if (email.length !== 10 && !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    document.getElementById("contact-email").classList.add("is-invalid")
  } else {
    document.getElementById("contact-email").classList.remove("is-invalid")
    document.getElementById("contact-email").classList.add("is-valid")
  }
}
