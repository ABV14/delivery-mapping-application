<!-- Landing page for the distance calculator application-->
<script lang="ts">
	import InputField from '$lib/components/InputField.svelte';
	import DistanceUnitSelector from '$lib/components/distanceCalculator/DistanceUnitSelector.svelte';
	import CalculateButton from '$lib/components/distanceCalculator/CalculateButton.svelte';
	import { post } from '$lib/utils/api';
	import Toast from '$lib/components/notifications/Toast.svelte';
	import { checkInvalidCharacter } from '$lib/utils/inputFieldValidate';
	import type { DistanceResponse, DistanceRequest } from '$lib/types'

	type UnitType = 'Miles' | 'Kilometers' | 'Both';

	let source: string = $state('');
	let destination: string = $state('');
	let unit: UnitType = $state('Miles');
	
	let distanceResult: DistanceResponse = $state({
		distance: {
			miles: 0,
			km: 0
		}
	});

	let notificationStatus: App.NotificationStatus = $state({
		type: '',
		success: false,
		message: '',
		active: false,
		baseMessage: ''
	});

// Function to make an api call to backend and fetch distance between 2 locations
	async function calculateDistance() {
		const requestBody: DistanceRequest = { source, destination };
		try {
			notificationStatus = {
				type: 'loading',
				success: false,
				message: 'Please wait, Calculation in Progress',
				active: true,
				baseMessage: 'Calculation in Progress'
			};

			const result = await post<
				DistanceRequest,
				{
					success: boolean;
					data: { distance_in_Kms: number; distance_in_Miles: number };
					message: string | undefined;
				}
			>('/distance', requestBody);
			console.log("response of distance call", result);
			if (result && result.success && result.data) {
				const distanceInKms: number = Number(result.data.distance_in_Kms);
				const distanceInMiles: number = Number(result.data.distance_in_Miles);
				const mappedResponse: DistanceResponse = {
					distance: {
						miles: distanceInMiles,
						km: distanceInKms
					}
				};
				notificationStatus = {
					type: 'success',
					success: true,
					message: 'The calculation is successful, check the distance',
					active: true,
					baseMessage: 'Calculation Successful'
				};
				distanceResult = mappedResponse;
				console.info('Calculation Successful', mappedResponse);
			} else {
				distanceResult = {
					distance: {
						miles: 0,
						km: 0
					}
				};
				notificationStatus = {
					type: 'failure',
					success: false,
					message: result?.message,
					active: true,
					baseMessage: 'Calculation Failed'
				};
				console.warn('Failed to fetch queries:', result);
			}
		} catch (error) {
			console.error('Error fetching previous queries:', error);
			distanceResult = {
				distance: {
					miles: 0,
					km: 0
				}
			};
			notificationStatus = {
				type: 'failure',
				success: false,
				message: 'Something went wrong, and the calculation failed',
				active: true,
				baseMessage: 'Calculation Failed'
			};
		}
	}

	// This is the function to clear the data of notification componet at the bottom 
	function clearNotificationStatus() {
		notificationStatus = {
			type: '',
			success: false,
			message: '',
			active: false,
			baseMessage: ''
		};
	}

	// Function to check and disable the calculate button 
	function checkDisableStatus() {
		let sourceTextLength = source.length;
		let destinationTextLength = destination.length;
		if (
			!source ||
			!destination ||
			source.trim() === destination.trim() ||
			(sourceTextLength < 5 && destinationTextLength < 5) ||
			checkInvalidCharacter(source) ||
			checkInvalidCharacter(destination)
		) {
			return true;
		}

		return false;
	}
</script>

<svelte:head>
	<title>{'Distance Calculator'}</title>
</svelte:head>
<main class="calculator-container">
	<section class="input-container">
		<div class="inputs">
			<InputField label="Source Address" bind:value={source} />
			<InputField label="Destination Address" bind:value={destination} />
		</div>

		<DistanceUnitSelector bind:unit />
		<div class="distanceResult">
			<p>Distance:</p>
			{#if distanceResult.distance.km !== 0 || distanceResult.distance.miles !== 0}
				<p class="distance">
					{#if unit === 'Miles' || unit === 'Both'}
						<b>{distanceResult.distance.miles.toFixed(2)} mi</b>
					{/if}
					{#if unit === 'Kilometers' || unit === 'Both'}
						<b>{distanceResult.distance.km.toFixed(2)} km</b>
					{/if}
				</p>
			{:else}
				<p class="distance"><i>No data available</i></p>
			{/if}
		</div>
	</section>

	{#if source && destination && source.trim() === destination.trim()}
		<span class="error">{'Source and Destination cannot be same'}</span>
	{/if}

	<CalculateButton {calculateDistance} disabledState={checkDisableStatus()} />

	{#if notificationStatus.active}
		<Toast
			updatenotificationStatus={clearNotificationStatus}
			notificationstatus={notificationStatus}
		/>
	{/if}
</main>

<style>
	.calculator-container {
		background-color: rgb(255, 255, 255);
		padding: 0.5rem 1rem;
	}
	.input-container {
		display: flex;
		margin: 1rem 0.5rem 2rem 0;
	}
	.inputs {
		display: flex;
		gap: 1rem;
		width: 75%;
	}
	.distanceResult {
		width: 10%;
	}
	.distance {
		margin: 0.5rem 0;
		font-size: 1rem;
		color: #4b4949;
	}
	.distanceResult p {
		color: #4b4949;
	}
	.distance b {
		margin: 0 1rem 0 0;
	}
	.error {
		color: red;
		font-size: 0.875rem;
		margin-top: 0.25rem;
	}
</style>
