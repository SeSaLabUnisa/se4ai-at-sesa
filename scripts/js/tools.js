async function loadTools() {
  const root = document.getElementById('tools-root');

  const tools = await fetch('data/tools.json')
    .then(r => r.json())
    .catch(() => []);

  if (tools.length === 0) {
    root.innerHTML = '<p style="color:var(--color-text-muted)">No tools yet — check back soon.</p>';
    return;
  }

  root.innerHTML = tools.map(t => `
    <div class="tool-card">
      <h2 class="tool-card__name">${t.name}</h2>
      <p class="tool-card__description">${t.description}</p>
      <div class="tool-card__actions">
        ${t.repo
          ? `<a href="${t.repo}" class="btn btn--primary" target="_blank" rel="noopener">View on GitHub →</a>`
          : ''}
        ${t.paper
          ? `<a href="${t.paper}" class="btn btn--secondary" target="_blank" rel="noopener">Read the paper →</a>`
          : ''}
      </div>
    </div>
  `).join('');
}

loadTools();
