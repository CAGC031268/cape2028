document.addEventListener('DOMContentLoaded', () => {
    // Tab Navigation Logic
    const tabs = document.querySelectorAll('.nav-btn');
    const panes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panes
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            panes.forEach(p => {
                p.classList.remove('active');
                p.classList.add('d-none');
            });

            // Add active class to clicked tab and corresponding pane
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            const targetId = tab.getAttribute('data-target');
            const targetPane = document.getElementById(targetId);

            if (targetPane) {
                targetPane.classList.remove('d-none');
                // Trigger reflow to restart animation
                void targetPane.offsetWidth;
                targetPane.classList.add('active');
            }

            // Scroll to top of page when changing tabs on mobile
            if (window.innerWidth <= 768) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Accordion Logic
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            const item = acc.parentElement;
            const content = item.querySelector('.accordion-content');

            // Toggle expanded class
            item.classList.toggle('expanded');

            // Handle max-height for smooth transition
            if (item.classList.contains('expanded')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0px';
            }
        });
    });

    // Set initial max-height for expanded accordions on load
    document.querySelectorAll('.accordion-item.expanded .accordion-content').forEach(content => {
        content.style.maxHeight = content.scrollHeight + 'px';
    });

    // Read More Logic
    const readMoreBtns = document.querySelectorAll('.btn-read-more');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('id').replace('btn-', 'text-');
            const targetText = document.getElementById(targetId);
            if (targetText) {
                targetText.classList.toggle('line-clamp-8');
                if (targetText.classList.contains('line-clamp-8')) {
                    btn.textContent = 'Leer más';
                } else {
                    btn.textContent = 'Contraer texto';
                }
            }
        });
    });

    renderCurriculumGrid();
});

