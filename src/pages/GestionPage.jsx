import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  SkipForward,
  Clock,
  CalendarDays,
  ClipboardList,
  AlertTriangle,
  UserX,
  Bell,
  Users,
  ChevronRight,
} from 'lucide-react'

const MOCK_LOANS = [
  {
    id: 1,
    name: 'Sofía Torres',
    carrera: 'Cine y TV',
    equipo: 'DJI RS3 Pro',
    entrega: '14 jun, 10:00 AM',
    devolucion: '16 jun, 6:00 PM',
    estado: 'retrasado',
  },
  {
    id: 2,
    name: 'Ana García',
    carrera: 'Comunicación',
    equipo: 'Sony FX3',
    entrega: '15 jun, 9:00 AM',
    devolucion: '16 jun, 12:00 PM',
    estado: 'vence-hoy',
  },
  {
    id: 3,
    name: 'Luis Martínez',
    carrera: 'Cine y TV',
    equipo: 'Zoom H6 + Rode NTG-3',
    entrega: '15 jun, 2:00 PM',
    devolucion: '17 jun, 9:00 AM',
    estado: 'proximo',
  },
  {
    id: 4,
    name: 'Carolina Reyes',
    carrera: 'Diseño',
    equipo: 'Aputure 300D x2',
    entrega: '12 jun, 11:00 AM',
    devolucion: '20 jun, 11:00 AM',
    estado: 'activo',
  },
  {
    id: 5,
    name: 'Diego Herrera',
    carrera: 'Comunicación',
    equipo: 'Canon EOS R5',
    entrega: '13 jun, 9:00 AM',
    devolucion: '22 jun, 9:00 AM',
    estado: 'activo',
  },
  {
    id: 6,
    name: 'Valentina Cruz',
    carrera: 'Cine y TV',
    equipo: 'Sigma 50mm f/1.4 Art',
    entrega: '16 jun, 8:00 AM',
    devolucion: '18 jun, 8:00 AM',
    estado: 'activo',
  },
]

const MOCK_QUEUE = [
  { turn: 39, name: 'Miguel Fernández', carrera: 'Cine y TV', hora: '10:15 AM', equipos: 'Sony FX3, Sigma 50mm' },
  { turn: 40, name: 'Isabella Rojas', carrera: 'Comunicación', hora: '10:15 AM', equipos: 'Aputure 300D' },
  { turn: 41, name: 'Andrés López', carrera: 'Cine y TV', hora: '10:30 AM', equipos: 'Zoom H6 + Rode NTG-3' },
  { turn: 42, name: 'Camila Vega', carrera: 'Diseño', hora: '10:30 AM', equipos: 'DJI RS3 Pro' },
  { turn: 43, name: 'Santiago Mora', carrera: 'Comunicación', hora: '10:45 AM', equipos: 'Canon EOS R5' },
  { turn: 44, name: 'Lucía Herrera', carrera: 'Diseño', hora: '10:45 AM', equipos: 'Sennheiser EW 100' },
  { turn: 45, name: 'Mateo Jiménez', carrera: 'Cine y TV', hora: '11:00 AM', equipos: 'Manfrotto 504HD' },
]

