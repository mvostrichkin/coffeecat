<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let items = $derived(data.items);
</script>

{#each items as item}
  <a class="flex flex-row gap-2 bg-white rounded-full p-4 mb-4" href={`/items/${item.id}`}>
    <h2>id{item.id}</h2>
    <p>{item.name}</p>
  </a>
{/each}
