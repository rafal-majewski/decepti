<script lang="ts">
	import {asset} from "$app/paths";
	import type {Snippet} from "svelte";
	const props: {readonly children: Snippet<[]>} = $props();
</script>

<svelte:head
	><link
		href={asset(`/favicon.svg`)}
		rel="icon"
		type="image/svg+xml" /><link
		href={asset(`/manifest.json`)}
		rel="manifest" /><meta
		content="#ffffff"
		name="theme-color" /></svelte:head
><main>{@render props.children()}</main>

<style lang="scss"></style>
