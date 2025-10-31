(function () {
  const overlay = document.getElementById('overlay');
  const modal = document.getElementById('modal');
  const openBtn = document.getElementById('open-modal');
  const showToastBtn = document.getElementById('show-toast');
  const closeBtn = document.getElementById('modal-close');
  const cancelBtn = document.getElementById('modal-cancel');
  const confirmBtn = document.getElementById('modal-confirm');
  const toastContainer = document.getElementById('toast-container');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const toastTypeSelect = document.getElementById('toast-type');
  const toastPositionSelect = document.getElementById('toast-position');
  const toastDurationInput = document.getElementById('toast-duration');
  const toastProgressCheck = document.getElementById('toast-progress');
  const toastPauseCheck = document.getElementById('toast-pause');
  const modalForm = document.getElementById('modal-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');

  let lastFocusedElement = null;
  let currentTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(currentTheme);

  const MAX_VISIBLE_TOASTS = 3;
  const toastQueue = [];
  let visibleToasts = 0;

  function openModal() {
    lastFocusedElement = document.activeElement;
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    // allow transition
    requestAnimationFrame(() => {
      overlay.classList.add('show');
      modal.classList.add('show');
    });
    // focus first focusable in modal
    closeBtn.focus();
    document.addEventListener('keydown', onKeyDown, { once: false });
  }

  function closeModal() {
    overlay.classList.remove('show');
    modal.classList.remove('show');
    const onEnd = () => {
      overlay.classList.add('hidden');
      modal.classList.add('hidden');
      overlay.removeEventListener('transitionend', onEnd);
    };
    overlay.addEventListener('transitionend', onEnd);
    document.removeEventListener('keydown', onKeyDown);
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
    if ((e.key === 'm' || e.key === 'M') && !modal.classList.contains('show')) {
      openModal();
    }
    if (e.key === 't' || e.key === 'T') {
      spawnConfiguredToast();
    }
    if (e.key === 'd' || e.key === 'D') {
      toggleTheme();
    }
    // simple focus trap
    if (e.key === 'Tab' && modal.classList.contains('show')) {
      const focusables = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function showToast(message, options = {}) {
    const { type = 'success', durationMs = 3000, showProgress = true, pauseOnHover = true } = options;

    const createToastEl = () => {
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.innerHTML = `
        <span class="dot" aria-hidden="true">${iconForType(type)}</span>
        <div>
          <div>${message}</div>
          <div class="label">Click to dismiss</div>
        </div>
        <button class="toast-close" aria-label="Dismiss">×</button>
        ${showProgress ? '<div class="progress"><span></span></div>' : ''}
      `;

      const remove = () => {
        if (!toast.isConnected) return;
        toast.style.transition = 'opacity 150ms ease, transform 150ms ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.addEventListener('transitionend', () => {
          toast.remove();
          visibleToasts = Math.max(0, visibleToasts - 1);
          dequeueToast();
        }, { once: true });
      };

      let remaining = durationMs;
      let start = Date.now();
      let timer = setTimeout(remove, remaining);
      const progressBar = toast.querySelector('.progress > span');
      let raf;

      const tick = () => {
        const elapsed = Date.now() - start;
        const ratio = Math.max(0, 1 - elapsed / durationMs);
        if (progressBar) progressBar.style.transform = `scaleX(${ratio})`;
        if (ratio > 0) raf = requestAnimationFrame(tick);
      };

      if (progressBar) raf = requestAnimationFrame(tick);

      const pause = () => {
        clearTimeout(timer);
        remaining -= Date.now() - start;
        cancelAnimationFrame(raf);
      };
      const resume = () => {
        start = Date.now();
        timer = setTimeout(remove, remaining);
        if (progressBar) raf = requestAnimationFrame(tick);
      };

      if (pauseOnHover) {
        toast.addEventListener('mouseenter', pause);
        toast.addEventListener('mouseleave', resume);
      }

      toast.addEventListener('click', (e) => {
        if (e.target.closest('.toast-close') || e.currentTarget === e.target) {
          remove();
        }
      });

      return toast;
    };

    const enqueueToast = () => {
      toastQueue.push({ createToastEl });
      dequeueToast();
    };

    const dequeueToast = () => {
      if (visibleToasts >= MAX_VISIBLE_TOASTS) return;
      const next = toastQueue.shift();
      if (!next) return;
      const toastEl = next.createToastEl();
      toastContainer.appendChild(toastEl);
      visibleToasts += 1;
    };

    enqueueToast();
  }

  function iconForType(type) {
    switch (type) {
      case 'error': return '⚠️';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '✅';
    }
  }

  function setToastPosition(position) {
    toastContainer.classList.remove('bottom-right', 'bottom-left', 'top-right', 'top-left');
    toastContainer.classList.add(position);
  }

  function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
    showToast(`Switched to ${currentTheme} theme`, { type: 'info', durationMs: 1500, showProgress: false });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function spawnConfiguredToast() {
    const type = toastTypeSelect?.value || 'success';
    const position = toastPositionSelect?.value || 'bottom-right';
    const durationMs = Number(toastDurationInput?.value || 3000);
    const showProgress = !!toastProgressCheck?.checked;
    const pauseOnHover = !!toastPauseCheck?.checked;
    setToastPosition(position);
    showToast(`This is a ${type} toast.`, { type, durationMs, showProgress, pauseOnHover });
  }

  // Wire events
  openBtn.addEventListener('click', openModal);
  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  confirmBtn?.addEventListener('click', (e) => {
    if (!modalForm) {
      closeModal();
      showToast('Action confirmed!', { type: 'success' });
    }
  });

  showToastBtn.addEventListener('click', spawnConfiguredToast);
  themeToggleBtn?.addEventListener('click', toggleTheme);

  if (toastPositionSelect) setToastPosition(toastPositionSelect.value);

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      nameError.textContent = '';
      emailError.textContent = '';

      if (!nameInput.value || nameInput.value.trim().length < 2) {
        nameError.textContent = 'Please enter at least 2 characters.';
        valid = false;
      }
      if (!emailInput.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email.';
        valid = false;
      }

      if (!valid) {
        showToast('Please fix the form errors.', { type: 'warning' });
        return;
      }

      closeModal();
      showToast(`Thanks, ${nameInput.value}! We'll contact you at ${emailInput.value}.`, { type: 'success' });
      modalForm.reset();
    });
  }
})();


