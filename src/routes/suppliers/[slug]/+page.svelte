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
  <p class="text-xl">Статус: <span class="font-bold">{supplier.status}</span></p>
  <p class="text-xl">Контактная информация: <span class="font-bold">{supplier.contact_info || 'Не указана'}</span></p>
  <div class="flex gap-2">
    {#if supplier.status === 'active'}
      <form action="?/archiveSupplier" method="post">
        <input type="checkbox" name="archive" checked hidden />
        <button class="rounded-full bg-gray-700 px-4 py-2 font-bold text-white text-lg shadow-lg">Архивировать</button>
      </form>
    {/if}
    {#if supplier.status === 'archived'}
      <form action="?/archiveSupplier" method="post">
        <input type="checkbox" name="archive" hidden/>
        <button class="rounded-full bg-green-500 px-4 py-2 font-bold text-white text-lg shadow-lg">Разархивировать</button>
      </form>
    {/if}
    <form action="?/deleteSupplier" method="post">
      <button class="rounded-full bg-red-500 px-4 py-2 font-bold text-white text-lg shadow-lg">Удалить</button>
    </form>
  </div>
</div>
