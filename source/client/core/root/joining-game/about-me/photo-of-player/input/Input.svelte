<script lang="ts">
	import {untrack} from "svelte";
	let input: HTMLInputElement | undefined = $state();
	const props: {
		readonly hidden: boolean;
		readonly setInput: (element: HTMLInputElement | undefined) => void;
	} = $props();
	$effect(function reportInput(): void {
		const currentInput: HTMLInputElement | undefined = input;
		untrack(function report(): void {
			props.setInput(currentInput);
		});
	});
</script>

<input
	bind:this={input}
	hidden={props.hidden}
	name="photo"
	required
	type="file" />

<style lang="scss"></style>
