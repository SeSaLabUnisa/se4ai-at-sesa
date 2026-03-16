async function loadOngoing() {
  const root = document.getElementById('ongoing-root');

  const works = await fetch('data/ongoing.json').then(r => r.json()).catch(() => []);

  if (works.length === 0) {
    root.innerHTML = '<p style="color:var(--color-text-muted)">Nothing here yet — check back soon.</p>';
    return;
  }

  root.innerHTML = `<div class="cards">${works.map(w => `
    <div class="card">
      <div class="card__header">
        <span class="card__icon">${w.icon}</span>
        <h3 class="card__title">${w.title}</h3>
      </div>
      <p class="card__text">${w.description}</p>
      <div class="card__footer">
        <a href="${w.url}" class="card__btn card__btn--outline">Read more →</a>
      </div>
    </div>
  `).join('')}</div>`;
}

loadOngoing();
