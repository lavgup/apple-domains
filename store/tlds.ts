import create from 'zustand';

export interface TldState {
	excluded: string[],
	highlighted: string[],
	exclude: (tld: string) => void,
	include: (tld: string) => void
}

export const useTldStore = create<TldState>(set => ({
	excluded: [],
	highlighted: [],
	exclude: (tld: string) => set(state => ({ excluded: [...state.excluded, tld] })),
	include: (tld: string) => set(state => ({ excluded: state.excluded.filter(t => t !== tld ) }))
}));
