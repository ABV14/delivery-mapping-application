<script lang="ts">
    let {calculateDistance, disabledState} = $props()
</script>

<div class={`calculateButtonContainer ${disabledState ? "buttonDisabled" : ""}`}>
    <button class="calculateButton"  onclick={calculateDistance} disabled={disabledState}>
    <p>{"Calculate Distance"}</p>
    
</button>
<img class="calculatorIcon"  src="/calculator.svg" alt="Calculate Distance">
</div>

<style>
    .calculateButtonContainer {
        display: flex;
        justify-content: space-between;
        margin: 5px 10px;
        padding: 1rem 1rem;
        background: #c00101;
        color: white;
        border: none;
        cursor: pointer;
        width: 10%;
    }
    .buttonDisabled{
        background-color: #bbbbb9;  
        color: #949493;
        display: flex;
        justify-content: space-between;
        margin: 5px 10px;
        padding: 1rem 1rem;
        border: none;
        cursor: pointer;
        width: 10%;
        cursor: not-allowed;

    }
    .buttonDisabled .calculatorIcon{
        filter: invert(0.5);

    }
   
     .calculateButton{
        
        cursor: pointer;
     }
     .calculateButton:disabled{
        cursor: not-allowed;
        background-color: #bbbbb9;  
        color: #949493;
     }
    .calculatorIcon{
        display: inline-block;
        color: inherit;
        width: 16px;
        height: 16px;
        margin: 5px 0px;
        filter: invert(1);

    }
    </style>