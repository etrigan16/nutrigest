// frontend/nutrigest/hooks/use-toast.ts
export function useToast() {
    // Implementa aquí tu lógica de toast o deja un mock temporal
    return {
      toast: (msg: string) => alert(msg)
    };
  }