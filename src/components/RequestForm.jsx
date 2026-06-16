import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle, Loader } from 'lucide-react'
import { equipment } from '../data/equipment'

gsap.registerPlugin(ScrollTrigger)

const availableItems = equipment.filter((e) => e.status === 'disponible')

const initialForm = {
  nombre: '',
  correo: '',
  carrera: '',
  equipos: [],
  fechaInicio: '',
  fechaFin: '',
  proposito: '',
}

export default function RequestForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.from(headingRef.current, {
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 85%',
        once: true,
      },
    })

    gsap.from(formRef.current, {
      y: 32,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: formRef.current,
        start: 'top 88%',
        once: true,
      },
    })
  }, [])

  function validate() {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'El nombre es requerido'
    if (!form.correo.trim()) e.correo = 'El correo es requerido'
    else if (!/\S+@\S+\.\S+/.test(form.correo)) e.correo = 'Correo no válido'
    if (form.equipos.length === 0) e.equipos = 'Selecciona al menos un equipo'
    if (!form.fechaInicio) e.fechaInicio = 'Fecha de inicio requerida'
    if (!form.fechaFin) e.fechaFin = 'Fecha de devolución requerida'
    if (form.fechaInicio && form.fechaFin && form.fechaFin <= form.fechaInicio)
      e.fechaFin = 'La fecha de devolución debe ser posterior a la de inicio'
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
      <section id="solicitar" className="section-pad bg-lm-light" ref={sectionRef}>
        <div className="container-lm">
          <div className="max-w-[540px] mx-auto text-center py-16">
            <div className="w-16 h-16 rounded-full bg-lm-green/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-lm-green" />
            </div>
            <h2 className="headline-md text-lm-black">Solicitud enviada</h2>
            <p className="body-lg mt-4">
              Recibirás una confirmación en tu correo en las próximas 24 horas con los detalles del préstamo.
            </p>
            <button
              onClick={() => { setStatus('idle'); setForm(initialForm) }}
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
    <section id="solicitar" className="section-pad bg-lm-light" ref={sectionRef}>
      <div className="container-lm">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          <div ref={headingRef}>
            <h2 className="headline-lg text-lm-black">
              Solicita tu préstamo.
            </h2>
            <p className="body-lg mt-4">
              Completa el formulario y el equipo de Laboratorio de Medios procesará tu solicitud.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { icon: '📋', title: 'Confirmación en 24 hrs', desc: 'Recibes respuesta por correo el siguiente día hábil.' },
                { icon: '📦', title: 'Equipo revisado', desc: 'Todo el material es verificado antes de entregarse.' },
                { icon: '🔔', title: 'Recordatorios automáticos', desc: 'Te avisamos el día antes de la fecha de devolución.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="text-xl mt-0.5">{item.icon}</span>
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
                        <span className={`w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center ${
                          checked ? 'bg-white border-white' : 'border-black/25'
                        }`}>
                          {checked && <span className="w-2 h-2 rounded-sm bg-lm-black" />}
                        </span>
                        <span className="text-[13px] font-medium leading-tight">{item.name}</span>
                      </label>
                    )
                  })}
                </div>
                {errors.equipos && <p className="mt-1.5 text-[12px] text-lm-red">{errors.equipos}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  label="Fecha de inicio"
                  id="fechaInicio"
                  type="date"
                  value={form.fechaInicio}
                  onChange={(v) => setForm({ ...form, fechaInicio: v })}
                  error={errors.fechaInicio}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
                <Field
                  label="Fecha de devolución"
                  id="fechaFin"
                  type="date"
                  value={form.fechaFin}
                  onChange={(v) => setForm({ ...form, fechaFin: v })}
                  error={errors.fechaFin}
                  required
                  min={form.fechaInicio || new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label htmlFor="proposito" className="block text-[13px] font-medium text-lm-black mb-2">
                  Propósito del préstamo <span className="text-lm-red">*</span>
                </label>
                <textarea
                  id="proposito"
                  rows={3}
                  placeholder="Describe brevemente el proyecto o actividad para la que necesitas el equipo..."
                  value={form.proposito}
                  onChange={(e) => setForm({ ...form, proposito: e.target.value })}
                  className={`w-full rounded-xl border px-4 py-3 text-[14px] text-lm-black placeholder:text-lm-gray/60 outline-none transition-colors resize-none ${
                    errors.proposito
                      ? 'border-lm-red focus:border-lm-red'
                      : 'border-black/[0.12] focus:border-lm-black'
                  }`}
                />
                {errors.proposito && <p className="mt-1.5 text-[12px] text-lm-red">{errors.proposito}</p>}
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
                'Enviar solicitud'
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
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border px-4 py-3 text-[14px] text-lm-black placeholder:text-lm-gray/60 outline-none transition-colors ${
          error
            ? 'border-lm-red focus:border-lm-red'
            : 'border-black/[0.12] focus:border-lm-black'
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[12px] text-lm-red">
          {error}
        </p>
      )}
    </div>
  )
}
