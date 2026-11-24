<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  let invoiceData = $derived(data.invoice);

  console.log(invoiceData);
</script>

<div class="flex flex-col gap-4 border-2 border-gray-300 rounded-xl p-4">
  <p class="text-2xl font-bold">#{invoiceData.invoice.id}</p>
  <p class="text-xl">Поставщик: <span class="font-bold">{invoiceData.invoice.supplier_name_snapshot}</span></p>
  <p class="text-xl">Сумма: <span class="font-bold">{invoiceData.invoice.total_price_snapshot} руб.</span></p>
  <p class="text-xl">Статус: <span class="font-bold">{invoiceData.invoice.status}</span></p>
  {#each invoiceData.items as item}
    <a class="flex flex-row gap-4 bg-white rounded-xl p-4" href={`/items/${item.item_id}`}>
      <p class="text-lg">{item.quantity} шт. {item.name_snapshot} по {item.unit_price} руб.</p>
    </a>
  {/each}
</div>
