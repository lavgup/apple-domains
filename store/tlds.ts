import create from 'zustand';

export interface TldState {
	excluded: string[],
	add: (tld: string) => void,
	remove: (tld: string) => void
}

export const useTldStore = create<TldState>(set => ({
	excluded: [],
	add: (tld: string) => set(state => ({ excluded: [...state.excluded, tld] })),
	remove: (tld: string) => set(state => ({ excluded: state.excluded.filter(t => t !== tld ) }))
}));
