<script lang="ts">
  interface EventsHistoryList {
    type: string;
    description: string;
  }
  let lastEvents:EventsHistoryList[] = [
    {

      type: 'Списание',
      description: 'Admin подтвердил, что товара на списание нет.'
    },
    {

      type: 'Поставка',
      description: 'Внесена пользователем Admin. Поставщик: ИП Штруделева'
    },
    {

      type: 'Поставка',
      description: 'Внесена пользователем Admin. Поставщик: ООО Яйца и батоны'
    },
    {

      type: 'Закупки',
      description: 'Внесена пользователем Admin. Место закупки: Перекрёсток'
    }
  ];
</script>

<div class="content content-main grid grid-cols-1 lg:grid-cols-3 gap-4">
  <div class="writeoffs-section flex flex-col gap-2 border bg-white p-4 rounded-md">
    <div class="text-lg font-bold">
      Списание на сегодня
    </div>
    <div>
      <span class="writeoffs-section__number font-bold">Не проведено.</span><br>У <span class="writeoffs-section__number font-bold">2</span> товаров сегодня истекает срок годности.
    </div>
    <div class="font-bold text-xl underline">Открыть</div>
  </div>
  <div class="events-history-section col-span-2 flex flex-col gap-2 flex-1 p-4 border bg-white rounded-md">
    <span class="text-lg font-bold">Последние события</span>
    {#each lastEvents as event }
      <div class="event flex flex-row gap-2">
        <div class="event-type font-bold">{event.type}</div>
        <div class="event-description flex-1">{event.description}</div>
      </div>      
    {/each}
    <div class="font-bold text-xl underline">Открыть</div>
  </div>
</div>

<style>
  /* .content-main {

  } */

  .event-type {
    color: var(--font-color-accent);
  }

  .writeoffs-section__status {
    color: var(--font-color-accent);
  }

  .writeoffs-section__number {
    color: var(--font-color-accent);
  }
</style>
