const api = axios.create({
    baseURL: "http://localhost:5555",
  });
  
  const recadosTable = document.getElementById("recados-table");
  const modalExcluir = new bootstrap.Modal("#modal-excluir", {});
  let idExcluir = null;
  
  async function buscarRecados() {
    const response = await api.get("/recados");
  
    if (response.status === 200) {
      const data = response.data;
  
      return data;
    } else {
      console.log("ERROR");
    }
  }
  
  async function mostrarRecados() {
    const data = await buscarRecados();
  
    const tableBody = recadosTable.children[1];
  
    data.forEach((item) => {
      tableBody.innerHTML += `
      <tr data-id-recado="${item.id}">
          <th scope="row">${item.id}</th>
          <td>${item.titulo}</td>
          <td>${item.descricao}</td>
          <td>
              <button type="button" class="btn btn-secondary me-3">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
              >
                  <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                  />
                  <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
              </svg>
              </button>
              <button
              type="button"
              class="btn btn-danger"
              data-id-recado="${item.id}"
              onclick="abrirModalExcluir(this)"
              >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
              >
                  <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
                  />
                  <path
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
              />
          </svg>
          </button>
      </td>
      </tr>
    `;
    });
  }
  
  function abrirModalExcluir(element) {
    idExcluir = element.getAttribute("data-id-recado");
    if (idExcluir) {
      modalExcluir.show();
    }
  }
  
  async function confirmarExcluir() {
    if (idExcluir) {
      const response = await api.delete(`/recados/${idExcluir}`);
  
      if (response.status === 200) {
        const tableBody = recadosTable.children[1];
  
        const elements = [...tableBody.children];
  
        const removeItem = elements.find(
          (item) => item.getAttribute("data-id-recado") === idExcluir
        );
  
        removeItem.remove();
        idExcluir = null;
        modalExcluir.hide();
      }
    }
  }

  function logout() {
    localStorage.removeItem("logado")
    location.href = "./index.html"
  }

  mostrarRecados();