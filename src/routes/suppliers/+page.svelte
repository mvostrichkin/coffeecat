<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let suppliers = $derived(data.suppliers);
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-row justify-end">
    <a href="/suppliers/add">
      <div class="rounded-full bg-gray-700 px-4 py-2 font-bold text-white text-lg shadow-xl">Добавить</div>
    </a>
  </div>

  {#if suppliers.length === 0}
    <p class="text-lg">Поставщиков пока нет 🤷‍♀️ Добавим?</p>
  {/if}

  {#if suppliers.length > 0}
    <p class="text-xl font-bold">Поставщиков: {suppliers.length}</p>
  {/if}

  {#each suppliers as supplier}
    <a class="flex flex-row flex-wrap items-center gap-2 bg-white rounded-xl p-4" href={`/suppliers/${supplier.id}`}>
      <div class="bg-gray-700 rounded-full px-4 text-white font-bold">ID: {supplier.id}</div>
      <div class="flex">{supplier.name}</div>
    </a>
  {/each}
</div>
