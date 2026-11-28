export interface MenuItem {
  title: string;
  link: string;
}

export const menu: MenuItem[] = [
  { title: 'Обзор', link: '/' },
  { title: 'Поставки', link: '/invoices' },
  { title: 'Списания', link: '/writeoffs' },
  // { title: 'Закупки', link: '/purchases' },
  { title: 'Товары', link: '/items' },
  { title: 'Поставщики', link: '/suppliers' },
  // { title: 'Чеки', link: '/receipts' },
  // { title: 'История', link: '/history' }
];
