'use client';

import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * Un componente invisible que escucha los eventos 'permission-error' emitidos globalmente.
 * Lanza cualquier error recibido para que sea capturado por el global-error.tsx de Next.js.
 */
export function FirebaseErrorListener() {
  // Usar el tipo de error específico para el estado por seguridad de tipos.
  const [error, setError] = useState<FirestorePermissionError | null>(null);

  useEffect(() => {
    // El callback ahora espera un error fuertemente tipado, que coincida con la carga útil del evento.
    const handleError = (error: FirestorePermissionError) => {
      // Establecer el error en el estado para activar una nueva renderización.
      setError(error);
    };

    // El emisor tipado se asegurará de que el callback para 'permission-error'
    // coincida con el tipo de carga útil esperado (FirestorePermissionError).
    errorEmitter.on('permission-error', handleError);

    // Darse de baja al desmontar para evitar fugas de memoria.
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  // Al volver a renderizar, si existe un error en el estado, lanzarlo.
  if (error) {
    throw error;
  }

  // Este componente no renderiza nada.
  return null;
}
