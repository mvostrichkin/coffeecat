<script lang="ts">
  import type { PageProps } from './$types';

  let { data, form }: PageProps = $props();

  let supplier = $derived(data.supplier);
</script>

{#if form?.success === false}
  <!-- this message is ephemeral; it exists because the page was rendered in
        response to a form submission. it will vanish if the user reloads -->
  <p class="flex flex-col bg-red-500 p-4 text-lg text-white font-bold">
    {form.error}
  </p>
{/if}

<div class="flex flex-col gap-4 border-2 border-gray-300 rounded-xl p-4">
  <p class="text-2xl font-bold">{supplier.name}</p>
  <p class="text-xl">ID: <span class="font-bold">{supplier.id}</span></p>
  <p class="text-xl">Контактная информация: <span class="font-bold">{supplier.contact_info || 'Не указана'}</span></p>
  <form action="?/deleteSupplier" method="post">
    <button class="rounded-full bg-red-500 px-4 py-2 font-bold text-white text-lg shadow-lg">Удалить</button>
  </form>
</div>
