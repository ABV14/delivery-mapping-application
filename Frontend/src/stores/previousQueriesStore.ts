import { writable } from 'svelte/store';
import type { PreviousQuery } from '$lib/types';
export const previousQueries = writable<PreviousQuery[]>([]);
