(function() {
  // Pasos del tutorial para estadisticas.html
  const steps = [
    { selector: 'nav.header-navigation a[href="estadisticas.html"]', text: "Apartado para verificar y modifcar las estadisticas de los equipos del Mundial 2026 en tiempo real", orientation: 'bottom' },
    { selector: '.table-header .col-1', text: "Aparecen los equipos que participarán en el Mundial 2026", orientation: 'top' },
    { selector: '.table-header .col-2', text: "Aparecen los goles que asestaron los respectivos equipo", orientation: 'top' },
    { selector: '.table-header .col-3', text: "Aparecen los partidos ganados de los respectivos equipos", orientation: 'top' },
    { selector: '.table-header .col-4', text: "Aparecen los partidos perdidos de los respectivos equipos", orientation: 'top' },
    { selector: '.table-header .col-5', text: "Apartado para editar la información de cada equipo en tiempo real", orientation: 'top' }
  ];

  const overlay = document.getElementById('tutorial-overlay');
  const bubble = document.getElementById('tutorial-bubble');
  const textEl = document.getElementById('tutorial-text');
  const nextBtn = document.getElementById('tutorial-next');
  const arrow = document.getElementById('tutorial-arrow');

  let currentStep = 0;

  // Comprobar si ya se mostró el tutorial (opcional)
  // if (localStorage.getItem('tutorialEstadisticasShown')) return;
  // localStorage.setItem('tutorialEstadisticasShown', 'true');

  function getElementByStep(step) {
    return document.querySelector(step.selector);
  }

  function showStep(index) {
    if (index >= steps.length) {
      overlay.style.display = 'none';
      return;
    }

    const step = steps[index];
    const target = getElementByStep(step);
    if (!target) {
      console.warn('Elemento no encontrado:', step.selector);
      // Si no se encuentra, pasamos al siguiente automáticamente
      showStep(index + 1);
      return;
    }

    textEl.innerText = step.text;
    overlay.style.display = 'flex';

    // Obtener posición del elemento
    const rect = target.getBoundingClientRect();
    const bubbleWidth = 300; // max-width
    const bubbleHeight = bubble.offsetHeight || 150; // altura aproximada

    // Posicionar burbuja
    let top, left;
    const orientation = step.orientation;

    // Centrar horizontalmente respecto al elemento
    left = rect.left + rect.width / 2 - bubbleWidth / 2;
    // Ajustar para no salir de la pantalla
    if (left < 10) left = 10;
    if (left + bubbleWidth > window.innerWidth - 10) left = window.innerWidth - bubbleWidth - 10;

    if (orientation === 'bottom') {
      // Burbuja debajo del elemento
      top = rect.bottom + 10;
      // Flecha arriba (apunta hacia el elemento)
      arrow.style.borderWidth = '0 10px 10px 10px';
      arrow.style.borderColor = 'transparent transparent white transparent';
      arrow.style.top = '-10px';
      arrow.style.left = '50%';
      arrow.style.transform = 'translateX(-50%)';
    } else {
      // Burbuja arriba del elemento
      top = rect.top - bubbleHeight - 10;
      // Flecha abajo
      arrow.style.borderWidth = '10px 10px 0 10px';
      arrow.style.borderColor = 'white transparent transparent transparent';
      arrow.style.bottom = '-10px';
      arrow.style.left = '50%';
      arrow.style.transform = 'translateX(-50%)';
    }

    // Ajustar top si se sale de la pantalla
    if (top < 10) top = 10;
    if (top + bubbleHeight > window.innerHeight - 10) top = window.innerHeight - bubbleHeight - 10;

    bubble.style.top = top + 'px';
    bubble.style.left = left + 'px';
  }

  nextBtn.addEventListener('click', () => {
    currentStep++;
    showStep(currentStep);
  });

  // Iniciar tutorial
  showStep(0);
})();