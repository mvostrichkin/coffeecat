<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let invoices = $derived(data.invoices);
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-row justify-end">
    <a href="/invoices/add">
      <div class="rounded-full bg-gray-700 px-4 py-2 font-bold text-white text-lg shadow-xl">Добавить</div>
    </a>
  </div>

  {#if invoices.length === 0}
    <p class="text-lg">Поставок пока нет 🤷‍♀️ Добавим?</p>
  {/if}

  {#if invoices.length > 0}
    <p class="text-xl font-bold">Поставок: {invoices.length}</p>
  {/if} 

  {#each invoices as invoice}
    <a class="flex flex-row flex-wrap items-center gap-2 bg-white rounded-xl p-4" href={`/invoices/${invoice.id}`}>
      <div class="flex-1 font-bold text-gray-500"># {invoice.id}</div>
      <div class="flex-1 font-bold ">{invoice.supplier_name_snapshot}</div>
      <div class="flex-1">{invoice.items_count_snapshot} ед. на сумму {invoice.total_price_snapshot}</div>
      {#if invoice.status === 'posted'}
        <div class="text-green-600 font-bold">Проведена</div>
      {:else if invoice.status === 'draft'}
        <div class="text-orange-600 font-bold">Ждёт проведения</div>
      {/if}
    </a>
  {/each}
</div>
