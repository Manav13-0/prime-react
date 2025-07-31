import { useEffect, useRef, useState } from 'react';
import type { ArtItem } from './types';

export function useArtworkData(page: number) {
  const [data, setData] = useState<ArtItem[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const pageRef = useRef<number | null>(null);

  useEffect(() => {
    if (pageRef.current === page) return;
    pageRef.current = page;

    const timer = setTimeout(() => setLoading(true), 150);

    fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setTotalRecords(res.pagination.total);
      })
      .finally(() => {
        clearTimeout(timer);
        setLoading(false);
      });

    return () => clearTimeout(timer); 
  }, [page]);

  return { data, totalRecords, loading };
}