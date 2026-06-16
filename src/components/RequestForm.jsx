import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle, Loader, ChevronDown } from 'lucide-react'
import { equipment } from '../data/equipment'

gsap.registerPlugin(ScrollTrigger)

const availableItems = equipment.filter((e) => e.status === 'disponible')

const TIME_SLOTS = (() => {
  const slots = []
  for (let h = 8; h < 20; h++) {
    for (let m = 0; m < 60; m += 15) {
      const value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      const period = h < 12 ? 'AM' : 'PM'
      const displayH = h > 12 ? h - 12 : h
      const label = `${displayH}:${String(m).padStart(2, '0')} ${period}`
      slots.push({ value, label })
    }
  }
  return slots
})()

const QUEUE_BASE = 38
const QUEUE_MAX = 80

const initialForm = {
  nombre: '',
  correo: '',
  carrera: '',
  equipos: [],
  fechaEntrega: '',
  horaEntrega: '',
  fechaDevolucion: '',
  horaDevolucion: '',
  proposito: '',
}

function TurnWidget({ myTurn, currentlyServing }) {
  const turnsAhead = Math.max(0, myTurn - currentlyServing)
  const waitMin = turnsAhead * 10
  const progress = Math.round((currentlyServing / QUEUE_MAX) * 100)

  return (
    <div className="rounded-2xl bg-lm-black p-5 mb-8">
      <p className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-4">
        Tu número de turno
      </p>
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0">
          <div className="w-[72px] h-[72px] rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">#{myTurn}</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Atendiendo', value: `#${currentlyServing}`, color: 'text-white' },
              { label: 'Antes de ti', value: `${turnsAhead}`, color: 'text-white' },
              { label: 'Espera est.', value: `~${waitMin} min`, color: 'text-lm-green' },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <p className="text-[10px] text-white/35 mb-0.5">{label}</p>
                <p className={`text-[15px] font-bold leading-tight ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className="h-full bg-lm-green rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-white/20">Turno #1</span>
            <span className="text-[10px] text-white/20">Turno #{QUEUE_MAX}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RequestForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [myTurn] = useState(() => QUEUE_BASE + Math.floor(Math.random() * 7) + 4)
  const [currentlyServing, setCurrentlyServing] = useState(QUEUE_BASE)
  const headingRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.from(headingRef.current, {
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
    })

    gsap.from(formRef.current, {
      y: 32,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: formRef.current, start: 'top 88%', once: true },
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentlyServing((prev) => (prev < myTurn - 1 ? prev + 1 : prev))
    }, 12000)
    return () => clearInterval(timer)
  }, [myTurn])

  function validate() {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'El nombre es requerido'
    if (!form.correo.trim()) e.correo = 'El correo es requerido'
    else if (!/\S+@\S+\.\S+/.test(form.correo)) e.correo = 'Correo no válido'
    if (form.equipos.length === 0) e.equipos = 'Selecciona al menos un equipo'
    if (!form.fechaEntrega) e.fechaEntrega = 'Fecha requerida'
    if (!form.horaEntrega) e.horaEntrega = 'Hora requerida'
    if (!form.fechaDevolucion) e.fechaDevolucion = 'Fecha requerida'
    if (!form.horaDevolucion) e.horaDevolucion = 'Hora requerida'
    if (
      form.fechaEntrega &&
      form.horaEntrega &&
      form.fechaDevolucion &&
      form.horaDevolucion
    ) {
      const dtEntrega = new Date(`${form.fechaEntrega}T${form.horaEntrega}`)
      const dtDevolucion = new Date(`${form.fechaDevolucion}T${form.horaDevolucion}`)
      if (dtDevolucion <= dtEntrega) {
        e.horaDevolucion = 'La devolución debe ser posterior a la entrega'
      }
    }
    if (!form.proposito.trim()) e.proposito = 'Describe el propósito del préstamo'
    return e
  }

  function handleEquipoToggle(id) {
    setForm((prev) => ({
      ...prev,
      equipos: prev.equipos.includes(id)
        ? prev.equipos.filter((e) => e !== id)
        : [...prev.equipos, id],
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 1400))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <section id="solicitar" className="section-pad bg-lm-light">
        <div className="container-lm">
          <div className="max-w-[540px] mx-auto text-center py-16">
            <div className="w-16 h-16 rounded-full bg-lm-green/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-lm-green" />
            </div>
            <h2 className="headline-md text-lm-black">Solicitud confirmada</h2>
            <p className="body-lg mt-4">
              Turno <span className="font-semibold text-lm-black">#{myTurn}</span> — Recibirás
              una confirmación por correo cuando sea tu turno.
            </p>
            <button
              onClick={() => {
                setStatus('idle')
                setForm(initialForm)
              }}
              className="mt-8 px-7 py-3 rounded-full bg-lm-black text-white text-[15px] font-semibold hover:bg-lm-black/85 active:scale-[0.98] transition-all"
            >
              Nueva solicitud
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="solicitar" className="section-pad bg-lm-light">
      <div className="container-lm">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          <div ref={headingRef}>
            <h2 className="headline-lg text-lm-black">Solicita tu préstamo.</h2>
            <p className="body-lg mt-4">
              Completa el formulario, elige tu horario y el equipo estará listo cuando llegues.
            </p>

            <div className="mt-10 space-y-5">
              {[
                {
                  icon: '🎫',
                  title: 'Sistema de turnos',
                  desc: 'Recibe tu número al iniciar. Sabrás exactamente cuándo es tu turno.',
                },
                {
                  icon: '🕐',
                  title: 'Horarios en intervalos de 15 min',
                  desc: 'Elige el horario exacto para la entrega y la devolución del equipo.',
                },
                {
                  icon: '🔔',
                  title: 'Recordatorios automáticos',
                  desc: 'Te avisamos antes de la fecha de devolución para evitar retrasos.',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-lm-black text-[15px]">{item.title}</p>
                    <p className="text-lm-gray text-[13px] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-3xl border border-black/[0.06] p-8 md:p-10 shadow-sm"
          >
            <TurnWidget myTurn={myTurn} currentlyServing={currentlyServing} />

            <div className="space-y-6">
              <Field
                label="Nombre completo"
                id="nombre"
                type="text"
                placeholder="Tu nombre y apellido"
                value={form.nombre}
                onChange={(v) => setForm({ ...form, nombre: v })}
                error={errors.nombre}
                required
              />

              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  label="Correo institucional"
                  id="correo"
                  type="email"
                  placeholder="nombre@universidad.edu"
                  value={form.correo}
                  onChange={(v) => setForm({ ...form, correo: v })}
                  error={errors.correo}
                  required
                />
                <Field
                  label="Carrera / Programa"
                  id="carrera"
                  type="text"
                  placeholder="Ej: Comunicación Audiovisual"
                  value={form.carrera}
                  onChange={(v) => setForm({ ...form, carrera: v })}
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-lm-black mb-2">
                  Equipos solicitados <span className="text-lm-red">*</span>
                </label>
                <div className="grid sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 rounded-xl border border-black/[0.08] p-3 bg-lm-light">
                  {availableItems.map((item) => {
                    const checked = form.equipos.includes(item.id)
                    return (
                      <label
                        key={item.id}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer transition-colors ${
                          checked ? 'bg-lm-black text-white' : 'hover:bg-white text-lm-black'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => handleEquipoToggle(item.id)}
                        />
                        <span
                          className={`w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center ${
                            checked ? 'bg-white border-white' : 'border-black/25'
                          }`}
                        >
                          {checked && <span className="w-2 h-2 rounded-sm bg-lm-black" />}
                        </span>
                        <span className="text-[13px] font-medium leading-tight">{item.name}</span>
                      </label>
                    )
                  })}
                </div>
                {errors.equipos && (
                  <p className="mt-1.5 text-[12px] text-lm-red">{errors.equipos}</p>
                )}
              </div>

              <div>
                <p className="text-[13px] font-semibold text-lm-black mb-3">
                  Fecha y hora de entrega <span className="text-lm-red">*</span>
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="Fecha"
                    id="fechaEntrega"
                    type="date"
                    value={form.fechaEntrega}
                    onChange={(v) => setForm({ ...form, fechaEntrega: v })}
                    error={errors.fechaEntrega}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <TimeSelect
                    label="Hora"
                    id="horaEntrega"
                    value={form.horaEntrega}
                    onChange={(v) => setForm({ ...form, horaEntrega: v })}
                    error={errors.horaEntrega}
                    required
                  />
                </div>
              </div>

              <div>
                <p className="text-[13px] font-semibold text-lm-black mb-3">
                  Fecha y hora de devolución <span className="text-lm-red">*</span>
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="Fecha"
                    id="fechaDevolucion"
                    type="date"
                    value={form.fechaDevolucion}
                    onChange={(v) => setForm({ ...form, fechaDevolucion: v })}
                    error={errors.fechaDevolucion}
                    required
                    min={form.fechaEntrega || new Date().toISOString().split('T')[0]}
                  />
                  <TimeSelect
                    label="Hora"
                    id="horaDevolucion"
                    value={form.horaDevolucion}
                    onChange={(v) => setForm({ ...form, horaDevolucion: v })}
                    error={errors.horaDevolucion}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="proposito"
                  className="block text-[13px] font-medium text-lm-black mb-2"
                >
                  Propósito del préstamo <span className="text-lm-red">*</span>
                </label>
                <textarea
                  id="proposito"
                  rows={3}
                  placeholder="Describe brevemente el proyecto o actividad..."
                  value={form.proposito}
                  onChange={(e) => setForm({ ...form, proposito: e.target.value })}
                  className={`w-full rounded-xl border px-4 py-3 text-[14px] text-lm-black placeholder:text-lm-gray/60 outline-none transition-colors resize-none ${
                    errors.proposito
                      ? 'border-lm-red focus:border-lm-red'
                      : 'border-black/[0.12] focus:border-lm-black'
                  }`}
                />
                {errors.proposito && (
                  <p className="mt-1.5 text-[12px] text-lm-red">{errors.proposito}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-8 w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-lm-black text-white text-[15px] font-semibold hover:bg-lm-black/85 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150"
            >
              {status === 'loading' ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Enviando solicitud...
                </>
              ) : (
                'Confirmar turno y solicitar'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({ label, id, type, placeholder, value, onChange, error, required, min }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[13px] font-medium text-lm-black mb-2">
        {label} {required && <span className="text-lm-red">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`w-full rounded-xl border px-4 py-3 text-[14px] text-lm-black placeholder:text-lm-gray/60 outline-none transition-colors ${
          error
            ? 'border-lm-red focus:border-lm-red'
            : 'border-black/[0.12] focus:border-lm-black'
        }`}
      />
      {error && <p className="mt-1.5 text-[12px] text-lm-red">{error}</p>}
    </div>
  )
}

function TimeSelect({ label, id, value, onChange, error, required }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[13px] font-medium text-lm-black mb-2">
        {label} {required && <span className="text-lm-red">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-xl border px-4 py-3 text-[14px] outline-none appearance-none bg-white transition-colors pr-10 ${
            error
              ? 'border-lm-red focus:border-lm-red'
              : 'border-black/[0.12] focus:border-lm-black'
          } ${!value ? 'text-lm-gray/60' : 'text-lm-black'}`}
        >
          <option value="">Seleccionar hora</option>
          {TIME_SLOTS.map((slot) => (
            <option key={slot.value} value={slot.value}>
              {slot.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-lm-gray pointer-events-none"
        />
      </div>
      {error && <p className="mt-1.5 text-[12px] text-lm-red">{error}</p>}
    </div>
  )
}
