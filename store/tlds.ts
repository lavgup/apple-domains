import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface TldState {
	excluded: string[],
	exclude: (tld: string) => void,
	include: (tld: string) => void
}

export const useTldStore = create<TldState>(set => ({
	excluded: [],
	exclude: (tld: string) => set(state => ({ excluded: [...state.excluded, tld] })),
	include: (tld: string) => set(state => ({ excluded: state.excluded.filter(t => t !== tld ) }))
}));
