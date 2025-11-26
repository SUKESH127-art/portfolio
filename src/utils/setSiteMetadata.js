import siteMetadata from '../data/entire_site/siteMetadata.json';

/**
 * Sets site metadata from JSON configuration
 * Updates document title, favicon, and meta tags
 */
export const setSiteMetadata = () => {
  // Set document title
  document.title = siteMetadata.title;

  // Set favicon
  let favicon = document.querySelector("link[rel='icon']");
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }
  favicon.href = siteMetadata.favicon;

  // Set or update meta tags
  const setMetaTag = (name, content, isProperty = false) => {
    const attribute = isProperty ? 'property' : 'name';
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  // Set all meta tags from JSON
  if (siteMetadata.meta) {
    Object.entries(siteMetadata.meta).forEach(([key, value]) => {
      const isProperty = key.startsWith('og:');
      setMetaTag(key, value, isProperty);
    });
  }
};

