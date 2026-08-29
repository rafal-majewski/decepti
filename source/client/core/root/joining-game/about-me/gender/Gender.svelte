<script lang="ts"></script>

<fieldset
	><legend>Płeć</legend><div
		><label
			><input
				name="gender"
				required
				type="radio"
				value="female" /> <span>Kobieta</span></label
		><label
			><input
				name="gender"
				type="radio"
				value="male" /> <span>Mężczyzna</span></label
		></div
	></fieldset>

<style lang="scss">
	div {
		display: block flex;
		gap: 1.25rem;
	}
	label {
		align-items: center;
		cursor: pointer;
		flex-direction: row;
		gap: 0.5rem;
	}
	label input {
		accent-color: var(--color-accent);
		height: 1rem;
		width: 1rem;
	}
</style>
