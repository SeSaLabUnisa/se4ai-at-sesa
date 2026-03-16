async function loadProjects() {
  const root = document.getElementById('projects-root');

  const projects = await fetch('data/projects.json')
    .then(r => r.json())
    .catch(() => []);

  if (projects.length === 0) {
    root.innerHTML = '<p style="color:var(--color-text-muted)">No projects yet — check back soon.</p>';
    return;
  }

  root.innerHTML = projects.map(p => `
    <div class="project-card">
      <div class="project-card__header">
        <div>
          <p class="project-card__acronym">${p.acronym}</p>
          <p class="project-card__name">${p.name}</p>
        </div>
        ${p.url
          ? `<a href="${p.url}" class="project-card__link" target="_blank" rel="noopener" aria-label="Visit ${p.acronym} website">↗</a>`
          : ''}
      </div>
      <p class="project-card__description">${p.description}</p>
      <div class="project-card__footer">
        <span class="project-card__programme">${p.programme}</span>
        <span class="project-card__years">${p.start}–${p.end}</span>
      </div>
    </div>
  `).join('');
}

loadProjects();
