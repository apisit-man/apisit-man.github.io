import './styles.css';
import { AppUI } from './ui/AppUI';
import { store } from './state/store';
import { Locale } from './i18n';

// Routing handler: Hash-based routing preserving ?lang=th|en
function handleRouting() {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang') as Locale | null;

  if (lang && (lang === 'th' || lang === 'en')) {
    if (store.getState().locale !== lang) {
      store.setLocale(lang);
    }
  }

  if (!window.location.hash) {
    window.location.hash = '#/led-polarity';
    store.setRoute('led-polarity');
  } else {
    const hash = window.location.hash.replace(/^#\/?/, '');
    store.setRoute(hash);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app');
  if (!root) return;

  handleRouting();
  window.addEventListener('hashchange', handleRouting);

  const appUI = new AppUI(root);
  appUI.init();
});
