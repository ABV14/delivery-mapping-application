// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		
		type NotificationStatus = {
			type: string;
			success: boolean;
			message: string | undefined;
			active: boolean;
			baseMessage: string | undefined;
		};
	}
}

export {NotificationStatus};
