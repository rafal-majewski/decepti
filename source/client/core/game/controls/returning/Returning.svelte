<script lang="ts">
	import {resolve} from "$app/paths";
	const props: {
		readonly hasArrivedToBase: boolean;
		readonly idOfGame: string;
		readonly isKnownToBeDead: boolean;
		readonly isKnownToBeInJail: boolean;
	} = $props();
</script>

<section
	>{#if props.isKnownToBeDead}<p>Nie żyjesz.</p
		>{:else if props.isKnownToBeInJail}<p>Jesteś w więzieniu.</p
		>{:else if props.hasArrivedToBase}<p
			>Dotarłeś do bazy. Czekaj na pozostałych.</p
		>{:else}<form
			action={resolve(`/game/${props.idOfGame}/arrive-at-base`)}
			method="POST"><button type="submit">Dotarłem do bazy</button></form
		>{/if}</section>

<style lang="scss"></style>
