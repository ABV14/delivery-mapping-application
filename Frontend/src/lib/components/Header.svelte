<script lang="ts">
    import { goto } from "$app/navigation";
    import {derived} from "svelte/store";
    import { page } from "$app/stores";
    
    const { title } = $props<{ title: string }>();

    const currentPage = derived(page, ($page) => $page.url.pathname);

    let pageState = $state({
    buttonLabel : "View Historical Queries",
     targetPage : "/history",
     iconSrc : '/previous-queries.svg',
     className : "historyButton",
     alt : "Previous Queries",
     iconClassName : "historyIcon"
        
    })
   

    $effect(() => {
	if ($currentPage === "/history") {
		pageState = {
			buttonLabel: "Back to Calculator",
			targetPage: "/",
			iconSrc: "/calculator.svg",
			className: "calculatorButton",
			iconClassName: "calculatorIcon",
			alt: "Back to Calculator"
		};
	} else {
		pageState = {
			buttonLabel: "View Historical Queries",
			targetPage: "/history",
			iconSrc: "/previous-queries.svg",
			className: "historyButton",
			alt: "Previous Queries",
			iconClassName: "historyIcon"
		};
	}
});

    function navigationBetweenPages() {
        goto(pageState.targetPage);
    }

</script>

<header class="header">
    <div>
        <h1 class="appTitle">{title}</h1>
        <p class="appDescription">Prototype web application for calculating the distance betwee two addresses.</p>
    </div>
    
    <button class={pageState.className} onclick={navigationBetweenPages}>
        {pageState.buttonLabel}
        <img class={pageState.iconClassName}  src={pageState.iconSrc} alt={pageState.alt}>
    </button>
</header>


<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        margin: 2px 0px;
        /* background: #f8f8f8; */
        /* border-bottom: 1px solid #ccc; */
    }
    .appTitle{
        font-size: 3rem;
        color: rgb(34 34 34);
        /* font-weight: bold; */
    }
    .appDescription{
        color: rgb(87, 82, 82);
    }
    .historyButton {
        display: flex;
        margin: 5px 10px;
        padding: 1rem 1rem;
        background: #000000;
        color: white;
        border: none;
        cursor: pointer;
    }
    .historyIcon{
        color: white;
        margin: 5px 10px;
        width: 16px;
        height: 16px;
        filter: invert(1); 

    }
    .calculatorButton{
        display: flex;
        margin: 5px 10px;
        padding: 1rem 1rem;
		background-color: rgb(248 248 246);
        color: black;
        border: black solid 2px;
        cursor: pointer;
    }
    .calculatorIcon{
        margin: 5px 10px;
        width: 16px;
        height: 16px;
    }
</style>