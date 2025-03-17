<!-- Layout for static header among different routes -->
<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<div class="mainAppContainer">
	<Header title="Distance Calculator" />
	<main>
		<slot />
	</main>
</div>

<style>
	.mainAppContainer {
		background-color: rgb(248 248 246);
		height: 100vh;
		padding: 1rem;
	}
</style>
