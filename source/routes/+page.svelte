<script lang="ts">
	import {client_} from "../client/module.ts";
	import type {PageProps} from "./$types.d.ts";
	const props: PageProps = $props();
</script>

<client_.core_.root_.page_.Page numberOfPlayers={props.data.numberOfPlayers}
></client_.core_.root_.page_.Page>

<style lang="scss"></style>
