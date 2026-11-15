<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
  import Sidebar from '#lib/components/Sidebar.svelte';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app min-h-screen flex flex-col">
  <div class="body-wrapper flex-1 flex flex-col md:flex-row">
    <Sidebar />
    <div class="content-wrapper md:max-h-screen overflow-y-auto flex-1 h-2000 p-4 pb-8 md:p-8">
      {@render children()}
    </div>
  </div>
</div>

<style>
	.app {
    background-color: var(--color-canvas);
  }

  .content-wrapper {
    border-color: var(--color-border);
  }
</style>
