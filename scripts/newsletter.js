let forms = document.querySelectorAll('.needs-validation')
Array.prototype.slice.call(forms)
  .forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      else {
        alert('Obrigado por se registrar em nossa newsletter!')
      }
      form.classList.add('was-validated')
    }, false)
  })