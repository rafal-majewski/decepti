<script lang="ts">
	import {resolve} from "$app/paths";
	import {pushNotifications_} from "../push-notifications/module.ts";
	import type {snapshotOfGame_} from "../snapshot-of-game/module.ts";
	import {controls_} from "./controls/module.ts";
	import {currentPlayer_} from "./current-player/module.ts";
	import {manager_} from "./manager/module.ts";
	import {messages_} from "./messages/module.ts";
	import {players_} from "./players/module.ts";

	type Tab = `action` | `chat` | `players` | `you`;

	const props: {
		readonly game: snapshotOfGame_.Snapshot;
		readonly vapidPublicKey: string;
	} = $props();
	let gameFromEvents: snapshotOfGame_.Snapshot | undefined = $state<
		snapshotOfGame_.Snapshot | undefined
	>(undefined);
	let isReturningDialogOpen: boolean = $state(false);
	let activeTab: Tab = $state(`action`);
	const game: snapshotOfGame_.Snapshot = $derived(gameFromEvents ?? props.game);
	$effect(function subscribeToPushNotifications(): void {
		pushNotifications_
			.subscribeToPushNotifications(props.game.id, props.vapidPublicKey)
			.catch(function ignoreFailure(): void {
				return;
			});
		return;
	});
	$effect(function subscribeToEvents(): () => void {
		const manager: manager_.Manager = manager_.Manager.create(
			props.game.id,
			function handleGameUpdated(
				updatedGame: null | snapshotOfGame_.Snapshot,
			): void {
				if (updatedGame === null) {
					window.location.assign(resolve(`/`));
					return;
				} else {
					const previousState: snapshotOfGame_.snapshotOfState_.Snapshot =
						gameFromEvents?.state ?? props.game.state;
					if (
						previousState === `maintaining`
						&& updatedGame.state === `returning`
					) {
						isReturningDialogOpen = true;
					} else {
						/* empty */
					}
					gameFromEvents = updatedGame;
					return;
				}
			},
		);
		return function unsubscribeFromEvents(): void {
			manager.destroy();
			return;
		};
	});
	function closeReturningDialog(): void {
		isReturningDialogOpen = false;
		return;
	}
</script>

{#if game.state !== `lobby`}<currentPlayer_.CurrentPlayer
		currentPlayer={game.currentPlayer}></currentPlayer_.CurrentPlayer
	>{/if}<div
	class="layout"
	data-active-tab={activeTab}
	><div class="panels"
		>{#if game.state !== `lobby`}<section class="panel panel-you"
				><currentPlayer_.Card currentPlayer={game.currentPlayer}
				></currentPlayer_.Card
				></section
			>{/if}<section class="panel panel-players"
			><players_.Players players={game.players}></players_.Players></section
		><section class="panel panel-chat"
			><messages_.Messages
				idOfGame={game.id}
				messages={game.messages}></messages_.Messages
			></section
		><section class="panel panel-action"
			><controls_.Controls game={game}></controls_.Controls></section
		></div
	><nav
		aria-label="Sekcje gry"
		class="tabbar"
		>{#if game.state !== `lobby`}<button
				class:active={activeTab === `you`}
				onclick={function selectYou(): void {
					activeTab = `you`;
				}}
				type="button">Ty</button
			>{/if}<button
			class:active={activeTab === `players`}
			onclick={function selectPlayers(): void {
				activeTab = `players`;
			}}
			type="button">Gracze</button
		><button
			class:active={activeTab === `chat`}
			onclick={function selectChat(): void {
				activeTab = `chat`;
			}}
			type="button">Czat</button
		><button
			class:active={activeTab === `action`}
			onclick={function selectAction(): void {
				activeTab = `action`;
			}}
			type="button">Akcja</button
		></nav
	></div
><controls_.returning_.dialog_.Dialog
	isOpen={isReturningDialogOpen}
	onClose={closeReturningDialog}></controls_.returning_.dialog_.Dialog>

<style lang="scss">
	.layout {
		display: block flex;
		flex-direction: column;
		height: 100dvh;
	}
	.panels {
		display: block flex;
		flex-grow: 1;
		min-height: 0;
	}
	.panel {
		min-width: 0;
	}
	.panel-you {
		width: 16rem;
	}
	.panel-players {
		width: 16rem;
	}
	.panel-chat {
		display: block flex;
		flex-grow: 1;
	}
	.panel-action {
		width: min(32rem, 44vw);
	}
	.tabbar {
		display: none;
	}
	@media (width <= 48rem) {
		.panels {
			flex-direction: column;
			height: 100%;
		}
		.panel {
			display: none;
			flex-grow: 1;
			height: 100%;
			width: auto;
		}
		.layout[data-active-tab="you"] .panel-you {
			display: block flex;
			flex-direction: column;
			padding: 1rem;
		}
		.layout[data-active-tab="players"] .panel-players {
			display: block flex;
		}
		.layout[data-active-tab="chat"] .panel-chat {
			display: block flex;
		}
		.layout[data-active-tab="action"] .panel-action {
			display: block flex;
		}
		.tabbar {
			background: var(--color-surface);
			border-top: 0.0625rem solid var(--color-border);
			display: block flex;
			flex-shrink: 0;
			padding: 0.375rem 0.5rem;
			padding-bottom: max(0.375rem, env(safe-area-inset-bottom));
		}
		.tabbar button {
			align-items: center;
			background: rgb(0 0 0 / 0);
			border: none;
			border-radius: var(--radius-md);
			color: var(--color-text-muted);
			display: block flex;
			flex-direction: column;
			flex-grow: 1;
			font-size: 0.6875rem;
			font-weight: 700;
			gap: 0.125rem;
			letter-spacing: 0.02em;
			padding: 0.5rem 0.25rem;
			text-transform: uppercase;
		}
		.tabbar button:hover {
			background: var(--color-surface-2);
		}
		.tabbar .active {
			background: var(--color-accent-soft);
			color: var(--color-accent);
		}
	}
</style>
