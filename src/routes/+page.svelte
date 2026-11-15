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
  <h1>Обозревать пока нечего 🤷‍♀️</h1>
</div>
