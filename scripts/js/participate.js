document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.participate__form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const to      = form.dataset.mailto || 'contact@unisa.it';
    const name    = form.querySelector('[name="name"]').value.trim();
    const email   = form.querySelector('[name="email"]').value.trim();
    const aff     = form.querySelector('[name="affiliation"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    const topic   = document.title.split('—')[0].trim();
    const subject = encodeURIComponent(`Collaboration interest — ${topic}`);
    const body    = encodeURIComponent(
      `Hi! I am ${name} and i would like to participate in your project!` +
      `\n\n${message}`
    );

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
});
