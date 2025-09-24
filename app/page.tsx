import Link from 'next/link';

export default function Home(){
  return (<div className="space-y-10">
    <div className="stars"></div>
    <div className="text-center mt-10">
      <div className="mx-auto size-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-4xl">🟡</div>
      <h1 className="text-5xl font-extrabold mt-6">You are not joining.<br/> <span className="text-purple-400">You are remembering.</span></h1>
      <p className="opacity-80 mt-3">A whisper echoes across generations. The Guthi is waiting for your voice.</p>
      <div className="mt-6">
        <Link href="/whisper" className="btn">✨ Dare to whisper back?</Link>
      </div>
      <div className="opacity-70 mt-6 text-sm">Activate the DAO layer at 13 whispers.</div>
    </div>
    <section className="space-y-4">
      <h2 className="text-3xl font-bold text-center">Why Pasaguthi?</h2>
      <p className="opacity-80 text-center max-w-3xl mx-auto">Pasaguthi is not just a platform. It is a sacred remembering. A return to what our ancestors knew: Guthi is the soul of a civilization.</p>
    </section>
  </div>);
}
