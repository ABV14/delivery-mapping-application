<script>
    import { onMount } from 'svelte';
    let {notificationstatus, updatenotificationStatus} = $props();



    let visible = $state(false);

    const closeToast = () => {
    visible = false;
    updatenotificationStatus({});
  };


    onMount(() => {
      visible = true;   
    });

   



  </script>
  
  <style>
    .toast {
    display: flex;
      flex-direction: row;
      position: fixed;
      bottom: 20px; /* Distance from bottom */
      right: 20px;  /* Distance from right (bottom right corner) */
      background-color: rgba(0, 0, 0, 0.8);
      color: #fff;
      padding: 16px;
      border-radius: 4px;
      opacity: 0;
      transform: translateY(100%);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .toast.visible {
      display: flex;
      flex-direction: row;
      opacity: 1;
      width:15%;
      transform: translateY(0);
      padding: 0.5rem;
    }
    .iconContainer{
        display: flex;
        flex-direction: row;
        font-weight: bold;
         /* font-size: 1.5rem; */
    }
    .toastTitle{
        font-weight: bold;
    }
    .close-btn {
        height: 40%;
    background: transparent;
    border: none;
    color: black;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    width: 16px;
    padding: 0px;
  }

  .toast.success {
    background-color: #d4ffde;
    color: black;
    border:1px rgb(47, 255, 92) solid;
    border-left: 3px rgb(47, 255, 47) solid;
  }
  .toast.failure {
    background-color: #fff9ed;
    color: black;
    border:1px red solid;
    border-left: 3px red solid;
  }
  .toast.loading {
    background-color: #42b5ee;
    color: black;
    border:1px rgb(4, 0, 255) solid;
    border-left: 3px rgb(12, 8, 129) solid;
  }
.success-status{
    height: 35%;
    margin: 0 1rem;
    width: 16px;
    font-weight: bolder;
    filter: invert(68%) sepia(100%) saturate(7500%) hue-rotate(75deg) brightness(103%) contrast(101%);

}
.failure-status{
    height: 35%;
    margin: 0 1rem;
    transform: rotate(90deg);
    width: 16px;
    filter: invert(17%) sepia(100%) saturate(7460%) hue-rotate(1deg) brightness(99%) contrast(101%);


}
.toastTextContainer{
    margin: 0 1rem;
    padding: 0;
}

  </style>

 <div class="toast {visible ? 'visible' : ''} {notificationstatus.type}">
    <div class="iconContainer">
    {#if notificationstatus.type === 'success'}
      <img class="success-status" src="success.svg" alt="calculation succesful">
    {/if}
    {#if notificationstatus.type === 'failure'}
    <img class="failure-status" src="failure.svg" alt="calculation failed">
    {/if}
</div>
    <div class="toastTextContainer">
    <p class="toastTitle">
        {notificationstatus.baseMessage}
    </p>
    <p>{notificationstatus.message}</p>
</div>
<button class="close-btn" onclick={closeToast}>×</button>
  </div>
  
  