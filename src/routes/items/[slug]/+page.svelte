<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  let item = $derived(data.item);

  console.log(item);
</script>

<div class="flex flex-col gap-4 border-2 border-gray-300 rounded-xl p-4">
  <p class="text-2xl font-bold">{item.name}</p>
  <p class="text-xl">Внешний ID: <span class="font-bold">{item.external_id}</span></p>
  <p class="text-xl">Цена продажи: <span class="font-bold">{item.sellingPrice}</span> рублей</p>
  <p class="text-xl">Остаток: <span class="font-bold">{item.stock || 'неизвестно'}</span> шт.</p>
  <form action="?/deleteItem" method="post">
    <button class="rounded-full bg-red-500 px-4 py-2 font-bold text-white text-lg shadow-lg">Удалить</button>
  </form>
</div>
