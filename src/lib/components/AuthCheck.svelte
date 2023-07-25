<script lang="ts">
	import { user } from '$lib/firebase';
	console.log(user);
</script>

{#if $user}
	<slot />
{:else}
	<div class="flex flex-col gap-4">
		<p>You must be logged in to view this page.</p>
		<a class="btn btn-primary" href="/login">Sign In</a>
	</div>
{/if}