function renderCurriculumGrid() {
    const gridContainer = document.getElementById('curriculum-grid');
    const legendContainer = document.getElementById('curriculum-legends');
    if (!gridContainer) return;

    // --- Definición de Líneas Formativas ---
    const lineas = {
        'math': { name: 'Ciencias Básicas y Matemáticas', class: 'line-math', desc: 'Objetivo: Desarrollar el rigor lógico y la capacidad de modelamiento abstracto necesarios para resolver problemas complejos estructurados.' },
        'dev': { name: 'Programación y Algoritmia', class: 'line-dev', desc: 'Objetivo: Construir la lógica computacional y dominar la creación de software eficiente bajo múltiples paradigmas.' },
        'infra': { name: 'Arquitectura y Redes', class: 'line-infra', desc: 'Objetivo: Comprender y gestionar la infraestructura física y lógica (Hardware, SO, Cloud) como un sistema interconectado.' },
        'data': { name: 'Datos e IA', class: 'line-data', desc: 'Objetivo: Extraer valor de la información mediante modelos estadísticos y algoritmos predictivos o generativos.' },
        'eng': { name: 'Ingeniería, Gestión y Seguridad', class: 'line-eng', desc: 'Objetivo: Alinear la tecnología con las estrategias de negocio, garantizando la calidad, ética y seguridad de los sistemas.' }
    };

    // --- Definición de Categorías HOTS (Taxonomía de Bloom revisado) ---
    const hotsCategories = {
        'analyze': { name: 'Analyze', class: 'hots-agil', desc: 'HOTS: Descomponer información, diagnosticar fallos y entender causalidad de sistemas.' },
        'evaluate': { name: 'Evaluate', class: 'hots-crit', desc: 'HOTS: Justificar decisiones, auditar soluciones y ponderar trade-offs (costo, riesgo, ética).' },
        'create': { name: 'Create', class: 'hots-orq', desc: 'HOTS: Diseñar o construir nuevos modelos, arquitecturas o productos de software y hardware.' }
    };

    const semesters = [
        {
            title: "Semestre 1",
            subjects: [
                { name: "Fundamentos de Prog. y Pensamiento Computacional", obj: "Construir programas funcionales y depurables para resolver problemas.", cont: "Control flujo, funciones, debugging, unit tests inicio.", hots: "Analyze", hotsKey: 'analyze', linea: 'dev' },
                { name: "Matemática Aplicada", obj: "Modelar problemas computacionales con herramientas matemáticas.", cont: "Lógica, funciones, matrices, complejidad.", hots: "Analyze", hotsKey: 'analyze', linea: 'math' },
                { name: "Arquitectura de Computadores y SS.OO.", obj: "Explicar y diagnosticar desempeño de CPU/memoria/SO y seguridad.", cont: "Arquitectura, procesos, memoria, FS, CLI scripting.", hots: "Analyze", hotsKey: 'analyze', linea: 'infra' },
                { name: "Fundamentos de Bases de Datos", obj: "Diseñar modelo relacional y operar datos con consultas/restricciones.", cont: "Modelamiento ER, normalización, SQL, transacciones intro.", hots: "Create", hotsKey: 'create', linea: 'data' },
                { name: "Comunicación Técnica y Ética Profesional en TI", obj: "Comunicar decisiones técnicas y sostener criterios éticos.", cont: "Escritura técnica, documentación, dilemas éticos.", hots: "Evaluate", hotsKey: 'evaluate', linea: 'eng' }
            ]
        },
        {
            title: "Semestre 2",
            subjects: [
                { name: "Paradigmas de Programación", obj: "Diseñar soluciones OO mantenibles con reutilización y pruebas.", cont: "OO, principios SOLID intro, patrones básicos, unit testing.", hots: "Create", hotsKey: 'create', linea: 'dev' },
                { name: "Análisis y Diseño de Algoritmos", obj: "Comparar estrategias algorítmicas y seleccionar por costo/beneficio.", cont: "Estructuras base, complejidad, recursión, greedy/DP.", hots: "Evaluate", hotsKey: 'evaluate', linea: 'dev' },
                { name: "Redes e Infraestructura Digital", obj: "Configurar y diagnosticar redes básicas y documentar topologías.", cont: "TCP/IP, subnetting, routing, DNS/DHCP, troubleshooting.", hots: "Analyze", hotsKey: 'analyze', linea: 'infra' },
                { name: "Álgebra Lineal y Estad. Descriptiva para TI", obj: "Aplicar herramientas y preparar insumos para análisis/GenAI.", cont: "Vectores/matrices, estadística descriptiva, visualización.", hots: "Analyze", hotsKey: 'analyze', linea: 'math' },
                { name: "Ciberseguridad", obj: "Identificar riesgos TI, aplicar controles, usar GenAI seguro.", cont: "CIA/riesgo, amenazas, hardening, seguridad de redes.", hots: "Evaluate", hotsKey: 'evaluate', linea: 'eng' }
            ]
        },
        {
            title: "Semestre 3",
            subjects: [
                { name: "Desarrollo Full Stack", obj: "Entregar producto full-stack con APIs, QA y seguridad.", cont: "Web/app, APIs, auth, pruebas integración, API resilience.", hots: "Create", hotsKey: 'create', linea: 'dev' },
                { name: "Probabilidad e Inferencia Estad. para TI", obj: "Diseñar inferencias y evaluar incertidumbre en decisiones.", cont: "Probabilidad, estimación, tests, experimentación, sesgos.", hots: "Evaluate", hotsKey: 'evaluate', linea: 'math' },
                { name: "Cloud Computing y DevOps", obj: "Desplegar servicios en cloud con CI/CD y observabilidad.", cont: "Virtualización/containers, CI/CD, IaC, deployment rollback.", hots: "Create", hotsKey: 'create', linea: 'infra' },
                { name: "Análisis de Datos y Visualización", obj: "Construir flujo de análisis y comunicar con data storytelling.", cont: "ETL liviano, EDA, dashboards, storytelling, data quality.", hots: "Create", hotsKey: 'create', linea: 'data' },
                { name: "Ingeniería de Software", obj: "Gestionar delivery ágil garantizando Definition of Done (DoD).", cont: "Requerimientos, historias, arquitectura modular, QA plan.", hots: "Evaluate", hotsKey: 'evaluate', linea: 'eng' }
            ]
        },
        {
            title: "Semestre 4",
            subjects: [
                { name: "Machine Learning Aplicado", obj: "Entrenar modelos ML y justificar trade-off desempeño/riesgo.", cont: "Features, modelos supervisados, validación, overfitting.", hots: "Evaluate", hotsKey: 'evaluate', linea: 'data' },
                { name: "IA Generativa, LLMs y Sistemas Agénticos", obj: "Prototipar GenAI con prompting avanzado y evaluar outputs.", cont: "Prompt engineering, RAG, evaluación, alucinaciones.", hots: "Create", hotsKey: 'create', linea: 'data' },
                { name: "IoT, Edge Comput. y Sistemas Distribuidos", obj: "Diseñar sistema distribuido simple y analizar tolerancia/fallos.", cont: "Arquitecturas, colas/eventos, edge, consistencia, latencia.", hots: "Analyze", hotsKey: 'analyze', linea: 'infra' },
                { name: "Seguridad Avanzada", obj: "Auditar controles, ejecutar incident drill y plan continuidad.", cont: "Framework controles, hardening avanzado, SIEM intro, IR.", hots: "Evaluate", hotsKey: 'evaluate', linea: 'eng' },
                { name: "IA, Ética, Regulación y Responsabilidad Prof.", obj: "Diseñar gobernanza básica IA justificando riesgos y privacidad.", cont: "Responsible AI, privacidad, sesgos, políticas, impacto.", hots: "Evaluate", hotsKey: 'evaluate', linea: 'eng' }
            ]
        }
    ];

    const iconObj = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`;
    const iconCont = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>`;
    const iconHots = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.45.62 2.8 1.5 3.5.76.76 1.23 1.52 1.41 2.5"></path></svg>`;

    // --- 1. Generar Leyendas ---
    if (legendContainer) {
        let legendHtml = `
            <div class="legend-group">
                <h5 class="legend-title">Líneas Formativas</h5>
                <div class="legend-items">
                    ${Object.values(lineas).map(l => `<span class="legend-badge ${l.class}-badge" title="${l.desc}" style="cursor: help;">${l.name}</span>`).join('')}
                </div>
            </div>
            <div class="legend-group">
                <h5 class="legend-title"><span class="icon-inline">${iconHots}</span> Competencias de Orden Superior (HOTS)</h5>
                <div class="legend-items hots-legends">
                    ${Object.values(hotsCategories).map(h => `<span class="legend-badge ${h.class}-icon" title="${h.desc}" style="cursor: help;">${h.name}</span>`).join('')}
                </div>
            </div>
        `;
        legendContainer.innerHTML = legendHtml;
    }

    // --- 2. Generar Malla ---
    let html = '';

    semesters.forEach(sem => {
        const highlightClass = sem.highlight ? 'highlight-col' : '';
        const highlightTextClass = sem.highlight ? 'highlight-text' : '';

        html += `
        <div class="semester-col ${highlightClass}">
            <h4 class="semester-header ${highlightTextClass}">${sem.title}</h4>
            <div class="subjects-container">
        `;

        sem.subjects.forEach(sub => {
            const lineClass = lineas[sub.linea] ? lineas[sub.linea].class : '';
            const hotsClass = hotsCategories[sub.hotsKey] ? hotsCategories[sub.hotsKey].class : '';
            const highlightCardClass = sem.highlight ? 'highlight-card' : '';

            html += `
                <div class="subject-card ${lineClass} ${highlightCardClass}">
                    <h5>${sub.name}</h5>
                    <div class="subject-icons">
                        <div class="icon-item" title="Objetivo: ${sub.obj}">
                            ${iconObj}
                        </div>
                        <div class="icon-item" title="Contenidos Claves: ${sub.cont}">
                            ${iconCont}
                        </div>
                        <div class="icon-item hots-icon ${hotsClass}" title="HOTS (Orden Superior): ${sub.hots}">
                            ${iconHots}
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
            </div>
        </div>
        `;
    });

    gridContainer.innerHTML = html;
}
