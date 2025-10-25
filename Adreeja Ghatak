// Description: Generates a random color and applies it to the page background.
// How to use: include this script in any HTML page, or paste into browser console.

(function () {
  function randomHexColor() {
    // generate a random integer between 0 and 0xFFFFFF, convert to hex, pad to 6 chars
    const hex = Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0');
    return `#${hex}`;
  }

  function applyRandomBackground() {
    const color = randomHexColor();
    if (typeof document !== 'undefined' && document.body) {
      document.body.style.backgroundColor = color;
    }
    console.log('Applied background color:', color);
    return color;
  }

  // Auto-run when loaded in a browser
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      applyRandomBackground();
    });
  }

  // Export for Node / manual calls
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { randomHexColor, applyRandomBackground };
  } else {
    // attach to window for easy manual testing in browser console
    window.__randomColor = { randomHexColor, applyRandomBackground };
  }
})();
