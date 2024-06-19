<script>
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import { Navbar } from '$lib/components/Navbar';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<Toaster />
<Navbar />

<slot />
