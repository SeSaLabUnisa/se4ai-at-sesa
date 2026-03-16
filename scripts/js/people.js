async function loadPeople() {
  const root = document.getElementById('people-root');

  const text = await fetch('data/sources.yml')
    .then(r => r.text())
    .catch(() => null);

  if (!text) {
    root.innerHTML = '<p style="color:var(--color-text-muted)">Could not load members data.</p>';
    return;
  }

  const config = jsyaml.load(text) || {};
  const members = config.sources || [];

  function renderCard(m) {
    const photo = m.photo
      ? `<img src="data/img/${m.photo}" alt="${m.name}" class="person-card__photo" />`
      : `<div class="person-card__photo"></div>`;
    const nameEl = m.website
      ? `<a href="${m.website}" class="person-card__name" target="_blank" rel="noopener">${m.name}</a>`
      : `<p class="person-card__name">${m.name}</p>`;
    return `
      <div class="person-card">
        ${photo}
        <div class="person-card__body">
          ${nameEl}
          <p class="person-card__role">${m.role || ''}</p>
          <p class="person-card__bio">${m.bio || ''}</p>
        </div>
      </div>`;
  }

  root.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="people__grid">
          ${members.map(renderCard).join('')}
        </div>
      </div>
    </section>`;
}

loadPeople();