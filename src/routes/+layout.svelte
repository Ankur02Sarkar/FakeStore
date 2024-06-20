<script>
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import { Navbar } from '$lib/components/Navbar';
	import { ModeWatcher } from 'mode-watcher';
	import { Footer } from '$lib/components/Footer';
</script>

<ModeWatcher />
<Toaster />
<Navbar />

<slot />
<Footer />
