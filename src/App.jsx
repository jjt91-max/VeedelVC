import { useState, useMemo, useRef } from 'react'
import {
  Salad, Coffee, Wine, Clock, MapPin, ChevronDown, ChevronUp,
  Plus, Minus, ShoppingCart, Check, X, Truck, Calendar,
  Building, Mail, Phone, User, Star, Leaf, ArrowRight,
  Menu, X as XIcon, Sparkles, UtensilsCrossed, Sun
} from 'lucide-react'

// ===== DATA =====
const drinks = [
  { name: 'Kaffee', price: 3.00 },
  { name: 'Cappuccino', price: 3.50 },
  { name: 'Latte', price: 4.00 },
  { name: 'Espresso', price: 2.50 },
  { name: 'Tee', price: 3.00 },
  { name: 'Säfte (klein)', price: 3.80 },
  { name: 'Säfte (groß)', price: 4.50 },
  { name: 'Fritz Cola/Limo', price: 2.90 },
  { name: 'Bionade', price: 3.90 },
  { name: 'Eistee', price: 3.90 },
  { name: 'Wasser', price: 2.90 },
  { name: 'Bier', price: 3.50 },
]

const meals = [
  { name: 'Veedel Vital Teller klein (2 Salate frei wählbar)', price: 7.90 },
  { name: 'Veedel Vital Teller groß (4 Salate frei wählbar)', price: 12.50 },
  { name: 'Einzelsalate', price: 7.90 },
]

const pastas = [
  { name: 'Aglio e Olio', price: 8.90 },
  { name: 'Pomodore Ricotta', price: 9.90 },
  { name: 'Tonno Picante', price: 10.90 },
]

const bundles = [
  {
    id: 1,
    name: 'Südstadt Brainfood Lunch',
    price: 18.50,
    minPersons: 8,
    desc: 'Großer Veedel Vital Teller + 1x Kaltgetränk',
  },
  {
    id: 2,
    name: 'Rheinauhafen Premium Business',
    price: 24.90,
    minPersons: 10,
    desc: 'Großer Veedel Vital Teller + 1x frischer Saft groß + 1x Kaffee-Spezialität im Thermos-Dispenser',
  },
  {
    id: 3,
    name: 'Carb & Green Energy',
    price: 21.50,
    minPersons: 10,
    desc: '1x Pasta nach Wahl + 1x kleiner Beilagensalat + 1x Erfrischungsgetränk',
  },
]

const mixItems = [
  { id: 'grosser_salat', name: 'Großer Salat-Teller', price: 13.50 },
  { id: 'pasta_aglio', name: 'Pasta Aglio e Olio', price: 13.50 },
  { id: 'pasta_pomodore', name: 'Pasta Pomodore', price: 13.50 },
  { id: 'pasta_tonno', name: 'Pasta Tonno', price: 13.50 },
]

// ===== COMPONENTS =====

