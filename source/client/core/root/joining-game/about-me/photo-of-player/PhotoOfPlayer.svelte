<script lang="ts">
	import {enhanced_} from "./enhanced/module.ts";
	import {input_} from "./input/module.ts";
	import {onMount} from "svelte";
	let photoInput: HTMLInputElement | undefined = $state();
	let isEnhanced: boolean = $state(false);
	onMount(function enableEnhancement(): void {
		isEnhanced = true;
		return;
	});
	function setPhotoInput(input: HTMLInputElement | undefined): void {
		photoInput = input;
		return;
	}
</script>

<label
	><span>Zdjęcie:</span>
	{#if isEnhanced}<enhanced_.Enhanced input={photoInput}></enhanced_.Enhanced
		>{/if}<input_.Input
		hidden={isEnhanced}
		setInput={setPhotoInput}></input_.Input
	></label>

<style lang="scss"></style>
