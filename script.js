const malla = {
  1: [
    { id: "tecnicas_salud", nombre: "Técnicas básicas en atención de salud" },
    { id: "quimica_elementos", nombre: "Elementos de química" },
    { id: "matematicas_basicas", nombre: "Matemáticas básicas" },
    { id: "intro_laboratorio", nombre: "Introducción a laboratorio clínico y anatomía patológica" },
    { id: "filosofia_etica", nombre: "Filosofía y ética" },
    { id: "desarrollo_personal", nombre: "Desarrollo personal y autonomía" },
    { id: "comunicacion_1", nombre: "Comunicación y redacción I" },
    { id: "ingles_1", nombre: "Inglés 1" }
  ],
  2: [
    { id: "quimica_organica", nombre: "Fundamentos de química orgánica", dependeDe: ["quimica_elementos"] },
    { id: "biologia_general", nombre: "Biología general" },
    { id: "fisica_basica", nombre: "Física básica", dependeDe: ["matematicas_basicas"] },
    { id: "comunicacion_2", nombre: "Comunicación y redacción II", dependeDe: ["comunicacion_1"] },
    { id: "cultura_ambiental", nombre: "Cultura ambiental y desarrollo sostenible" },
    { id: "pensamiento_cientifico", nombre: "Pensamiento científico e investigador" },
    { id: "ciencias_sociales", nombre: "Ciencias Sociales en el contexto actual" },
    { id: "ingles_2", nombre: "Inglés 2", dependeDe: ["ingles_1"] }
  ],
  3: [
    { id: "morfofisiologia", nombre: "Fundamentos de morfofisiología", dependeDe: ["biologia_general", "quimica_organica"] },
    { id: "equipos_laboratorio", nombre: "Diseño, seguridad y automatización en equipos de laboratorio clínico" },
    { id: "electiva_1", nombre: "Asignatura electiva I" },
    { id: "actividad_1", nombre: "Actividad complementaria I" },
    { id: "ingles_3", nombre: "Inglés 3", dependeDe: ["ingles_2"] }
  ],
  4: [
    { id: "estadistica", nombre: "Estadística", dependeDe: ["matematicas_basicas"] },
    { id: "fisiopatologia", nombre: "Fisiopatología general", dependeDe: ["morfofisiologia"] },
    { id: "bioquimica", nombre: "Bioquímica y biología molecular", dependeDe: ["biologia_general", "quimica_organica", "fisica_basica"] },
    { id: "farmacologia", nombre: "Farmacología clínica aplicada" },
    { id: "hematologia_general", nombre: "Hematología general", dependeDe: ["morfofisiologia"] },
    { id: "tecnicas_ap", nombre: "Técnicas en anatomía patológica y citología exfoliativa", dependeDe: ["morfofisiologia"] },
    { id: "ingles_4", nombre: "Inglés 4", dependeDe: ["ingles_3"] }
  ],
  5: [
    { id: "quimica_clinica", nombre: "Química clínica general", dependeDe: ["equipos_laboratorio", "bioquimica"] },
    { id: "inmunologia", nombre: "Inmunología general", dependeDe: ["bioquimica"] },
    { id: "hematologia_especial", nombre: "Hematología especial", dependeDe: ["hematologia_general"] },
    { id: "citotecnologia", nombre: "Citotecnología exfoliativa", dependeDe: ["morfofisiologia", "tecnicas_ap"] },
    { id: "electiva_2", nombre: "Asignatura electiva II" },
    { id: "actividad_2", nombre: "Actividad complementaria II" }
  ],
  6: [
    { id: "quimica_clinica_esp", nombre: "Química clínica especial", dependeDe: ["quimica_clinica"] },
    { id: "inmunologia_esp", nombre: "Inmunología especial", dependeDe: ["inmunologia"] },
    { id: "citogenetica", nombre: "Citogenética humana", dependeDe: ["hematologia_especial", "bioquimica"] },
    { id: "bacteriologia", nombre: "Bacteriología", dependeDe: ["bioquimica"] },
    { id: "electiva_3", nombre: "Asignatura electiva III" },
    { id: "actividad_3", nombre: "Actividad complementaria III" }
  ],
  7: [
    { id: "metodologia", nombre: "Metodología de la investigación", dependeDe: ["estadistica"] },
    { id: "etica_deontologia", nombre: "Ética y deontología", dependeDe: ["ciencias_sociales"] },
    { id: "parasitologia", nombre: "Parasitología", dependeDe: ["inmunologia_esp"] },
    { id: "micologia", nombre: "Micología", dependeDe: ["inmunologia"] },
    { id: "virologia", nombre: "Virología", dependeDe: ["inmunologia_esp"] },
    { id: "hemoterapia", nombre: "Hemoterapia y Banco de sangre", dependeDe: ["hematologia_general"] }
  ],
  8: [
    { id: "epidemiologia", nombre: "Epidemiología y salud pública", dependeDe: ["matematicas_basicas"] },
    { id: "legislacion", nombre: "Legislación en salud", dependeDe: ["ciencias_sociales"] },
    { id: "taller_investigacion", nombre: "Taller de diseño de proyecto de investigación", dependeDe: ["metodologia"] },
    { id: "gestion_salud", nombre: "Gestión y administración en servicios de salud", dependeDe: ["estadistica", "metodologia"] },
    { id: "gestion_calidad", nombre: "Gestión de calidad en el laboratorio clínico", dependeDe: ["hematologia_especial", "quimica_clinica_esp", "bacteriologia", "inmunologia_esp", "hemoterapia", "citotecnologia"] },
    { id: "necropsia", nombre: "Técnicas en necropsia y patología forense", dependeDe: ["citotecnologia"] },
    { id: "actividad_4", nombre: "Actividad complementaria IV" }
  ],
  9: [
    { id: "practica_hemato", nombre: "Práctica clínica hospitalaria en Hematología" },
    { id: "practica_hemoterapia", nombre: "Práctica clínica hospitalaria en Hemoterapia y Banco de sangre" },
    { id: "practica_micro", nombre: "Práctica clínica hospitalaria en Microbiología", dependeDe: ["actividad_4"] }
  ],
  10: [
    { id: "trabajo_investigacion", nombre: "Trabajo de investigación", dependeDe: ["taller_investigacion"] },
    { id: "practica_inmuno", nombre: "Práctica clínica hospitalaria en inmunodiagnóstico", dependeDe: ["actividad_4"] },
    { id: "practica_quimica", nombre: "Práctica clínica hospitalaria en química clínica", dependeDe: ["actividad_4"] },
    { id: "practica_anatomia", nombre: "Práctica clínica hospitalaria en anatomía patológica", dependeDe: ["actividad_4"] }
  ]
};

let estadoCursos = JSON.parse(localStorage.getItem("estadoCursos")) || {};

function crearMalla() {
  const board = document.getElementById("kanban-board");
  board.innerHTML = "";

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
      crearMalla();
    });
  });
}

crearMalla();
