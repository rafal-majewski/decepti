<script lang="ts">
	import {enhance} from "$app/forms";
	import {resolve} from "$app/paths";
	import {photoOfPlayer_} from "./photo-of-player/module.ts";
</script>

<form
	action={resolve(`/join-game`)}
	enctype="multipart/form-data"
	method="POST"
	use:enhance>
	<fieldset>
		<legend>O mnie</legend>
		<div>
			<label>
				<span>Nazwa:</span>
				<input
					name="name"
					placeholder="Wpisz nazwę"
					required
					type="text" />
			</label>
			<fieldset>
				<legend>Płeć</legend>
				<div>
					<label>
						<input
							name="gender"
							required
							type="radio"
							value="female" /> <span>Kobieta</span>
					</label>
					<label>
						<input
							name="gender"
							type="radio"
							value="male" /> <span>Mężczyzna</span>
					</label>
				</div>
			</fieldset>
			<photoOfPlayer_.PhotoOfPlayer></photoOfPlayer_.PhotoOfPlayer>
		</div>
	</fieldset>
	<div><button type="submit">Dołącz</button></div>
</form>

<style lang="scss"></style>
