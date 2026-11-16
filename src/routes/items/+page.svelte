<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let items = $derived(data.items);
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-row justify-end">
    <a href="/items/add">
      <div class="rounded-full bg-gray-700 px-4 py-2 font-bold text-white text-lg shadow-xl">Добавить</div>
    </a>
  </div>

  {#if items.length === 0}
    <p class="text-lg">Товаров пока нет 🤷‍♀️ Добавим?</p>
  {/if}

  {#if items.length > 0}
    <p class="text-xl font-bold">Товаров: {items.length}</p>
  {/if}

  {#each items as item}
    <a class="flex flex-row items-center gap-2 bg-white rounded-full p-4" href={`/items/${item.id}`}>
      <div class="bg-gray-700 rounded-full px-4 text-white font-bold">ID: {item.id}</div>
      <div class="flex-1">{item.name}</div>
      <div class="bg-yellow-200 rounded-full px-4 font-bold">{item.sellingPrice} руб.</div>
    </a>
  {/each}
</div>
