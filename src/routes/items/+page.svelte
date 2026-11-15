<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let items = $derived(data.items);
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-row justify-end">
    <a href="/items/add">
      <div class="rounded-xl bg-green-500 px-4 py-2 font-bold text-white text-2xl">+</div>
    </a>
  </div>

  {#each items as item}
    <a class="flex flex-row gap-2 bg-white rounded-full p-4" href={`/items/${item.id}`}>
      <h2>id{item.id}</h2>
      <p>{item.name}</p>
    </a>
  {/each}
</div>
