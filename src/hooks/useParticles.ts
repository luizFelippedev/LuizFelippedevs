// Para este hook funcionar, você precisa ter um store do Zustand
// Exemplo em: src/store/particleStore.ts
// import { create } from 'zustand';
//
// type ParticleState = {
//   type: 'dots' | 'matrix' | 'neural';
//   setType: (type: ParticleState['type']) => void;
// };
//
// export const useParticleStore = create<ParticleState>((set) => ({
//   type: 'dots',
//   setType: (type) => set({ type }),
// }));

import { useParticleStore } from '@/store/particleStore'; // Supondo que o store exista

export const useParticles = () => {
  const { type, setType } = useParticleStore();

  return {
    currentParticleSystem: type,
    setParticleSystem: setType,
  };
};