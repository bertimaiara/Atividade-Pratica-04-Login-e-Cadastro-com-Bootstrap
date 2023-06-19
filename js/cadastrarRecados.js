const cadastrarForm = document.getElementById("cadastrar-form");
const tituloInput = document.getElementById("titulo");
const descricaoInput = document.getElementById("descricao");

const api = axios.create({
  baseURL: "http://localhost:5555",
});

cadastrarForm.addEventListener("submit", function (ev) {
  ev.preventDefault();
  console.log("Enviou os dados...");

  const titulo = tituloInput.value;
  const descricao = descricaoInput.value;

  cadastrarRecado(titulo, descricao);
});

function cadastrarRecado(titulo, descricao) {
  api
    .post("/recados", { titulo, descricao })
    .then((response) => {
      alert("Recado cadastrado com sucesso!");
      location.href = "./mostrarRecados.html";
    })
    .catch((err) => {
      alert("Recado não cadastrado");
    });
}