let enviar = document.getElementById("enviar");

enviar.addEventListener("click", function (e) {
  e.preventDefault();
  let nombre = document.getElementById("nombre").value;
  let email = document.getElementById("mail").value;
  let exp = document.getElementById("experiencia").value;
  let pass = document.getElementById("pass").value;
  let espc = document.getElementById("especialidad").value;
  let file = document.getElementById("file").files[0];

  const formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("email", email);
  formData.append("exp", exp);
  formData.append("pass", pass);
  formData.append("espc", espc);
  formData.append("file", file);

  fetch("/register", {
    method: "POST",
    body: formData,
  }).then((res) => {
    if (res.status === 200) {
      alert(`Skater ${nombre} registrado con éxito`);
      window.location.href = "/login";
    } else {
      console.log("Error");
    }
  });
});



