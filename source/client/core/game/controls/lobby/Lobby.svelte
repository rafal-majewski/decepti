<script lang="ts">
	import {resolve} from "$app/paths";
	const props: {readonly idOfGame: string; readonly wantsToStart: boolean} =
		$props();
</script>

<section
	><h2>Czy chcesz rozpocząć grę?</h2><p
		>Twoja gotowość: {props.wantsToStart ? `✅` : `❌`}</p
	><form
		action={resolve(`/game/${props.idOfGame}/vote-to-start`)}
		method="POST"
		><button
			name="choice"
			type="submit"
			value={props.wantsToStart ? `nie` : `tak`}
			>{props.wantsToStart ? `Wycofaj gotowość` : `Wyraź gotowość`}</button
		></form
	></section>

<style lang="scss"></style>
