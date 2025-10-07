const encoded = "aHR0cHM6Ly8xODUuMTM3LjEyMi4xMzc=";
const API_URL = atob(encoded);
const form = document.getElementById("userForm");
const userList = document.getElementById("userList");

// Função para carregar usuários
async function carregarUsuarios() {
  userList.innerHTML = "<li>Carregando...</li>";
  try {
    const res = await fetch(`${API_URL}/usuarios`);
    const data = await res.json();
    userList.innerHTML = "";
    data.usuarios.forEach((u) => {
      const li = document.createElement("li");
      li.textContent = `${u.id} - ${u.nome} (${u.email})`;
      userList.appendChild(li);
    });
  } catch (err) {
    userList.innerHTML = "<li>Erro ao carregar usuários</li>";
    console.error(err);
  }
}

// Função para cadastrar usuário
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const res = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    });
    const data = await res.json();
    alert(data.mensagem || "Usuário cadastrado!");
    form.reset();
    carregarUsuarios();
  } catch (err) {
    alert("Erro ao cadastrar usuário");
    console.error(err);
  }
});

// Carrega na inicialização
carregarUsuarios();
