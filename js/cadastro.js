const api = axios.create({
    baseURL: "http://localhost:5555",
})

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function saveLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function createUser() {
    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password2").value;
    const form = {
        name: name,
        email: email,
        password: password,
    };

    api
    .post("/usuarios", form)
    .then((res) => {
      alert('Usuário cadastrado!');
      location.href = "./index.html";
      console.log(response.data.usuario)
      saveLocalStorage("logado", response.data.usuario);
    })
}