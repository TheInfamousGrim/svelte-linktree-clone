<script lang="ts">
	// Firebase dependencies
	import { db, user } from '$lib/firebase';
	import { doc, getDoc, writeBatch } from 'firebase/firestore';

	// Svelte components
	import AuthCheck from '$lib/components/AuthCheck.svelte';

	// Form state
	let username = '';
	let loading = false;
	let isAvailable = false;

	// Debounce timer
	let debounceTimer: NodeJS.Timeout;

	// Check if username is available
	async function checkUsernameAvailability() {
		isAvailable = false;
		clearTimeout(debounceTimer);
		loading = true;

		debounceTimer = setTimeout(async () => {
			console.log('Checking username availability of', username);
			const ref = doc(db, 'usernames', username);
			const exists = await getDoc(ref).then((doc) => doc.exists());

			isAvailable = !exists;
			loading = false;
		}, 500);
	}

	// Create username
	async function confirmUsername() {
		console.log('Confirming username', username);
		// Add data to firestore
		const batch = writeBatch(db);
		batch.set(doc(db, 'usernames', username), { uid: $user?.uid });
		batch.set(doc(db, 'users', $user!.uid), {
			username,
			photoURL: $user?.photoURL ?? null,
			published: true,
			bio: 'I like beeg yoshi folks',
			links: [
				{
					title: 'GrimFunky.dev',
					url: 'https://grimfunky.dev',
					icon: 'custom'
				}
			]
		});

		await batch.commit();
	}
</script>

<AuthCheck>
	<h2>Username</h2>

	<form
		action=""
		on:submit|preventDefault={confirmUsername}
		class="flex flex-col justify-center gap-2"
	>
		<input
			type="text"
			placeholder="Username"
			class="input input-bordered input-accent"
			bind:value={username}
			on:input={checkUsernameAvailability}
		/>

		{#if isAvailable}
			<p class="text-left text-success">Username is available!</p>
			<button class="btn btn-success">Confirm username @{username}</button>
		{:else if username.length > 0}
			<p class="mt-4 text-left text-error">Username is not available.</p>
		{/if}
	</form>
</AuthCheck>