function Navbar({ activeSection, setActiveSection, scrollToSection }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { id: 'hero', label: 'Startseite' },
    { id: 'menu', label: 'Speisekarte' },
    { id: 'about', label: 'Über uns' },
    { id: 'b2b', label: 'B2B Catering-Portal' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <Salad className="w-7 h-7 text-green-600" />
            <span className="text-xl font-bold text-gray-800">Veedel <span className="text-green-600">Vital</span></span>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => scrollToSection(l.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection === l.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                }`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('b2b')}
              className="ml-3 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              B2B Catering Planen
            </button>
          </div>

          {/* Mobile trigger */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <XIcon className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-green-100 px-4 pb-4 pt-2 space-y-1">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => { scrollToSection(l.id); setMobileOpen(false) }}
              className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
                activeSection === l.id ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-green-50'
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { scrollToSection('b2b'); setMobileOpen(false) }}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 mt-2"
          >
            <Sparkles className="w-4 h-4" /> B2B Catering Planen
          </button>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-green-500/20 backdrop-blur-sm text-green-300 px-3 py-1 rounded-full text-sm font-medium border border-green-400/30">
              Ab sofort geöffnet
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
            Frisch. Gesund.<br />
            <span className="text-green-400">Südstadt.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
            Ihre Salatbar direkt am Chlodwigplatz. Knackige Bowls, frische Pasta und Säfte für jeden Tag – im Laden oder als Premium-Catering für Ihr Büro.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all shadow-xl hover:shadow-green-600/30 flex items-center gap-2"
            >
              <UtensilsCrossed className="w-5 h-5" /> Speisekarte entdecken
            </button>
            <button
              onClick={() => document.getElementById('b2b')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-8 py-3 rounded-full font-semibold text-lg transition-all flex items-center gap-2"
            >
              <Building className="w-5 h-5" /> B2B Catering
            </button>
          </div>

          {/* Opening hours prominent */}
          <div className="mt-10 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5 inline-block">
            <div className="flex items-center gap-3 text-white">
              <Clock className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-sm text-gray-300">Öffnungszeiten</p>
                <p className="font-bold text-lg">Montag – Freitag: 10:00 – 15:00 Uhr</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-gray-300 text-sm">
            <MapPin className="w-4 h-4 text-green-400" />
            <span>Chlodwigplatz, Köln – Südstadt</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function MenuSection() {
  const [category, setCategory] = useState('drinks')

  const items = category === 'drinks' ? drinks : category === 'meals' ? meals : pastas

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Unsere <span className="text-green-600">Speisekarte</span></h2>
          <p className="text-gray-500 text-lg">Frisch zubereitet – direkt am Chlodwigplatz</p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {[
            { id: 'drinks', label: 'Getränke', icon: Coffee },
            { id: 'meals', label: 'Salate', icon: Salad },
            { id: 'pasta', label: 'Pasta', icon: Wine },
          ].map(c => {
            const Icon = c.icon
            return (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all ${
                  category === c.id
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" /> {c.label}
              </button>
            )
          })}
        </div>

        {/* Items grid */}
        <div className="grid gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 group-hover:scale-150 transition-transform" />
                <span className="text-gray-700 font-medium">{item.name}</span>
              </div>
              <span className="text-green-700 font-bold text-lg">
                {item.price.toFixed(2).replace('.', ',')}€
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Über <span className="text-green-600">Veedel Vital</span>
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Mitten im Herzen der Kölner Südstadt, direkt am Chlodwigplatz, servieren wir Ihnen täglich
                frisch zubereitete Salate, Bowls und Pasta – mit Liebe und den besten Zutaten der Saison.
              </p>
              <p>
                Unser Family-Run-Business steht für gesunde Ernährung ohne Kompromisse. Jedes Gericht wird
                vor Ort zubereitet, von unserem kleinen aber feinen Team.
              </p>
              <p>
                Ob schneller Mittags-Lunch im Laden oder exklusives Office-Catering für Ihr Unternehmen –
                wir bringen Vitalität in Ihr Veedel.
              </p>
            </div>
            <div className="flex items-center gap-6 mt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-green-200 border-2 border-white flex items-center justify-center text-green-700 font-bold text-sm">
                    {['MH', 'LK', 'JS'][i - 1]}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-bold text-gray-700">Unser Team</span><br />
                Für Sie da seit 2023
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2070&auto=format&fit=crop"
              alt="Salatbar"
              className="rounded-2xl shadow-2xl object-cover w-full h-80"
            />
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-gray-800">4.9</span>
                <span className="text-gray-500 text-sm">(128 Bewertungen)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function B2BSection() {
  const [tab, setTab] = useState('bundles')
  const [persons, setPersons] = useState({})
  const [mixPersons, setMixPersons] = useState(1)
  const [mixQtys, setMixQtys] = useState(mixItems.reduce((a, i) => ({ ...a, [i.id]: 0 }), {}))
  const [addDrinks, setAddDrinks] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('11:30')
  const [form, setForm] = useState({ company: '', contact: '', email: '', address: '' })
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const updateBundlePersons = (bundleId, val) => {
    setPersons(prev => ({ ...prev, [bundleId]: Math.max(0, val) }))
  }

  const bundleTotal = useMemo(() => {
    return bundles.map(b => {
      const p = persons[b.id] || 0
      return { ...b, persons: p, total: p * b.price, tooFew: p > 0 && p < b.minPersons }
    })
  }, [persons])

  const totalMixSelected = Object.values(mixQtys).reduce((a, b) => a + b, 0)
  const mixRemaining = Math.max(0, mixPersons - totalMixSelected)

  const mixSubtotal = useMemo(() => {
    return Object.entries(mixQtys).reduce((sum, [id, qty]) => sum + qty * (mixItems.find(i => i.id === id)?.price || 0), 0)
  }, [mixQtys])

  const mixDrinksCost = addDrinks ? mixPersons * 3.90 : 0
  const mixTotal = mixSubtotal + mixDrinksCost

  // combined for delivery logic
  const cateringTotal = tab === 'bundles'
    ? bundleTotal.reduce((s, b) => s + b.total, 0)
    : mixTotal

  const deliveryFee = cateringTotal > 0 && cateringTotal < 150 ? 15.00 : 0
  const grandTotal = cateringTotal + deliveryFee

  const today = new Date().toISOString().split('T')[0]

  const getNextWeekday = (d) => {
    const date = new Date(d)
    const day = date.getDay()
    if (day === 0) date.setDate(date.getDate() + 1)
    if (day === 6) date.setDate(date.getDate() + 2)
    return date.toISOString().split('T')[0]
  }

  const handleDateChange = (e) => {
    const val = e.target.value
    const day = new Date(val + 'T12:00').getDay()
    if (day === 0 || day === 6) {
      setErrors(prev => ({ ...prev, date: 'Bitte wählen Sie einen Wochentag (Mo–Fr).' }))
      setDeliveryDate('')
    } else {
      setErrors(prev => ({ ...prev, date: '' }))
      setDeliveryDate(val)
    }
  }

  const validateForm = () => {
    const errs = {}
    if (!form.company.trim()) errs.company = 'Bitte Firmenname eingeben'
    if (!form.contact.trim()) errs.contact = 'Bitte Ansprechpartner eingeben'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Gültige E-Mail-Adresse eingeben'
    if (!form.address.trim()) errs.address = 'Bitte Lieferadresse eingeben'
    if (!deliveryDate) errs.date = 'Bitte Lieferdatum wählen'
    if (cateringTotal === 0) errs.order = 'Bitte mindestens ein Produkt auswählen'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleBooking = () => {
    if (!validateForm()) return
    setShowSuccess(true)
  }

  return (
    <section id="b2b" className="py-24 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Building className="w-4 h-4" /> B2B Catering
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Healthy Lunch für Ihr <span className="text-green-600">Kölner Team</span></h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Exklusive Office-Bundles & maßgeschneiderte Lieferung für Agenturen, Kanzleien und Unternehmen im Umkreis.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {[
            { id: 'bundles', label: 'Vorgefertigte B2B-Bundles' },
            { id: 'mix', label: 'Individueller Team-Lunch' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all ${
                tab === t.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
          {tab === 'bundles' ? (
            <div className="space-y-6">
              {bundleTotal.map((b) => (
                <div key={b.id} className={`p-5 rounded-2xl border transition-all ${b.tooFew ? 'border-red-300 bg-red-50' : 'border-gray-100 hover:border-green-200'}`}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-800">{b.name}</h4>
                      <p className="text-gray-500 text-sm mt-1">{b.desc}</p>
                      <p className="text-green-700 font-bold mt-2">
                        {b.price.toFixed(2).replace('.', ',')}€ / Person
                        <span className="text-gray-400 font-normal text-sm ml-2">(ab {b.minPersons} Personen)</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateBundlePersons(b.id, (persons[b.id] || 0) - 1)}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="w-12 text-center font-bold text-xl text-gray-800">{persons[b.id] || 0}</span>
                      <button
                        onClick={() => updateBundlePersons(b.id, (persons[b.id] || 0) + 1)}
                        className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-all"
                      >
                        <Plus className="w-4 h-4 text-green-700" />
                      </button>
                    </div>
                  </div>
                  {b.tooFew && (
                    <p className="text-red-600 text-sm mt-3 flex items-center gap-1">
                      <X className="w-4 h-4" /> Mindestens {b.minPersons} Personen erforderlich
                    </p>
                  )}
                  {b.persons >= b.minPersons && (
                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Zwischensumme</span>
                      <span className="font-bold text-xl text-green-700">{(b.persons * b.price).toFixed(2).replace('.', ',')}€</span>
                    </div>
                  )}
                </div>
              ))}
              {bundleTotal.some(b => b.persons >= b.minPersons) && (
                <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold text-gray-700">Bundles Zwischensumme</span>
                    <span className="font-bold text-2xl text-green-700">{bundleTotal.reduce((s, b) => s + (b.persons >= b.minPersons ? b.total : 0), 0).toFixed(2).replace('.', ',')}€</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <label className="text-gray-700 font-medium">Anzahl Personen:</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMixPersons(Math.max(1, mixPersons - 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-12 text-center font-bold text-2xl text-gray-800">{mixPersons}</span>
                  <button
                    onClick={() => setMixPersons(mixPersons + 1)}
                    className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 text-green-700" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                {mixItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-green-50 transition-all">
                    <div>
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-gray-400 text-sm ml-2">{item.price.toFixed(2).replace('.', ',')}€</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setMixQtys(prev => ({ ...prev, [item.id]: Math.max(0, prev[item.id] - 1) }))}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-bold text-gray-800">{mixQtys[item.id]}</span>
                      <button
                        onClick={() => setMixQtys(prev => ({ ...prev, [item.id]: prev[item.id] + 1 }))}
                        className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3 text-green-700" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
                <p className="text-blue-800 font-medium">
                  Noch <span className="font-bold text-xl">{mixRemaining}</span> Gerichte für {mixPersons} Personen offen
                </p>
                {mixRemaining > 0 && (
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(100, (totalMixSelected / mixPersons) * 100)}%` }}
                    />
                  </div>
                )}
              </div>

              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-all">
                <input
                  type="checkbox"
                  checked={addDrinks}
                  onChange={e => setAddDrinks(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-gray-700">
                  Gekühlte Premium-Kaltgetränke für alle hinzufügen <span className="text-green-700 font-bold">(+3,90€ pro Person)</span>
                </span>
              </label>

              {mixTotal > 0 && (
                <div className="mt-4 p-4 bg-green-50 rounded-2xl border border-green-200">
                  <div className="space-y-1 text-sm text-gray-500">
                    <div className="flex justify-between"><span>Gerichte</span><span>{mixSubtotal.toFixed(2).replace('.', ',')}€</span></div>
                    {addDrinks && <div className="flex justify-between"><span>Getränke ({mixPersons} × 3,90€)</span><span>{mixDrinksCost.toFixed(2).replace('.', ',')}€</span></div>}
                  </div>
                  <div className="flex justify-between text-lg font-bold text-green-700 border-t border-green-200 pt-2 mt-2">
                    <span>Mix & Match Zwischensumme</span>
                    <span>{mixTotal.toFixed(2).replace('.', ',')}€</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Delivery infos */}
          {cateringTotal > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-600" /> Lieferdetails
              </h3>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" /> Lieferdatum (Mo–Fr)
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={handleDateChange}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  />
                  {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    <Clock className="w-4 h-4 inline mr-1" /> Zeitfenster
                  </label>
                  <div className="flex gap-3">
                    {['11:30', '12:00'].map(t => (
                      <label key={t} className={`flex-1 p-3 rounded-xl border cursor-pointer text-center transition-all ${
                        deliveryTime === t ? 'border-green-500 bg-green-50 text-green-700 font-medium' : 'border-gray-200 hover:border-green-300'
                      }`}>
                        <input
                          type="radio"
                          name="time"
                          value={t}
                          checked={deliveryTime === t}
                          onChange={e => setDeliveryTime(e.target.value)}
                          className="sr-only"
                        />
                        {t} – {t === '11:30' ? '12:00' : '12:30'} Uhr
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Zwischensumme Catering</span>
                    <span className="font-medium">{cateringTotal.toFixed(2).replace('.', ',')}€</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Lieferung</span>
                    <span className={`font-medium ${deliveryFee === 0 && cateringTotal >= 150 ? 'text-green-600' : 'text-gray-700'}`}>
                      {deliveryFee === 0
                        ? (cateringTotal >= 150 ? '✨ Gratis ab 150€' : '0,00€')
                        : `${deliveryFee.toFixed(2).replace('.', ',')}€ (Lieferpauschale)`}
                    </span>
                  </div>
                  {cateringTotal > 0 && cateringTotal < 150 && (
                    <p className="text-sm text-amber-600 flex items-center gap-1">
                      <X className="w-4 h-4" /> Noch {(150 - cateringTotal).toFixed(2).replace('.', ',')}€ für kostenfreie Lieferung
                    </p>
                  )}
                  <div className="flex justify-between text-xl font-bold text-gray-800 border-t border-gray-200 pt-2">
                    <span>Gesamtsumme</span>
                    <span>{grandTotal.toFixed(2).replace('.', ',')}€</span>
                  </div>
                </div>
              </div>

              {/* B2B Form */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1"><Building className="w-4 h-4 inline mr-1" /> Firmenname</label>
                  <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-green-400 outline-none transition-all" placeholder="Muster GmbH" />
                  {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1"><User className="w-4 h-4 inline mr-1" /> Ansprechpartner</label>
                  <input value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-green-400 outline-none transition-all" placeholder="Max Mustermann" />
                  {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1"><Mail className="w-4 h-4 inline mr-1" /> E-Mail (Buchhaltung)</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-green-400 outline-none transition-all" placeholder="buchhaltung@firma.de" />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1"><MapPin className="w-4 h-4 inline mr-1" /> Lieferadresse (Köln)</label>
                  <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-green-400 outline-none transition-all" placeholder="Musterstr. 1, 50678 Köln" />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              </div>
              {errors.order && <p className="text-red-500 text-sm mb-4">{errors.order}</p>}

              <button
                onClick={handleBooking}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-green-600/30 flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-5 h-5" /> Jetzt kostenpflichtig buchen via Stripe — {grandTotal.toFixed(2).replace('.', ',')}€
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowSuccess(false)}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center relative animate-in" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Vielen Dank! 🎉</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Die B2B-Rechnung wurde automatisiert an Ihre Buchhaltung gesendet und die Küche am Chlodwigplatz bereitet alles vor.
            </p>
            <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left space-y-2 text-sm">
              <p><span className="font-medium text-gray-700">Firma:</span> {form.company}</p>
              <p><span className="font-medium text-gray-700">Lieferung:</span> {deliveryDate} um {deliveryTime} Uhr</p>
              <p><span className="font-medium text-gray-700">Gesamtsumme:</span> {grandTotal.toFixed(2).replace('.', ',')}€</p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-all"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Salad className="w-6 h-6 text-green-400" />
              <span className="text-lg font-bold text-white">Veedel <span className="text-green-400">Vital</span></span>
            </div>
            <p className="text-sm leading-relaxed">Frische Salatbar am Chlodwigplatz, Köln-Südstadt. Gesund genießen – im Laden oder als Catering.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="hover:text-green-400 transition-all">Impressum</button></li>
              <li><button className="hover:text-green-400 transition-all">Datenschutz (DSGVO)</button></li>
              <li><button className="hover:text-green-400 transition-all">B2B-AGB</button></li>
              <li><button className="hover:text-green-400 transition-all">Cookie-Einstellungen</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Kontakt</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-green-400" /> Chlodwigplatz, 50678 Köln</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-green-400" /> 0221 / 123 45 67</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-green-400" /> hallo@veedelvital.de</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-xs">
          &copy; {new Date().getFullYear()} Veedel Vital – Alle Rechte vorbehalten. Mit 🥗 aus der Kölner Südstadt.
        </div>
      </div>
    </footer>
  )
}

// ===== APP =====
export default function App() {
  const [activeSection, setActiveSection] = useState('hero')

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // track active section on scroll
  const handleScroll = () => {
    const sections = ['hero', 'menu', 'about', 'b2b']
    for (const id of sections) {
      const el = document.getElementById(id)
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActiveSection(id)
          break
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-white" onScroll={handleScroll}>
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} scrollToSection={scrollToSection} />
      <Hero />
      <MenuSection />
      <AboutSection />
      <B2BSection />
      <Footer />
    </div>
  )
}