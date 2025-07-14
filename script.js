// Cursos por ciclo con dependencias
const malla = {
  1: [
    { id: "matematica", nombre: "Matemática Básica" },
    { id: "biologia", nombre: "Biología General" },
    { id: "quimica", nombre: "Química General" }
  ],
  2: [
    { id: "fisica", nombre: "Física Básica", dependeDe: ["matematica"] },
    { id: "organica", nombre: "Química Orgánica", dependeDe: ["quimica"] },
    { id: "celular", nombre: "Biología Celular", dependeDe: ["biologia"] }
  ],
  3: [
    { id: "morfo", nombre: "Fund. Morfofisiología", dependeDe: ["celular"] },
    { id: "bioquimica", nombre: "Bioquímica", dependeDe: ["organica"] },
    { id: "micro", nombre: "Microbiología General", dependeDe: ["biologia"] }
  ]
  // Puedes continuar con los ciclos 4 al 10 agregando dependencias
};

// Guardar progreso en localStorage
let estadoCursos = JSON.parse(localStorage.getItem("estadoCursos")) || {};

function crearMalla() {
  const board = document.getElementById("kanban-board");

  for (const ciclo in malla) {
    const columna = document.createElement("div");
    columna.className = "cycle-column";

    const titulo = document.createElement("div");
    titulo.className = "cycle-title";
    titulo.textContent = `Ciclo ${ciclo}`;
    columna.appendChild(titulo);

    malla[ciclo].forEach(curso => {
      const card = document.createElement("div");
      card.className = "course-card";
      card.id = `card-${curso.id}`;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = curso.id;
      checkbox.checked = estadoCursos[curso.id] || false;

      const label = document.createElement("label");
      label.htmlFor = curso.id;
      label.textContent = curso.nombre;

      card.appendChild(checkbox);
      card.appendChild(label);
      columna.appendChild(card);
    });

    board.appendChild(columna);
  }

  aplicarBloqueos();
  agregarEventos();
}

function aplicarBloqueos() {
  for (const ciclo in malla) {
    malla[ciclo].forEach(curso => {
      const card = document.getElementById(`card-${curso.id}`);
      const checkbox = document.getElementById(curso.id);
      const completado = estadoCursos[curso.id];

      // Estilo si está completado
      if (completado) card.classList.add("completed");

      // Si tiene prerequisitos
      if (curso.dependeDe) {
        const depsCumplidos = curso.dependeDe.every(id => estadoCursos[id]);
        if (!depsCumplidos) {
          card.classList.add("locked");
          checkbox.disabled = true;
        }
      }
    });
  }
}

function agregarEventos() {
  document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const id = checkbox.id;
      estadoCursos[id] = checkbox.checked;
      localStorage.setItem("estadoCursos", JSON.stringify(estadoCursos));
      recargarVista();
    });
  });
}

function recargarVista() {
  document.getElementById("kanban-board").innerHTML = "";
  crearMalla();
}

crearMalla();
