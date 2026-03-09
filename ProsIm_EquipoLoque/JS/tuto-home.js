(function() {
  // Pasos del tutorial para home.html
  const steps = [
    { selector: 'nav.header-navigation a[href="home.html"]', text: "En este lado encontrarás el menú para acceder al escaner", desiredOrientation: 'bottom' },
    { selector: '#btnActivar', text: "Aqui puedes abrir la cámara para poder escanear una bandera y se genere un modelo AR en base a esa bandera", desiredOrientation: 'bottom' },
    { selector: '.info-box', text: "Aqui se despliega la información de la bandera que escanees", desiredOrientation: 'bottom' },
    { selector: '.actions button:nth-child(1)', text: "Anima al modelo 3D para hacer un saludo", desiredOrientation: 'bottom' },
    { selector: '.actions button:nth-child(2)', text: "Anima el modelo 3D para hacer un baile", desiredOrientation: 'bottom' },
    { selector: '.actions button:nth-child(3)', text: "Aplica un efecto al modelo 3D", desiredOrientation: 'bottom' },
    { selector: '.actions button:nth-child(4)', text: "Aplica un efecto al modelo 3D", desiredOrientation: 'bottom' }
  ];

  const overlay = document.getElementById('tutorial-overlay');
  const bubble = document.getElementById('tutorial-bubble');
  const textEl = document.getElementById('tutorial-text');
  const nextBtn = document.getElementById('tutorial-next');
  const arrow = document.getElementById('tutorial-arrow');

  let currentStep = 0;

  // Opcional: evitar mostrar el tutorial si ya se vio
  // if (localStorage.getItem('tutorialHomeShown')) return;
  // localStorage.setItem('tutorialHomeShown', 'true');

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

    // Forzar recálculo de dimensiones de la burbuja
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