(function() {
  // Pasos del tutorial para estadisticas.html
  const steps = [
    { selector: 'nav.header-navigation a[href="estadisticas.html"]', text: "Apartado para verificar y modifcar las estadisticas de los equipos del Mundial 2026 en tiempo real", desiredOrientation: 'bottom' },
    { selector: '.table-header .col-1', text: "Aparecen los equipos que participarán en el Mundial 2026", desiredOrientation: 'bottom' },
    { selector: '.table-header .col-2', text: "Aparecen los goles que asestaron los respectivos equipo", desiredOrientation: 'bottom' },
    { selector: '.table-header .col-3', text: "Aparecen los partidos ganados de los respectivos equipos", desiredOrientation: 'bottom' },
    { selector: '.table-header .col-4', text: "Aparecen los partidos perdidos de los respectivos equipos", desiredOrientation: 'bottom' },
    { selector: '.table-header .col-5', text: "Apartado para editar la información de cada equipo en tiempo real", desiredOrientation: 'bottom' }
  ];

  const overlay = document.getElementById('tutorial-overlay');
  const bubble = document.getElementById('tutorial-bubble');
  const textEl = document.getElementById('tutorial-text');
  const nextBtn = document.getElementById('tutorial-next');
  const arrow = document.getElementById('tutorial-arrow');

  let currentStep = 0;

  // Opcional: evitar mostrar el tutorial si ya se vio
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
      showStep(index + 1);
      return;
    }

    textEl.innerText = step.text;
    overlay.style.display = 'flex';

    bubble.style.visibility = 'hidden';
    bubble.style.display = 'block';
    const bubbleRect = bubble.getBoundingClientRect();
    bubble.style.visibility = 'visible';

    const targetRect = target.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const spaceAbove = targetRect.top;
    const spaceBelow = viewportHeight - targetRect.bottom;

    let orientation;
    if (step.desiredOrientation === 'bottom' && spaceBelow >= bubbleRect.height + 20) {
      orientation = 'bottom';
    } else if (step.desiredOrientation === 'top' && spaceAbove >= bubbleRect.height + 20) {
      orientation = 'top';
    } else {
      orientation = (step.desiredOrientation === 'bottom' && spaceAbove >= bubbleRect.height + 20) ? 'top' : 'bottom';
    }

    let left = targetRect.left + targetRect.width / 2 - bubbleRect.width / 2;
    left = Math.max(10, Math.min(left, viewportWidth - bubbleRect.width - 10));

    let top;
    if (orientation === 'bottom') {
      top = targetRect.bottom + 10;
      arrow.style.borderWidth = '0 10px 10px 10px';
      arrow.style.borderColor = 'transparent transparent white transparent';
      arrow.style.top = '-10px';
      arrow.style.left = '50%';
      arrow.style.transform = 'translateX(-50%)';
      arrow.style.bottom = 'auto';
    } else {
      top = targetRect.top - bubbleRect.height - 10;
      arrow.style.borderWidth = '10px 10px 0 10px';
      arrow.style.borderColor = 'white transparent transparent transparent';
      arrow.style.bottom = '-10px';
      arrow.style.left = '50%';
      arrow.style.transform = 'translateX(-50%)';
      arrow.style.top = 'auto';
    }

    if (top < 10) top = 10;
    if (top + bubbleRect.height > viewportHeight - 10) {
      top = viewportHeight - bubbleRect.height - 10;
    }

    bubble.style.top = top + 'px';
    bubble.style.left = left + 'px';
  }

  nextBtn.addEventListener('click', () => {
    currentStep++;
    showStep(currentStep);
  });

  window.addEventListener('resize', () => {
    if (overlay.style.display === 'flex') {
      showStep(currentStep);
    }
  });

  showStep(0);
})();