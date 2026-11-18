<script lang="ts">
  import type { PageProps } from './$types';

  let { form }: PageProps = $props();
</script>

<div class="flex flex-col gap-4">
  {#if form?.success}
    <!-- this message is ephemeral; it exists because the page was rendered in
          response to a form submission. it will vanish if the user reloads -->
    <p class="flex flex-col bg-green-500 p-4 text-lg text-white font-bold">
      Поставщик успешно добавлен!
    <a href="/suppliers/{form.id}" class="underline">{form.name}</a>
    </p>
  {/if}

  <form method="post" class="flex flex-col gap-4">
    <label for="name">
      Название поставщика: <span class="text-red-500 font-bold">*</span>
    </label>
    <input type="text" name="name" required placeholder="Пышные булки" class="border-gray-500 border-2 rounded-full px-4 py-2">
    
    <label for="contact_info">
      Контактная информация:
    </label>
    <input type="text" name="contact_info" placeholder="Номер телефона, email, адрес" class="border-gray-500 border-2 rounded-full px-4 py-2">
    <button class="rounded-full bg-gray-700 px-4 py-2 font-bold text-white text-lg">Добавить поставщика</button>
  </form>
</div>
