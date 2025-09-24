export default function PublicProfileCard({ p }:{ p:{name:string|null, thar:string|null, region:string|null, photo:string|null} }){
  return <div className="card">
    <div className="flex items-center gap-3">
      <div className="size-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
        {p.photo? <img src={p.photo} alt={p.name ?? 'Member'} className="w-full h-full object-cover"/> : <span>👤</span>}
      </div>
      <div>
        <div className="font-semibold">{p.name ?? 'Anonymous'}</div>
        <div className="text-sm opacity-80">{[p.thar,p.region].filter(Boolean).join(' • ')}</div>
      </div>
    </div>
  </div>;
}
