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

	// Validate the username
	const regex = /^(?=[a-zA-Z0-9._]{3,30}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

	$: isValidUsername = username?.length > 2 && username?.length < 30 && regex.test(username);
	$: isTouched = username?.length > 0;
	$: isTaken = isValidUsername && !isAvailable && !loading;

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
		class="flex flex-col items-center justify-center gap-2"
	>
		<input
			type="text"
			placeholder="Username"
			class="input input-bordered input-accent w-64 grow-0"
			class:input-error={!isValidUsername && isTouched}
			class:input-warning={isTaken}
			class:input-success={isAvailable && isValidUsername && !loading}
			bind:value={username}
			on:input={checkUsernameAvailability}
		/>

		{#if loading}
			<p class="text-secondary">Checking availability of @{username}</p>
		{/if}

		{#if !isValidUsername && isTouched}
			<p class="text-error">
				Username must be between 3 and 30 characters and can only contain letters, numbers,
				underscores and periods
			</p>
		{/if}

		{#if isTaken}
			<p class="text-warning">Username @{username} is already taken</p>
		{/if}

		{#if isAvailable && isValidUsername && !loading}
			<button class="btn btn-success">Confirm username @{username}</button>
		{/if}
	</form>
</AuthCheck>
