<script lang="ts">
      let {unit = $bindable("")} = $props();
</script>

<div class="unit-selector">
    <h1>Unit</h1>
    <label><input type="radio" bind:group={unit} value="Miles"> Miles</label>
    <label><input type="radio" bind:group={unit} value="Kilometers"> Kilometers</label>
    <label><input type="radio" bind:group={unit} value="Both"> Both</label>
</div>

<style>
    .unit-selector {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin: 0 1rem;
    }
    h1{
        color: #4b4949;
    }
</style>
