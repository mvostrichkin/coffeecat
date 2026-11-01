<script lang="ts">
  import { menu as menuList } from '#lib/config/menu.ts';
  import { page } from '$app/state';
</script>

<div class="menu text-xl">
  {#each menuList as menuItem }
    <a href="{menuItem.link}" class="menu__item-wrapper flex flex-col px-4 py-2 { page.url.pathname === menuItem.link ? 'menu__item-wrapper_active' : '' }">
      <div class="menu__item">{ menuItem.title }</div>
    </a>
  {/each}
</div>

<style>
  .menu__item-wrapper_active {
    font-weight: 600;
  }
</style>
