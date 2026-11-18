// Every "Book a scoping call" button takes the visitor to the booking section on the same page.
(() => {
  const go = (e) => {
    const btn = e.target.closest && e.target.closest('.js-book, .mobile-book, .scoping-cta');
    if (!btn) return;
    const target = document.getElementById('book');
    if (!target) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    const dialog = btn.closest('dialog');
    if (dialog && dialog.open) dialog.close();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  // Capture phase runs before the pages' own click handlers, so the form does not open.
  document.addEventListener('click', go, true);
})();
