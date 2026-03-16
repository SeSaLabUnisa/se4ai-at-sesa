async function loadPublications() {
  const root = document.getElementById('pub-root');

  const [publications, memberMap] = await Promise.all([
    fetch('data/publications.json').then(r => r.json()).catch(() => []),
    fetch('data/sources.yml').then(r => r.text()).then(text => {
      const config = jsyaml.load(text) || {};
      const map = new Map();
      for (const m of (config.sources || [])) {
        if (m.website) {
          map.set((m.pub_name || m.name).trim(), m.website);
        }
      }
      return map;
    }).catch(() => new Map()),
  ]);

  if (publications.length === 0) {
    root.innerHTML = '<p style="color:var(--color-text-muted)">No publications yet — check back soon.</p>';
    return;
  }

  function linkifyAuthors(authorsStr) {
    return authorsStr.split(', ').map(author => {
      const website = memberMap.get(author.trim());
      return website
        ? `<a href="${website}" class="pub__author--local" target="_blank" rel="noopener">${author}</a>`
        : author;
    }).join(', ');
  }

  const sorted = [...publications].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));

  const byYear = sorted.reduce((acc, pub) => {
    (acc[pub.year] = acc[pub.year] || []).push(pub);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => b - a);

  root.innerHTML = years.map(year => `
    <h2 class="pub-year-heading">${year}</h2>
    <ul class="pub-list">
      ${byYear[year].map(pub => `
        <li class="pub">
          <div class="pub__meta">
            <span class="pub__venue">${pub.venue}</span>
          </div>
          <div class="pub__body">
            ${pub.url
              ? `<a href="${pub.url}" class="pub__title" target="_blank" rel="noopener">${pub.title}</a>`
              : `<p class="pub__title">${pub.title}</p>`
            }
            ${pub.venue_detail ? `<p class="pub__venue-detail">${pub.venue_detail}</p>` : ''}
            <p class="pub__authors">${linkifyAuthors(pub.authors)}</p>
          </div>
          ${pub.url
            ? `<a href="${pub.url}" class="pub__link" aria-label="View paper" target="_blank" rel="noopener">↗</a>`
            : `<span class="pub__link pub__link--disabled" aria-hidden="true">↗</span>`
          }
        </li>
      `).join('')}
    </ul>
  `).join('');
}

loadPublications();