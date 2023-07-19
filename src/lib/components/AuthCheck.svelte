<script lang="ts">
	import { user } from '$lib/firebase';
</script>

{#if user}
	<slot />
{:else}
	<div class="flex flex-col divide-y-2">
		<p>You must be logged in to view this page.</p>
		<a class="btn btn-primary" href="/login">Sign In</a>
	</div>
{/if}
```
