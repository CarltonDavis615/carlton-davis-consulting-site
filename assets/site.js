const button = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
if (button && nav) {
  button.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
  }));
}

const headerBrand = document.querySelector('.site-header .brand');
if (headerBrand) {
  const logoPath = new URL('cdc-logo.png', document.currentScript.src).href;
  headerBrand.classList.add('brand-logo');
  headerBrand.innerHTML = `<img src="${logoPath}" width="838" height="190" alt="Carlton Davis Consulting">`;
  const logoStyles = document.createElement('style');
  logoStyles.textContent = '.brand-logo{display:block;width:clamp(175px,20vw,240px);line-height:0}.brand-logo img{width:100%;height:auto}';
  document.head.append(logoStyles);
}

const isWorkshopPage = location.pathname.includes('/ai-workshops-speaking/');
const isGitHubPagesPreview = location.hostname.endsWith('.github.io');
if (location.protocol === 'file:' || isGitHubPagesPreview) {
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (location.protocol === 'file:' && href === 'ai-workshops-speaking/') link.setAttribute('href', 'ai-workshops-speaking/index.html');
    if (location.protocol === 'file:' && isWorkshopPage && href === './') link.setAttribute('href', 'index.html');
    if (isWorkshopPage && href?.startsWith('/#')) link.setAttribute('href', location.protocol === 'file:' ? `../index.html${href.slice(1)}` : `../${href.slice(1)}`);
    if (href === '/') link.setAttribute('href', location.protocol === 'file:' ? (isWorkshopPage ? '../index.html' : 'index.html') : (isWorkshopPage ? '../' : './'));
  });
}
document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.removeAttribute('target');
  link.removeAttribute('rel');
});
