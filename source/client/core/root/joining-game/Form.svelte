<script lang="ts">
	import {resolve} from "$app/paths";
	import {aboutMe_} from "./about-me/module.ts";
	import {joining_} from "./joining/module.ts";
</script>

<form
	action={resolve(`/join-game`)}
	enctype="multipart/form-data"
	method="POST"
	><aboutMe_.AboutMe></aboutMe_.AboutMe><joining_.Joining></joining_.Joining
	></form>

<style lang="scss"></style>
