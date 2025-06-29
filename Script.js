const tasklist = document.getElementById("tasklist");//UL
const taskinput = document.getElementById("taskinput");//onde digita a tarefa
window.onload = carregarTarefas;//no F5 chama carregarTarefas
function addtask() {
  
  const tasktext = taskinput.value.trim();
  if(tasktext !== "") {
    const maxtext = tasktext.substring(0, 35);
    // Cria o li com a checkbox e botões
    const li = document.createElement("li");
    li.innerHTML = `
    <input type="checkbox" onclick="updatetask(this)">
    <span>${maxtext}</span>
    <div class="button-group">
    <button class="EditButton" onClick="edittask(this)">Editar</button>
    <button class="deletButton" onClick="deletetask(this)">Remover</button>
    </div>
    `;
    tasklist.appendChild(li);// add na lista
    taskinput.value = "";// limpa o input
    //salva as tarefa e add no cont
     salvaTask();
     Contador();
  }
}

function edittask(button){

 const li = button.parentElement.parentElement;//pega o <li> pai dos botões
 const span = li.querySelector("span");//pega o <span> que contém o nome da task
 
 const newText = prompt("Editar tarefa:", span.textContent);//novo texto
  if (newText !== null && newText.trim() !== ""){
    span.textContent = newText.trim().substring(0, 35);
     salvaTask();//same s
     Contador();
  }
}

function deletetask(button) {
  
  const li = button.parentElement.parentElement;//pega li
  tasklist.removeChild(li);// del ele
 salvaTask();
 Contador();
}

function updatetask(checkbox) {
  const li = checkbox.closest("li");//pega o li mais proximo
  const span = li.querySelector("span");//pega o texto da tarefa
  
  if (checkbox.checked) {
    //risca e desrisca
    span.classList.add("riscado");
  } else {
    span.classList.remove("riscado");
    
  }
   salvaTask();
   Contador();
}



function salvaTask() {
  const tarefas = [];
//pega todas as tasks da ul e seta num array com nome e status 
  document.querySelectorAll("#tasklist li").forEach(li => {
    const span = li.querySelector("span");
    const checkbox = li.querySelector("input[type='checkbox']");

    tarefas.push({
      texto: span.textContent,
      concluida: checkbox.checked
    });
  });
//salva no sessionStorage
  sessionStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
  // function q puxa tasks do sessionStorage 
  const dados = sessionStorage.getItem("tarefas");
  if (dados) {
    const tarefas = JSON.parse(dados);
    tarefas.forEach(tarefa => {
      //recria um <li> com checkbox e texto prenchidos
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="checkbox" ${tarefa.concluida ? "checked" : ""} onclick="updatetask(this)">
        <span class="${tarefa.concluida ? "riscado" : ""}">${tarefa.texto}</span>
        <div class="button-group">
          <button class="EditButton" onClick="edittask(this)">Editar</button>
          <button class="deletButton" onClick="deletetask(this)">Remover</button>
        </div>
      `;
      tasklist.appendChild(li);
    });
  }
  Contador();
}

function Contador() {
  const total = document.querySelectorAll("#tasklist li").length;//le todas as tasks
  const concluidas = document.querySelectorAll("#tasklist li input[type='checkbox']:checked").length;//le as q temo check assinalado
  const pendentes = total - concluidas;//total-concluidas kkk

  document.getElementById("total").textContent = total;
  document.getElementById("concluidas").textContent = concluidas;
  document.getElementById("pendentes").textContent = pendentes;
}