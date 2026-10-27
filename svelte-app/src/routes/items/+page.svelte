<script lang="ts">
  import type { PageData } from './$types';

  let { data  }: { data: PageData } = $props();

  let items = $derived(data.items);
</script>

{#each items as item}
  <div class="flex flex-row gap-2 bg-white rounded-md p-4 mb-4">
    <h2>id{item.id}</h2>
    <p>{item.name}</p>
  </div>
{/each}
