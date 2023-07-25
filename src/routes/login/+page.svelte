<script lang="ts">
	import { user } from '$lib/firebase';
	import { auth } from '$lib/firebase';

	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(auth, provider);
		console.log(user);
	}
</script>

<h2 class="text-sm text-gray-400">Login</h2>

{#if $user}
	<h2 class="text-lg font-semibold">Welcome, {$user.displayName}</h2>
	<p class="mb-4 text-secondary">You are currently logged in</p>
	<button class="btn btn-warning mb-4" on:click={() => signOut(auth)}>Sign Out</button>
	<a href="/login/username" class="btn">Choose Username</a>
{:else}
	<button class="btn btn-primary" on:click={signInWithGoogle}>Sign In With Google</button>
{/if}
