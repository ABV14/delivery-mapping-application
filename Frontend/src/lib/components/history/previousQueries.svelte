<script lang="ts">
    import { previousQueries } from '../../../stores/previousQueriesStore'; 
    import type { PreviousQuery } from '$lib/types';

    let currentPage:number = $state(1);
    let rowsPerPage:number = $state(10);
    let paginatedQueries:PreviousQuery[] = $state([]);
    let totalPages = $state(1);

    $effect(() => {
        if(paginatedQueries.length==0){
            currentPage=0;  
            totalPages=0;  
        }
        else{
        
        const startingIndex = (currentPage - 1) * rowsPerPage;
       paginatedQueries = $previousQueries.slice(startingIndex, startingIndex + rowsPerPage);

       totalPages = Math.ceil($previousQueries.length / rowsPerPage);
    }
});

    function goToNextPage(){
        if(currentPage < totalPages){
            currentPage += 1;
        }
    }
    function goToPreviousPage(){
        if(currentPage > 1){
            currentPage -= 1;
        }
    }   

</script>

<main  class="previous-queries-table-container">
    <table class="previous-queries">
        <thead>
            <tr>
                <th>Source Address</th>
                <th>Destination Address</th>
                <th>Distance in Miles</th>
                <th>Distance in Kilometers</th>
            </tr>
        </thead>
        <tbody>
            {#if paginatedQueries.length > 0}
            {#each paginatedQueries as query}
                    <tr>
                        <td>{query.source_address}</td>
                        <td>{query.destination_address}</td>
                        <td>{query.distance_miles.toFixed(2)} mi</td>
                        <td>{query.distance_km.toFixed(2)} km</td>
                    </tr>
                {/each}
            {:else}
                <tr>
                    <td colspan="5">No historical queries available.</td>
                </tr>
            {/if}
    </table>
    <div class="pagination">
		<button onclick={goToPreviousPage} disabled={currentPage === 1}>
			Previous
		</button>
		<span>Page {currentPage} of {totalPages}</span>
		<button onclick={goToNextPage} disabled={currentPage === totalPages}>
			Next
		</button>
	</div>
</main>

<style>
    table{
        width: 100%;
        justify-content: space-between;
    }
   .previous-queries-table-container{
    margin-top: 2rem;
    background-color: #f2f2f2;
   }
   thead{
    background-color: #e0e0de;
    /* padding: 2rem; */
    text-align: left;
   }
   tbody{
    background-color: #f8f8f6;
   }
   th, td {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 30px;
  padding-right: 40px;
}
   tr{
    border-bottom: 1px #e0e0de solid;
    padding: 4rem;

   }
    tr:hover {background-color: #ddd;}
    .pagination {
		margin-top: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}
	.pagination button {
        display: flex;
        margin: 4px 10px;
        padding: 0.5rem 0.5rem;
		background-color: rgb(248 248 246);
        color: black;
        border: black solid 2px;
        cursor: pointer;
	}
    .pagination button:disabled {
        background-color: #bbbbb9;  
        color: #949493;
        margin: 4px 10px;
        padding: 0.5rem 0.5rem;
        border: none;
        cursor: pointer;
        cursor: not-allowed;

    }
</style>
