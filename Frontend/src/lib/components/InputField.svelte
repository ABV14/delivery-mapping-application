<script lang="ts">
    import {validateField} from '$lib/utils/inputFieldValidate'

    let {label, value = $bindable("")} = $props();
    let error: { message: string; valid: boolean; } = $state({
        message: "",
        valid: false 
    }); 


function validation(value:string, label:string){
		error = validateField(value, label);
        console.log(error,'error is ')
	}
</script>

<div class="input-group">
    <label for="input-field">{label}</label>
    <input id="input-field" type="text" 
    bind:value={value} placeholder="Input address" onblur={()=>validation(value,label)}
    oninput={()=>validation(value,label)}
    />
    {#if error.message && !error.valid}
    <span class="error">{error.message}</span>
  {/if}
</div>

<style>
    .input-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        width: 75%;
    }
    input[type="text"]{
        background-color: #f8f8f6;
        border : none;
        border-bottom: 2px solid #7d7d7c;
        text-align: left;
    }
    input:focus{
        border:2px solid black
    }
    label{
        color: #4b4949;
        margin-bottom: 0.5rem;
    }
    .error {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
</style>
