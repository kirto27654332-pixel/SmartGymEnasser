import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DEFAULT_SITE_CONTENT } from '../data/defaultSiteContent';
import { fetchSiteContent, mergeSiteContent, saveSiteContent } from '../lib/firestore';
import { isFirebaseConfigured } from '../config/firebase';

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_SITE_CONTENT);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [source, setSource] = useState('local');

  const load = useCallback(async () => {
    if (!isFirebaseConfigured) {
      setContent(DEFAULT_SITE_CONTENT);
      setSource('local');
      setLoading(false);
      return;
    }

    try {
      const fetched = await fetchSiteContent();
      if (fetched) {
        setContent(mergeSiteContent(fetched));
        setSource('firestore');
      } else {
        setContent(DEFAULT_SITE_CONTENT);
        setSource('local');
      }
    } catch {
      setContent(DEFAULT_SITE_CONTENT);
      setSource('local');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const persist = useCallback(async (nextContent) => {
    setContent(nextContent);
    await saveSiteContent(nextContent);
    setSource('firestore');
  }, []);

  const value = useMemo(
    () => ({
      content,
      loading,
      source,
      reload: load,
      persist,
      setContent,
    }),
    [content, loading, source, load, persist],
  );

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error('useSiteContent must be used within SiteContentProvider');
  return ctx;
}
