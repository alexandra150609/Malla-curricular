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
    { id: "micro", nombre: "Microbiología General", dependeDe: ["celular"] }
  ],
  4: [
    { id: "parasitologia", nombre: "Parasitología", dependeDe: ["celular"] },
    { id: "fisiologia", nombre: "Fisiología Humana", dependeDe: ["morfo"] },
    { id: "tecnicas", nombre: "Técnicas Básicas de Laboratorio", dependeDe: ["quimica", "bioquimica"] }
  ],
  5: [
    { id: "micro_clinica", nombre: "Microbiología Clínica", dependeDe: ["micro"] },
    { id: "hematologia1", nombre: "Hematología I", dependeDe: ["fisiologia"] },
    { id: "bioestadistica", nombre: "Bioestadística", dependeDe: ["matematica"] }
  ],
  6: [
    { id: "hematologia2", nombre: "Hematología II", dependeDe: ["hematologia1"] },
    { id: "bacteriologia", nombre: "Bacteriología Clínica", dependeDe: ["micro_clinica"] },
    { id: "quimica1", nombre: "Química Clínica I", dependeDe: ["bioquimica"] }
  ],
  7: [
    { id: "quimica2", nombre: "Química Clínica II", dependeDe: ["quimica1"] },
    { id: "inmunologia", nombre: "Inmunología Clínica", dependeDe: ["hematologia2", "micro_clinica"] },
    { id: "mico_virologia", nombre: "Micología y Virología Clínica", dependeDe: ["micro_clinica"] }
  ],
  8: [
    { id: "citologia", nombre: "Citología Exfoliativa", dependeDe: ["tecnicas"] },
    { id: "molecular", nombre: "Téc. Diagnóstico Molecular", dependeDe: ["bioquimica", "micro_clinica"] },
    { id: "pre1", nombre: "Práctica Preprofesional I", dependeDe: ["hematologia2", "bacteriologia", "quimica2"] }
  ],
  9: [
    { id: "histo_ap", nombre: "Histotecnología y Anat. Patológica", dependeDe: ["citologia", "tecnicas"] },
    { id: "gestion", nombre: "Gestión de Calidad en Lab. Clínico", dependeDe: ["pre1"] },
    { id: "pre2", nombre: "Práctica Preprofesional II", dependeDe: ["pre1"] }
  ],
  10: [
    { id: "investigacion", nombre: "Investigación en Tecnología Médica", dependeDe: ["bioestadistica", "pre2"] },
    { id: "etica", nombre: "Ética Profesional", dependeDe: ["pre2"] },
    { id: "internado", nombre: "Internado Hospitalario", dependeDe: ["pre2"] }
  ]
};

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

      if (completado) card.classList.add("completed");

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
