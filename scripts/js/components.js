class SiteHeader extends HTMLElement {
  async connectedCallback() {
    const active = this.getAttribute('active') || '';
    const base   = this.getAttribute('base')   || '.';
    const html = await fetch(`${base}/header.html`).then(r => r.text());

    const tmp = document.createElement('div');
    tmp.innerHTML = html;

    // Rewrite relative hrefs and mark active page
    tmp.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href.startsWith('http')) {
        if (href === active) a.setAttribute('aria-current', 'page');
        a.setAttribute('href', `${base}/${href}`);
      }
    });

    this.replaceWith(...tmp.childNodes);
  }
}

class SiteFooter extends HTMLElement {
  async connectedCallback() {
    const base = this.getAttribute('base') || '.';
    const html = await fetch(`${base}/footer.html`).then(r => r.text());
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    this.replaceWith(...tmp.childNodes);
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
