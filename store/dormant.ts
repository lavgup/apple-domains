import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface TldState {
	included: boolean,
	set: (val: boolean) => void,
}

export const useDormantStore = create<TldState>(persist(set => ({
	included: false,
	set: (val: boolean) => set(() => ({ included: val })),
}), { name: 'dormant' }));
