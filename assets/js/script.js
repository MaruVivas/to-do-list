const tareas = [{id: 1, descripcion: "Lavar la loza", realizada: false}, {id: 2, descripcion: "Limpiar la cocina", realizada: false}, {id: 3, descripcion: "Pasear a Chamito", realizada: false}];

const mostrarTareas = () => {
    let template = "";
    tareas.forEach((tarea) => {
        template += `
        <tr>
            <td>${tarea.id}</td>
            <td class="descripcion">${tarea.descripcion}</td>
            <td><input id="checkbox" type="checkbox" ${tarea.realizada ? "checked" : ""}/></td>
            <td><span id="delete"><i class="fas fa-minus-square"></i></span></td>
        </tr>
        `;
});

const tbody = document.querySelector("#tasks tbody");
tbody.innerHTML = template;

borrarTask();
manejarEstado();
contarTareas();
};

const borrarTask = () => {
    const eliminar = document.querySelectorAll("#tasks span");
    eliminar.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            tareas.splice(index, 1);
            mostrarTareas();
        });
    });
};

const manejarEstado = () => {
    const boxes = document.querySelectorAll("#tasks input[type='checkbox']");
boxes.forEach((box, index) => {
    const row = document.querySelector(
        `#tasks tbody tr:nth-child(${index + 1})`
    );

    if(box.checked) {
        row.classList.add("line");

    }

    box.addEventListener("click", () => {
        row.classList.toggle("line");
        tareas[index].realizada = !tareas[index].realizada;

        contarTareas();
    });
});
};

const contarTareas = () => {
    const total = tareas.length;
    const realizadas = tareas.filter((tarea) => tarea.realizada === true).length;

    const spanTotal = document.getElementById("totalTasks");
    const spanRealizadas = document.getElementById("doneTasks");

    spanTotal.innerHTML = total;
    spanRealizadas.innerHTML = realizadas;
};

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
    const tarea = document.getElementById("newTask");

    tareas.push({
        id: tareas.length + 1,
        descripcion: tarea.value,
        realizada: false
    });

    tarea.value = "";

    mostrarTareas();

});

mostrarTareas();
