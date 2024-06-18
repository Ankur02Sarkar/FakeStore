<script>
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<Toaster />
<Navbar />

<slot />
