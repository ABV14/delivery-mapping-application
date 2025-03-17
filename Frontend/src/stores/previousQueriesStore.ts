/**
 * Store for maintaining an array of previous query records.
 *
 * Each record in the store conforms to the PreviousQuery type, which includes details such as
 * source and destination addresses, calculated distances in miles and kilometers
 *
 * 
 */

import { writable } from 'svelte/store';
import type { PreviousQuery } from '$lib/types';
export const previousQueries = writable<PreviousQuery[]>([]);
