<script lang="ts">
	import {client_} from "../../../client/module.ts";
	import type {PageProps} from "./$types.d.ts";
	const props: PageProps = $props();
</script>

<client_.core_.game_.Game game={props.data.game}></client_.core_.game_.Game>

<style lang="scss"></style>
