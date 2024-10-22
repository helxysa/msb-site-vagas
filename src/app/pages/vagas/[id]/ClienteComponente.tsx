'use client';

import { useAuth } from '@/app/componentes/AuthContext/AuthContext';
import { useEffect } from 'react';

export default function ClientComponent({ vagaId }: { vagaId: string }) {
  const { setSelectedVagaId } = useAuth();

  useEffect(() => {
    setSelectedVagaId(vagaId);
  }, [vagaId, setSelectedVagaId]);

  return null; 
}