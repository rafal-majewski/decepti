<script lang="ts">
	import {gender_} from "./gender/module.ts";
	import {name_} from "./name/module.ts";
	import {photoOfPlayer_} from "./photo-of-player/module.ts";
</script>

<fieldset
	><legend>O mnie</legend><div
		><name_.Name></name_.Name><gender_.Gender></gender_.Gender
		><photoOfPlayer_.PhotoOfPlayer></photoOfPlayer_.PhotoOfPlayer></div
	></fieldset>

<style lang="scss">
	div {
		display: block flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
