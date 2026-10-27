<script lang="ts">
	import './layout.css';
	import DemoLinks from './demo/DemoLinks.svelte';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';

	let { children }: LayoutProps = $props();

	let menuItems = [
		{ title: 'Обзор', link: '/' },
		{ title: 'Поставки', link: '/invoices' },
		{ title: 'Списания', link: '/writeoffs' },
		{ title: 'Закупки', link: '/purchases' },
		{ title: 'Товары', link: '/items' },
		{ title: 'Поставщики', link: '/suppliers' }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app min-h-screen flex flex-col">
	<div class="body-wrapper flex flex-col md:flex-row items-stretch flex-1">
		<div class="flex flex-col justify-between sidebar-wrapper w-64 text-xl">
		<div class="menu-wrapper flex flex-1 flex-col justify-center">
		{#each menuItems as item }
			<a href="{item.link}" class="flex flex-col px-4 py-2 hover:text-violet-700 { page.url.pathname === item.link ? 'font-bold' : '' }">
					<div class="menu__item">{ item.title }</div>
			</a>
		{/each}
		</div>
		</div>
		<div class="flex-1 body-wrapper m-4 flex flex-col gap-4">
			{@render children()}
		</div>
	</div>
</div>
<DemoLinks />

<style>
	.app {
		font-family: 'Noto Sans', sans-serif;
		background-color: var(--color-canvas);
	}

	/* .menu-wrapper {
		background-color: var(--color-menu);
	} */

	.sidebar-wrapper {
		/* background-color: var(--color-sidebar); */
	}

	/* .body-wrapper {
		background-color: var(--color-canvas);
	} */
</style>
