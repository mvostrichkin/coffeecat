<script lang="ts">
  import type { PageProps, PageData } from './$types';

  type formItem = {
    id: number;
    name: string;
    external_id: string;
    sellingPrice: number;
    quantity?: number;
    visible?: boolean;
  };

  let { form, data }: PageProps & PageData = $props();

  const suppliers = $derived(data.suppliers);
  let it = $derived<formItem[]>(data.items);
  let items = $state(it);

  console.log(items);

  const now = new Date();
  const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  const localTimeString = localTime.toISOString().slice(0, 16);

  let formItems = $state<formItem[]>([]);

  function addItem(item: formItem) {
    const existingItem = formItems.find((formItem) => formItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity = existingItem.quantity ? existingItem.quantity + 1 : 1;
    } else {
      const availableItem = items.find((availableItem) => availableItem.id === item.id);
      availableItem.visible = availableItem.visible ? !availableItem.visible : false;
      console.log(`availableItem: ${JSON.stringify(availableItem)}`);
      item.quantity = 1;
      formItems.push(item);
    }
  }

  function changePrice(id: number, newPrice: number) {
    const item = formItems.find((formItem) => formItem.id === id);

    console.log(item);

    item.sellingPrice = newPrice;
  }
</script>

<div class="flex flex-col gap-4">
  {#if form?.success}
    <!-- this message is ephemeral; it exists because the page was rendered in
          response to a form submission. it will vanish if the user reloads -->
    <p class="flex flex-col bg-green-500 p-4 text-lg text-white font-bold">
      Поставка успешно добавлена!
    <a href="/invoices/{form.id}" class="underline">{form.name}</a>
    </p>
  {/if}

  <form method="post" class="flex flex-col gap-4">
    <label for="id">
      Дата поставки: <span class="text-red-500 font-bold">*</span>
    </label>
    <input type="datetime-local" name="date" value={localTimeString} required class="border-gray-500 border-2 rounded-full px-4 py-2">
    
    <label for="supplier_id">
      Поставщик: <span class="text-red-500 font-bold">*</span>
    </label>
    <input type="text" name="supplier_id" list="suppliers" required placeholder="ID поставщика" class="border-gray-500 border-2 rounded-full px-4 py-2">
    <datalist id="suppliers">
      {#each suppliers as supplier}
        <option value={supplier.id}>{supplier.name}</option>
      {/each}
    </datalist>

    <input type="hidden" name="items" value="{JSON.stringify(formItems)}">

    {#each items as item}
        <div onclick={() => { addItem(item)}}>{item.name}{item.visible}</div>
    {/each}

      {#if formItems.length > 0}
      Добавленные товары:
      <div class="flex flex-col gap-4">
      {#each formItems as formItem}
        <div class="bg-purple-400 rounded-full p-4">{formItem.quantity} x {formItem.name}
          <input type="number" name="piece_price" value={formItem.sellingPrice} onchange={(e) => { changePrice(formItem.id, parseFloat(e.target.value)); }}>
        </div>
      {/each}
      </div>
      {/if}

    <button class="rounded-full bg-gray-700 px-4 py-2 font-bold text-white text-lg">Добавить товар</button>
  </form>
</div>
