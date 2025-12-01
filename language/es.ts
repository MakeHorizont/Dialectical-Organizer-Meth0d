
import { TranslationData } from '../types';

export const es: TranslationData = {
  appName: "Meth0d",
  slogan: "Mutatus, iterum resurgo melior.",
  nav: {
    current: "Operaciones",
    analysis: "Nuevo Protocolo",
    archive: "Archivos"
  },
  themeNames: {
    neutral: "Neutral (Base)",
    socialist: "Socialista",
    cozy: "Lámpara Acogedora",
    brutal: "Neobrutalism",
    amoled: "Negro Absoluto",
    premium: "Premium",
    kitty: "Gatito Rosa",
    pirate: "Jolly Roger"
  },
  tutorial: {
    welcome: "Bienvenido, Camarada.",
    startBtn: "Iniciar Entrenamiento",
    skipBtn: "Saltar",
    nextBtn: "Siguiente",
    finishBtn: "A la Práctica",
    slides: {
      intro: {
        title: "¿Por qué estamos aquí?",
        content: "Esto no es solo un bloc de notas. Es una herramienta para reestructurar tu pensamiento. El mundo está lleno de contradicciones, y la lógica formal ('sí' o 'no') a menudo falla. Necesitamos dialéctica."
      },
      foundation: {
        title: "Parte 1: Filosofía — Los Cimientos",
        analogy: "CIMIENTOS",
        content: "El marxismo se apoya en dos pilares.\n\n1. Materialismo Dialéctico (Diamat): Nuestro método de conocimiento. Tomamos la dialéctica de Hegel (desarrollo a través de contradicciones) pero descartamos el idealismo. La materia es primaria, el pensamiento secundario.\n\n2. Materialismo Histórico (Histmat): El ser determina la conciencia. La historia no se mueve por las ideas de los héroes, sino por la lucha de clases por los recursos."
      },
      walls: {
        title: "Parte 2: Economía Política — Las Paredes",
        analogy: "PAREDES",
        content: "Sobre estos cimientos se alza el análisis de la realidad: el capitalismo.\n\nLa cumbre aquí es 'El Capital' de Marx. Es la 'superación' de la economía burguesa. Marx demostró que el beneficio es trabajo no pagado (plusvalía), y que el sistema engendra crisis inevitablemente."
      },
      roof: {
        title: "Parte 3: Comunismo Científico — El Techo",
        analogy: "TECHO Y META",
        content: "Esto responde a la pregunta '¿Qué hacer?'.\n\nSi la economía política es el diagnóstico, el comunismo científico es el plan de tratamiento. Lucha de clases, dictadura del proletariado y construcción de una sociedad libre de explotación. Sin este objetivo, la teoría está muerta."
      },
      method: {
        title: "Resumen: Meth0d",
        analogy: "ESPIRAL",
        content: "En la dialéctica, cada nueva vuelta de la espiral no solo repite la anterior, sino que da un salto cualitativo.\n\n'Mutatus, iterum resurgo melior' — Cambiado, resucito mejor.\n\nEl desarrollo no solo va a lo ancho, sino hacia arriba. Tu tarea es convertir la cantidad (problemas) en nueva calidad (soluciones)."
      }
    }
  },
  stages: {
    init: "Objeto Objetivo",
    modules: "Fase 1: Vectores",
    synthesis: "Fase 2: Contradicción",
    strategy: "Fase 3: Estrategia",
    risks: "Fase 4: Autocrítica",
    completed: "Informe Listo"
  },
  dashboard: {
    title: "Puesto de Mando",
    emptyTitle: "Pausa Operativa",
    emptyDesc: "El enemigo nunca duerme. Activa el protocolo de análisis para la nueva situación.",
    activeTasks: "Operaciones Actuales",
    untitled: "Objeto #"
  },
  wizard: {
    titleNew: "Inicialización del Protocolo",
    titleObject: "Objeto de Análisis",
    placeholderName: "Nombre en clave (ej. 'Crisis de Suministros')",
    placeholderObject: "Describe el fenómeno, evento o proceso de forma seca y factual.",
    descName: "Establece un identificador para la operación.",
    descObject: "¿Qué estamos diseccionando exactamente? Hechos, solo hechos.",
    btnNext: "Aceptar",
    btnBack: "Atrás",
    btnSave: "Guardar y Salir",
    btnFinish: "Generar Informe",
    contextLabel: "Contexto de la Operación",
    
    synthesisTitle: "Fase 2: Contradicción Central",
    synthesisDesc: "Analiza las respuestas de la Fase 1. Encuentra la ÚNICA contradicción principal (Lucha de X contra Y) que impulsa este proceso.",
    synthesisPlaceholder: "La lucha principal es entre...",
    
    strategyTitle: "Fase 3: Vector Estratégico",
    strategyDesc: "¿Cómo podemos explotar esta contradicción? Identifica puntos de ataque.",
    vulnLabel: "Vulnerabilidades del Sistema:",
    vulnPlaceholder: "¿Dónde es más débil el sistema opuesto? ¿Dónde chispea la contradicción?",
    oppLabel: "Nuestras Oportunidades:",
    oppPlaceholder: "¿Cómo convertir esto en ventaja para el colectivo? Direcciones concretas.",

    risksTitle: "Fase 4: Autocrítica (Auditoría)",
    risksDesc: "Enfría la cabeza. Pon a prueba el plan.",
    risksLabel: "Riesgos y Puntos Ciegos:",
    risksPlaceholder: "¿Qué podría salir mal? ¿Qué hemos pasado por alto? 'Cisnes Negros'.",
    
    hintLabel: "Nota del Metodólogo:",
    loading: "Lanzando módulos analíticos...",
  },
  view: {
    objectLabel: "OBJETO DE ANÁLISIS",
    contradictionLabel: "CONTRADICCIÓN CENTRAL",
    briefingTitle: "INFORME ESTRATÉGICO",
    modulesTitle: "DATOS DEL MÓDULO (FASE 1)",
    strategyTitle: "PLAN DE ACCIÓN (FASE 3)",
    risksTitle: "AUDITORÍA DE RIESGOS (FASE 4)",
    btnEdit: "Corrección",
    btnShare: "Cifrar al Centro",
    btnPrint: "Imprimir / PDF",
    btnArchive: "Al Archivo",
    confirmArchive: "¿Completar operación y archivar?",
    shareSuccess: "Datos copiados."
  },
  archive: {
    title: "Archivos",
    empty: "Archivo limpio. La historia se escribe ahora.",
    btnRestore: "Al Trabajo",
    btnBurn: "Destruir",
    confirmDelete: "¿Borrar permanentemente?",
    labelArchive: "Completado",
    backupSection: "Gestión de Datos",
    btnExport: "Descargar Copia de Seguridad",
    btnImport: "Importar Respaldo",
    dragDropLabel: "Arrastre el archivo de respaldo aquí",
    orClick: "o haga clic para seleccionar archivo",
    importSuccess: "Datos restaurados con éxito.",
    importError: "Error al leer el archivo."
  },
  questions: {
    q_history: {
      categoryLabel: "Módulo 1: Historia",
      text: "Causa y Efecto: ¿Cómo llegamos aquí y qué sigue?",
      hint: "Rastrea las causas materiales. ¿Qué puntos de inflexión llevaron al estado actual?",
      placeholder: "Históricamente esto se formó debido a..."
    },
    q_class_interest: {
      categoryLabel: "Módulo 2: Clase",
      text: "Esencia de Clase: ¿Cui prodest? (¿Quién se beneficia?)",
      hint: "¿A qué intereses sirve esto? ¿Quién se beneficia, quién paga? ¿Cómo cambia el equilibrio de poder?",
      placeholder: "Esto beneficia a..., mientras que... pagan el precio."
    },
    q_system: {
      categoryLabel: "Módulo 3: Sistema",
      text: "Vínculos Sistémicos: ¿Cómo encaja esto en el panorama general?",
      hint: "¿Conexión con la economía, política, cultura? ¿Dónde están las palancas?",
      placeholder: "Este fenómeno apoya al sistema mediante..."
    },
    q_ideology: {
      categoryLabel: "Módulo 4: Ideología",
      text: "Forma y Contenido: ¿Qué nos están vendiendo?",
      hint: "¿Cómo se presenta en los medios (forma)? ¿Contradicción con la realidad? ¿Qué mitos lo cubren?",
      placeholder: "Se nos dice que..., pero en realidad..."
    }
  },
  quotes: [],
  feedback: [
    "Esencia revelada. Procediendo.",
    "Base materialista confirmada.",
    "Ilusiones descartadas. Grabando.",
    "Buen golpe contra el idealismo.",
    "Conexiones establecidas."
  ]
};
