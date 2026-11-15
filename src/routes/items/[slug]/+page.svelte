<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  let item = $derived(data.item);
</script>

<p class="text-2xl font-bold">{item.name}</p>
<p class="text-lg">id: {item.id}</p>
<p class="text-lg">Цена продажи: {item.sellingPrice} рублей</p>
