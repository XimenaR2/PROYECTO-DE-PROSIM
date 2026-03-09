(function() {
  // Pasos del tutorial para filtros.html
  const steps = [
    { selector: 'nav.header-navigation a[href="filtros.html"]', text: "Apartado para editar relacionados con el Mundial 2026", desiredOrientation: 'bottom' },
    { selector: '#btnLibreria', text: "Apartado para seleccionar videos que quieras editar relacionados con el Mundial 2026", desiredOrientation: 'bottom' },
    { selector: '#btnImportar', text: "Aqui puedes importar videos desde tu propio dispositivo", desiredOrientation: 'bottom' },
    { selector: '#btnExportar', text: "Aqui puedes exportar videos a tu propio dispositivo", desiredOrientation: 'bottom' },
    { selector: '#btnDeshacer', text: "Deshace el ultimo movimiento", desiredOrientation: 'bottom' },
    { selector: '#btnAplicar', text: "Aplica los cambios que modificaste al video", desiredOrientation: 'bottom' },
    { selector: '#previewPanel', text: "Vista previa del video del Mundial 2026 seleccionado", desiredOrientation: 'bottom' },
    { selector: '.tools-panel button:nth-child(1)', text: "Aplica el efecto de recortar en el video segun las medidas que quieras", desiredOrientation: 'bottom' },
    { selector: '.tools-panel button:nth-child(2)', text: "Aplica el efecto de Rotación en el video", desiredOrientation: 'bottom' },
    { selector: '.tools-panel button:nth-child(3)', text: "Añade un texto al video", desiredOrientation: 'bottom' },
    { selector: '.tools-panel button:nth-child(4)', text: "Aplica un filtro al video", desiredOrientation: 'bottom' },
    { selector: '.tools-panel button:nth-child(5)', text: "Aplica el efecto de ajustar brillo, el contraste, la saturación y desenfoque de un video", desiredOrientation: 'bottom' }
  ];

  const overlay = document.getElementById('tutorial-overlay');
  const bubble = document.getElementById('tutorial-bubble');
  const textEl = document.getElementById('tutorial-text');
  const nextBtn = document.getElementById('tutorial-next');
  const arrow = document.getElementById('tutorial-arrow');

  let currentStep = 0;

  // Opcional: evitar mostrar el tutorial si ya se vio (descomenta para activar)
  // if (localStorage.getItem('tutorialFiltrosShown')) return;
  // localStorage.setItem('tutorialFiltrosShown', 'true');

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

    // Forzar recálculo de dimensiones de la burbuja
    bubble.style.visibility = 'hidden';
    bubble.style.display = 'block';
    const bubbleRect = bubble.getBoundingClientRect();
    bubble.style.visibility = 'visible';

    const targetRect = target.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Espacio disponible arriba y abajo del elemento
    const spaceAbove = targetRect.top;
    const spaceBelow = viewportHeight - targetRect.bottom;

    // Determinar orientación final: intentamos la deseada, si no cabe usamos la opuesta
    let orientation;
    if (step.desiredOrientation === 'bottom' && spaceBelow >= bubbleRect.height + 20) {
      orientation = 'bottom';
    } else if (step.desiredOrientation === 'top' && spaceAbove >= bubbleRect.height + 20) {
      orientation = 'top';
    } else {
      // Si no cabe en la deseada, probamos la otra
      orientation = (step.desiredOrientation === 'bottom' && spaceAbove >= bubbleRect.height + 20) ? 'top' : 'bottom';
    }

    // Calcular posición horizontal (centrada respecto al target)
    let left = targetRect.left + targetRect.width / 2 - bubbleRect.width / 2;
    // Ajustar para no salir de la pantalla
    left = Math.max(10, Math.min(left, viewportWidth - bubbleRect.width - 10));

    // Calcular posición vertical según orientación
    let top;
    if (orientation === 'bottom') {
      top = targetRect.bottom + 10;
      // Flecha arriba
      arrow.style.borderWidth = '0 10px 10px 10px';
      arrow.style.borderColor = 'transparent transparent white transparent';
      arrow.style.top = '-10px';
      arrow.style.left = '50%';
      arrow.style.transform = 'translateX(-50%)';
      arrow.style.bottom = 'auto';
    } else {
      top = targetRect.top - bubbleRect.height - 10;
      // Flecha abajo
      arrow.style.borderWidth = '10px 10px 0 10px';
      arrow.style.borderColor = 'white transparent transparent transparent';
      arrow.style.bottom = '-10px';
      arrow.style.left = '50%';
      arrow.style.transform = 'translateX(-50%)';
      arrow.style.top = 'auto';
    }

    // Ajustar top para no salirse de la pantalla
    if (top < 10) top = 10;
    if (top + bubbleRect.height > viewportHeight - 10) {
      top = viewportHeight - bubbleRect.height - 10;
    }

    // Aplicar posición
    bubble.style.top = top + 'px';
    bubble.style.left = left + 'px';
  }

  nextBtn.addEventListener('click', () => {
    currentStep++;
    showStep(currentStep);
  });

  // Recalcular posición si la ventana cambia de tamaño (útil para rotación de pantalla)
  window.addEventListener('resize', () => {
    if (overlay.style.display === 'flex') {
      showStep(currentStep);
    }
  });

  // Iniciar tutorial
  showStep(0);
})();