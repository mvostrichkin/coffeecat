<script lang="ts">
  import type { PageData } from './$types';

  let { data  }: { data: PageData } = $props();

  let suppliers = $derived(data.suppliers);
</script>

{#each suppliers as supplier}
  <div class="flex flex-row gap-2 bg-white rounded-md p-4 mb-4">
    <h2>id{supplier.id}</h2>
    <p>{supplier.name}</p>
  </div>
{/each}
