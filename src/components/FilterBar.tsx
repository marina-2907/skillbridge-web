
type Props = {
  busca: string;
  setBusca: (v: string) => void;
  nivel: string;
  setNivel: (v: string) => void;
};

export default function FilterBar({
  busca,
  setBusca,
  nivel,
  setNivel,
}: Props) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      {/* Busca */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Buscar curso..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-500 transition"
        />
      </div>

      {/* Nível */}
      <div className="w-full md:w-40">
        <select
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-500 transition"
        >
          <option value="">Todos níveis</option>
          <option value="BASICO">Iniciante</option>
          <option value="INTERMEDIARIO">Intermediário</option>
          <option value="AVANCADO">Avançado</option>
        </select>
      </div>
    </div>
  );
}
