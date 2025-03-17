<script lang="ts">
	import PreviousQueries from '../../lib/components/history/previousQueries.svelte';
	import { previousQueries } from '../../stores/previousQueriesStore';
	import { get } from '$lib/utils/api';
	import Toast from '$lib/components/notifications/Toast.svelte';
 	import type { PreviousQuery } from '$lib/types';

	let didFetch: boolean = $state(false);
 
  let notificationStatus: App.NotificationStatus = $state({
		type: '',
		success: false,
		message: '',
		active: false,
		baseMessage: ''
	});

	// Function to make an api call to backend and fetch the history of previous and assigns to the global store 
	async function fetchPreviousQueries() {
		try {
			const result = await get<{success:boolean, data:PreviousQuery[] | undefined}>('/history');

			if (result && result.success && result.data) {
        
				console.log('Fetched Queries:', result.data);

        notificationStatus = {
					type: 'success',
					success: true,
					message: 'Historical Queries are fetched',
					active: true,
					baseMessage: 'Fetch Successful'
				};
				previousQueries.set(result.data);
			} else {
				console.error('Failed to fetch queries:', result);
        notificationStatus = {
					type: 'failure',
					success: false,
					message: 'Something went wrong, Please try again later',
					active: true,
					baseMessage: 'Operation Failed'
				};
			}
		} catch (error) {
      notificationStatus = {
				type: 'failure',
				success: false,
				message: 'Something went wrong, Please Try again later',
				active: true,
				baseMessage: 'Operation Failed'
			};
			console.error('Error fetching previous queries:', error);
		}
	}

	$effect(() => {
		if (!didFetch) {
			console.log('Fetching previous queries...');
			fetchPreviousQueries();
			didFetch = true;
		}
	});

	// Optional: Log whenever tableData changes.

  function clearNotificationStatus() {
		notificationStatus = {
			type: '',
			success: false,
			message: '',
			active: false,
			baseMessage: ''
		};
	}

</script>

<svelte:head>
	<title>{'Historical Queries'}</title>
</svelte:head>
<main class="previous-queries-container">
	<h1 id="previous-queries-title">Historical Queries</h1>
	<p id="previous-queries-description">History of the User's Queries</p>
	<PreviousQueries />
  {#if notificationStatus.active}
  <Toast updatenotificationStatus={clearNotificationStatus}  notificationstatus={notificationStatus} />
{/if}
</main>

<style>
	.previous-queries-container {
		background-color: rgb(255, 255, 255);
		padding: 1rem;
	}
	h1 {
		font-size: 1.5rem;
	}
	#previous-queries-description {
		font-size: 1rem;
		margin: 0.2rem 0;
	}
</style>
