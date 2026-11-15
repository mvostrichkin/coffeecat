<script lang="ts">
  import type { PageProps } from './$types';

  let { form }: PageProps = $props();
</script>

<div class="flex flex-col gap-4">
  {#if form?.success}
    <!-- this message is ephemeral; it exists because the page was rendered in
          response to a form submission. it will vanish if the user reloads -->
    <p class="flex flex-col bg-green-500 p-4 text-lg text-white font-bold">
      Товар успешно добавлен!
    <a href="/items/{form.id}" class="underline">{form.name}</a>
    </p>
  {/if}

  <form method="post" class="flex flex-col gap-4">
    <label for="id">
      ID:
    </label>
    <input type="number" name="id" required class="border-green-500 border-2 rounded-full p-2">
    
    <label for="name">
      Наименование:
    </label>
    <input type="text" name="name" required class="border-green-500 border-2 rounded-full p-2">
    
    <label for="price">
      Цена:
    </label>
    <input type="text" name="price" required class="border-green-500 border-2 rounded-full p-2">
    <button class="rounded-full bg-green-500 px-4 py-2 font-bold text-white text-lg">Добавить товар</button>
  </form>
</div>