const estadoConfig = {
  retrasado: { label: 'Retrasado', cls: 'bg-red-50 text-lm-red border-red-200' },
  'vence-hoy': { label: 'Vence hoy', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  proximo: { label: 'Vence pronto', cls: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  activo: { label: 'Activo', cls: 'bg-green-50 text-lm-green border-green-200' },
}

const TABS = ['Todos', 'Activos', 'Vencen hoy', 'Retrasados']

export default function GestionPage() {
  const [activeTab, setActiveTab] = useState('Todos')
  const [servingTurn, setServingTurn] = useState(38)
  const [flashNext, setFlashNext] = useState(false)

  const waitingQueue = MOCK_QUEUE.filter((p) => p.turn > servingTurn)

  function handleCallNext() {
    if (waitingQueue.length === 0) return
    setServingTurn((prev) => prev + 1)
    setFlashNext(true)
    setTimeout(() => setFlashNext(false), 2500)
  }

  const filteredLoans = MOCK_LOANS.filter((l) => {
    if (activeTab === 'Todos') return true
    if (activeTab === 'Activos') return l.estado === 'activo'
    if (activeTab === 'Vencen hoy') return l.estado === 'vence-hoy'
    if (activeTab === 'Retrasados') return l.estado === 'retrasado'
    return true
  })

  return (
    <div className="min-h-screen bg-lm-light">
      {/* Page header */}
      <div className="bg-lm-black pt-24 pb-14">
        <div className="container-lm">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-white/40 hover:text-white/70 transition-colors mb-8"
          >
            <ArrowLeft size={13} />
            Volver al inicio
          </Link>

          <h1 className="text-[40px] md:text-[52px] font-bold tracking-tight text-white leading-none mb-2">
            Panel de gestión
          </h1>
          <p className="text-[17px] text-white/40 mt-3">
            Laboratorio de Medios — Vista de administración
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[
              { label: 'Préstamos activos', value: '12', color: 'text-white' },
              { label: 'Disponibles hoy', value: '36', color: 'text-lm-green' },
              { label: 'Vencen esta semana', value: '5', color: 'text-amber-400' },
              { label: 'Retrasados', value: '1', color: 'text-lm-red' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/[0.05] rounded-2xl p-5 border border-white/[0.07]"
              >
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-[12px] text-white/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-lm py-12 space-y-8">
        {/* Queue management */}
        <div className="bg-white rounded-3xl border border-black/[0.06] shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
              <div>
                <h2 className="text-[20px] font-bold text-lm-black">Cola de turnos</h2>
                <p className="text-[13px] text-lm-gray mt-1">
                  {waitingQueue.length} {waitingQueue.length === 1 ? 'persona' : 'personas'} en espera
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[11px] text-lm-gray">Atendiendo ahora</p>
                  <p className="text-[28px] font-bold text-lm-black leading-none mt-0.5">
                    #{servingTurn}
                  </p>
                </div>
                <button
                  onClick={handleCallNext}
                  disabled={waitingQueue.length === 0}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                    flashNext
                      ? 'bg-lm-green text-white scale-[0.98]'
                      : waitingQueue.length === 0
                      ? 'bg-lm-light text-lm-gray cursor-not-allowed'
                      : 'bg-lm-black text-white hover:bg-lm-black/85 active:scale-[0.98]'
                  }`}
                >
                  <SkipForward size={14} />
                  {flashNext ? '¡Llamado!' : 'Llamar siguiente'}
                </button>
              </div>
            </div>

            {waitingQueue.length === 0 ? (
              <div className="text-center py-10 text-lm-gray text-[14px]">
                La cola está vacía por ahora.
              </div>
            ) : (
              <div className="overflow-x-auto -mx-1 px-1">
                <div className="flex gap-3 pb-2" style={{ minWidth: 'max-content' }}>
                  {waitingQueue.map((person, idx) => {
                    const isNext = idx === 0
                    return (
                      <div
                        key={person.turn}
                        className={`flex-shrink-0 w-44 rounded-2xl border p-4 transition-all duration-300 ${
                          isNext
                            ? 'bg-lm-black border-lm-black shadow-lg'
                            : 'bg-lm-light border-black/[0.06]'
                        }`}
                      >
                        {isNext && (
                          <p className="text-[10px] font-semibold text-white/45 uppercase tracking-widest mb-2">
                            Próximo
                          </p>
                        )}
                        <p
                          className={`text-[22px] font-bold leading-none ${
                            isNext ? 'text-white' : 'text-lm-black'
                          }`}
                        >
                          #{person.turn}
                        </p>
                        <p
                          className={`text-[13px] font-medium truncate mt-2 ${
                            isNext ? 'text-white/80' : 'text-lm-black'
                          }`}
                        >
                          {person.name}
                        </p>
                        <p
                          className={`text-[11px] truncate mt-0.5 ${
                            isNext ? 'text-white/40' : 'text-lm-gray'
                          }`}
                        >
                          {person.carrera}
                        </p>
                        <p
                          className={`text-[11px] truncate mt-2 leading-snug ${
                            isNext ? 'text-white/35' : 'text-lm-gray/70'
                          }`}
                        >
                          {person.equipos}
                        </p>
                        <div
                          className={`flex items-center gap-1 mt-3 text-[11px] ${
                            isNext ? 'text-white/35' : 'text-lm-gray'
                          }`}
                        >
                          <Clock size={10} />
                          {person.hora}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Loans table */}
        <div className="bg-white rounded-3xl border border-black/[0.06] shadow-sm overflow-hidden">
          <div className="p-8 pb-0">
            <h2 className="text-[20px] font-bold text-lm-black mb-5">Préstamos activos</h2>
            <div className="flex gap-2 flex-wrap">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-lm-black text-white'
                      : 'bg-lm-light text-lm-gray hover:text-lm-black hover:bg-black/[0.06]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="hidden md:grid grid-cols-[1.2fr_1.2fr_1fr_1fr_auto] gap-4 px-8 py-3 text-[11px] font-semibold text-lm-gray uppercase tracking-wider border-b border-black/[0.04]">
              <span>Estudiante</span>
              <span>Equipo</span>
              <span>Entrega</span>
              <span>Devolución</span>
              <span>Estado</span>
            </div>

            <div className="divide-y divide-black/[0.04]">
              {filteredLoans.length === 0 ? (
                <div className="px-8 py-12 text-center text-lm-gray text-[14px]">
                  No hay préstamos en esta categoría
                </div>
              ) : (
                filteredLoans.map((loan) => {
                  const cfg = estadoConfig[loan.estado]
                  return (
                    <div
                      key={loan.id}
                      className="px-8 py-4 grid md:grid-cols-[1.2fr_1.2fr_1fr_1fr_auto] gap-2 md:gap-4 items-center hover:bg-lm-light/50 transition-colors cursor-pointer"
                    >
                      <div>
                        <p className="text-[14px] font-medium text-lm-black">{loan.name}</p>
                        <p className="text-[12px] text-lm-gray">{loan.carrera}</p>
                      </div>
                      <div>
                        <p className="text-[13px] text-lm-black">{loan.equipo}</p>
                      </div>
                      <div>
                        <p className="text-[12px] text-lm-gray md:text-[13px] md:text-lm-black">
                          <span className="md:hidden text-lm-gray text-[11px] mr-1">Entrega:</span>
                          {loan.entrega}
                        </p>
                      </div>
                      <div>
                        <p className="text-[12px] text-lm-gray md:text-[13px] md:text-lm-black">
                          <span className="md:hidden text-lm-gray text-[11px] mr-1">Dev.:</span>
                          {loan.devolucion}
                        </p>
                      </div>
                      <span
                        className={`text-[11px] font-medium px-3 py-1 rounded-full border whitespace-nowrap w-fit ${cfg.cls}`}
                      >
                        {cfg.label}
                      </span>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="text-[20px] font-bold text-lm-black mb-5">Herramientas</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: CalendarDays,
                title: 'Agenda de reservas',
                desc: 'Vista calendario con entregas y devoluciones',
                accent: 'text-lm-blue',
              },
              {
                icon: AlertTriangle,
                title: 'Control de retrasos',
                desc: '1 préstamo con devolución pendiente',
                accent: 'text-lm-red',
              },
              {
                icon: UserX,
                title: 'Suspensiones',
                desc: '0 usuarios actualmente suspendidos',
                accent: 'text-lm-amber',
              },
              {
                icon: Bell,
                title: 'Notificaciones',
                desc: '5 recordatorios enviados hoy',
                accent: 'text-lm-green',
              },
              {
                icon: ClipboardList,
                title: 'Historial completo',
                desc: 'Ver todos los préstamos registrados',
                accent: 'text-lm-black',
              },
              {
                icon: Users,
                title: 'Directorio de usuarios',
                desc: '127 estudiantes registrados',
                accent: 'text-lm-black',
              },
            ].map(({ icon: Icon, title, desc, accent }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-black/[0.06] p-6 flex items-center gap-4 hover:border-black/[0.12] hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-lm-light flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className={accent} strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-lm-black text-[14px]">{title}</p>
                  <p className="text-[12px] text-lm-gray mt-0.5">{desc}</p>
                </div>
                <ChevronRight
                  size={14}
                  className="text-lm-gray group-hover:text-lm-black transition-colors flex-shrink-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
