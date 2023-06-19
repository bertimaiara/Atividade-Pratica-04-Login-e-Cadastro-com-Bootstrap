const api = axios.create({
  baseURL: "http://localhost:5555",
});

const acessForm = document.getElementById("acess-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

acessForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Está logando!");

  const email = emailInput.value;
  const password = passwordInput.value;

  signIn(email, password);
});

function signIn(email, password) {
  api
    .post("/login", { email, password })
    .then((response) => {
      alert("Usuário logado!");
      location.href = "./mostrarRecados.html";
    })
    .catch((err) => {
      alert("Deu erro no login");
    });
}