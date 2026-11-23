<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  let invoice = $derived(data.invoice);
</script>

<div class="flex flex-col gap-4 border-2 border-gray-300 rounded-xl p-4">
  <p class="text-2xl font-bold">#{invoice.id}</p>
  <p class="text-xl">Поставщик: <span class="font-bold">{invoice.supplierName}</span></p>
  <p class="text-xl">Статус: <span class="font-bold">{invoice.status}</span></p>
</div>
