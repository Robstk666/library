import React, { useState } from 'react';
import { 
  Home, 
  Library, 
  Database, 
  BookOpen, 
  BellRing,
  Search,
  Filter,
  Plus,
  Share2,
  Download,
  Clock,
  BookMarked,
  FileText,
  Tag,
  ChevronDown,
  Check,
  LogOut,
  UserPlus,
  Eye,
  EyeOff,
  Info,
  User,
  ArrowRightLeft,
  Workflow,
  Settings
} from 'lucide-react';

const PERSONAS = {
  mikhail: {
    id: 'mikhail',
    initials: 'МИ',
    name: 'Михаил Иванов',
    role: 'Старший научный сотрудник',
    color: 'bg-blue-600',
    stats: {
      loans: 3,
      saved: 142,
      hIndex: 4,
    },
    topic: 'Квантовая физика',
    trend: '↑ стабильно',
    recommendations: [
      {
        type: 'Монография',
        title: 'Квантовые вычисления и алгоритмы',
        desc: 'Новое издание, охватывающее последние достижения в области квантовых симуляций.',
        icon: BookMarked,
        colorClass: 'bg-blue-800'
      },
      {
        type: 'Статья • Nature',
        title: 'Topological quantum matter advances',
        desc: 'Обзор недавних экспериментальных прорывов в топологических фазах.',
        icon: FileText,
        colorClass: 'bg-emerald-700'
      }
    ],
    deadline: {
      days: 2,
      title: 'Основы квантовой механики (Ландау Л.Д.)',
      progress: '85%',
      color: 'bg-orange-500'
    },
    notifications: [
      { id: 1, text: 'Новое поступление ЭБС: "Квантовая криптография" по вашей теме.', time: '10 мин назад', unread: true },
      { id: 2, text: 'Напоминание: Срок выдачи книги "Основы квантовой механики" истекает через 2 дня.', time: '2 часа назад', unread: true }
    ]
  },
  anna: {
    id: 'anna',
    initials: 'АА',
    name: 'Анна А.',
    role: 'Аспирант',
    color: 'bg-purple-600',
    stats: {
      loans: 5,
      saved: 340,
      hIndex: 1,
    },
    topic: 'Когнитивная лингвистика',
    trend: '↑ растет',
    recommendations: [
      {
        type: 'Статья',
        title: 'Нейросети в обработке естественного языка',
        desc: 'Анализ современных архитектур трансформеров для задач NLP.',
        icon: FileText,
        colorClass: 'bg-purple-800'
      },
      {
        type: 'Сборник трудов',
        title: 'Когнитивные науки 2025',
        desc: 'Материалы конференции, посвященные нейромаркерам восприятия речи.',
        icon: BookMarked,
        colorClass: 'bg-indigo-700'
      }
    ],
    deadline: {
      days: 5,
      title: 'Язык и сознание (Лурия А.Р.)',
      progress: '40%',
      color: 'bg-blue-500'
    },
    notifications: [
      { id: 1, text: 'Сформирован новый выпуск журнала "Вопросы психолингвистики".', time: '1 час назад', unread: true },
      { id: 2, text: 'Заказ на оцифровку Главы 1 выполнен и доступен.', time: 'Вчера', unread: false }
    ]
  }
};

export default function App() {
  const [activePersona, setActivePersona] = useState<keyof typeof PERSONAS>('mikhail');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const user = PERSONAS[activePersona];

  // Helper for personalization hotspots
  const AnnotationPin = ({ title, desc, position = "-top-3 -right-3" }: { title: string, desc: string, position?: string }) => {
    if (!showAnnotations) return null;
    return (
      <div className={`absolute ${position} z-50 flex group`}>
        <span className="relative flex h-6 w-6 items-center justify-center cursor-pointer">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-600 border border-white shadow-md items-center justify-center text-white">
            <Info size={12} strokeWidth={3} />
          </span>
        </span>
        <div className="hidden group-hover:block absolute top-7 right-0 w-64 p-3.5 bg-slate-900/95 backdrop-blur-sm text-white text-xs rounded-xl shadow-2xl border border-slate-700/50 z-[60] transition-all">
          <strong className="block text-blue-400 mb-1.5 font-semibold text-sm leading-tight">{title}</strong>
          <p className="text-slate-300 leading-relaxed">{desc}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed inset-y-0 left-0 z-20">
        {/* Account Dropdown */}
        <div className="relative border-b border-slate-800">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-800 transition-colors focus:outline-none relative"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className={`w-11 h-11 rounded-full ${user.color} flex items-center justify-center text-white font-bold text-base shrink-0 shadow-inner transition-colors duration-300`}>
                {user.initials}
              </div>
              <div className="overflow-hidden">
                <h2 className="font-medium text-white text-sm truncate transition-all">{user.name}</h2>
                <p className="text-xs text-slate-400 truncate transition-all">{user.role}</p>
              </div>
            </div>
            <ChevronDown size={16} className={`text-slate-500 shrink-0 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            
            <AnnotationPin 
              title="Точка: Профиль" 
              desc="Данные об имени, статусе и роли. Влияют на набор доступных подписок, баз данных (ЭБС) и отображаемые метрики." 
              position="-top-2 right-2"
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full bg-slate-800 shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200 border-b border-slate-700">
              <div className="px-4 pb-2 mb-2 border-b border-slate-700/50 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Сменить профиль для демо
              </div>
              {Object.values(PERSONAS).map(p => (
                <button
                  key={p.id}
                  onClick={() => { setActivePersona(p.id as keyof typeof PERSONAS); setIsDropdownOpen(false); left: 0}}
                  className="w-full flex items-center justify-between px-4 py-2 hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`w-8 h-8 rounded-full ${p.color} flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-inner`}>
                      {p.initials}
                    </div>
                    <div className="text-left overflow-hidden">
                      <div className={`text-sm font-medium truncate ${activePersona === p.id ? 'text-white' : 'text-slate-300'}`}>{p.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{p.role}</div>
                    </div>
                  </div>
                  {activePersona === p.id && <Check size={16} className="text-blue-400 shrink-0 ml-2" />}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1 relative">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-blue-600/10 text-blue-400 rounded-lg font-medium transition-colors">
            <Home size={18} /> Главная
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors">
            <Library size={18} /> Мои коллекции
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors">
            <Database size={18} /> Электронные ресурсы
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors">
            <BookOpen size={18} /> Заказы и оцифровка
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors">
            <BellRing size={18} /> Настройки алертов
          </a>
          <a href="#schema" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors mt-auto text-slate-400 border border-slate-700/50">
            <Workflow size={18} /> Схема кабинета
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen relative">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-4 flex justify-between items-center gap-6">
          <div className="relative w-full max-w-xl flex items-center shadow-sm rounded-lg border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            <div className="pl-4 pr-2 text-slate-400">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Поиск по локальному каталогу, Scopus, eLibrary..." 
              className="w-full bg-transparent border-none py-2.5 text-sm focus:outline-none text-slate-700 placeholder-slate-400"
            />
            <button className="px-4 py-2 text-slate-500 hover:text-slate-700 border-l border-slate-200 flex items-center gap-2 text-sm font-medium transition-colors">
              <Filter size={16} /> Фильтры
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Toggle Annotations Button */}
            <button 
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={`px-4 py-2 flex items-center gap-2 text-sm font-semibold rounded-lg transition-colors border shadow-sm ${showAnnotations ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
            >
              {showAnnotations ? <Eye size={16} /> : <EyeOff size={16} />}
              Точки персонализации {showAnnotations ? 'ВКЛ' : 'ВЫКЛ'}
            </button>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-2.5 rounded-full transition-colors relative ${isNotificationsOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
              >
                <BellRing size={20} />
                {user.notifications.some(n => n.unread) && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute top-full mt-3 right-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-xl">
                    <h3 className="font-semibold text-slate-800 text-sm">Уведомления</h3>
                    <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">Прочитаны</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto relative">
                    {user.notifications.map(n => (
                      <div key={n.id} className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors ${n.unread ? 'bg-blue-50/30' : ''}`}>
                        <div className="flex gap-3">
                           <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${n.unread ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                           <div>
                             <p className="text-sm text-slate-800 leading-snug mb-1">{n.text}</p>
                             <span className="text-[10px] font-medium text-slate-400">{n.time}</span>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <AnnotationPin 
                    title="Точка: Уведомления (Алерты)" 
                    desc="Настраиваемые триггеры. Уведомляет читателя о новых статьях по его узкой теме или о скорых дедлайнах именно его корзины."
                    position="-bottom-3 -left-3"
                  />
                  <div className="p-2 bg-slate-50 rounded-b-xl text-center border-t border-slate-100">
                    <button className="text-xs font-semibold text-slate-500 hover:text-slate-700">Смотреть все</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-8 pb-12 overflow-x-hidden flex-1 animate-in fade-in duration-500">
          {/* VIEW 1: DASHBOARD */}
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Сводка</h1>
            
            {/* Metric Summary Row */}
            <div className="relative mb-8">
              <AnnotationPin 
                title="Точка: Подстраиваемые метрики" 
                desc="Меняются в зависимости от роли. Для научных сотрудников (СНС) выводится Индекс Хирша (РИНЦ), для аспирантов может быть показан другой KPI (собранная библиография)."
                position="-top-3 -right-2"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="text-sm font-medium text-slate-500 mb-1">Книг на руках</div>
                  <div className="text-3xl font-bold text-slate-900">{user.stats.loans}</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="text-sm font-medium text-slate-500 mb-1">Сохранено статей</div>
                  <div className="text-3xl font-bold text-slate-900">{user.stats.saved}</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex justify-between items-end">
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">Индекс Хирша (РИНЦ)</div>
                    <div className="text-3xl font-bold text-slate-900">{user.stats.hIndex}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${user.id === 'mikhail' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'}`}>
                    {user.trend}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personalized Recommendations */}
              <div className="lg:col-span-2 space-y-4 relative">
                <AnnotationPin 
                  title="Точка: Умные Рекомендации" 
                  desc={`Виджет формируется алгоритмом коллаборативной фильтрации. Сейчас настроен выдавать новинки строго по теме: "${user.topic}".`}
                  position="-top-3 -right-2"
                />
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-800">
                    Новые поступления по вашей теме 
                    <span className="inline-block text-blue-700 font-medium ml-3 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md text-sm transition-all duration-300">
                      {user.topic}
                    </span>
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {user.recommendations.map((rec, idx) => {
                    const Icon = rec.icon;
                    return (
                      <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 flex gap-4 hover:shadow-md transition-shadow group">
                        <div className="w-20 h-28 bg-slate-100 rounded-md shrink-0 border border-slate-200 flex items-center justify-center relative overflow-hidden">
                           <div className={`absolute inset-x-0 top-0 h-4 ${rec.colorClass} opacity-20`}></div>
                           <Icon size={24} className="text-slate-300" />
                        </div>
                        <div className="flex flex-col flex-1">
                          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{rec.type}</div>
                          <h3 className="font-semibold text-sm text-slate-900 mb-1 leading-tight group-hover:text-blue-600 transition-colors">{rec.title}</h3>
                          <p className="text-xs text-slate-500 mb-3 line-clamp-2">{rec.desc}</p>
                          <button className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 w-fit px-3 py-1.5 rounded-md">
                            <Plus size={14} /> В коллекцию
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Active Loans & Deadlines */}
              <div className="space-y-4 relative">
                <AnnotationPin 
                  title="Точка: Займы и Дедлайны" 
                  desc="Индивидуальный трекинг выданной литературы. Ползунок срока адаптируется под реальное оставшееся время."
                  position="-top-3 -right-2"
                />
                <h2 className="text-lg font-semibold text-slate-800">Займы и дедлайны</h2>
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2.5 bg-orange-50 rounded-lg border border-orange-100 text-orange-600 shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-slate-900">Возврат через {user.deadline.days} {user.deadline.days === 1 ? 'день' : (user.deadline.days > 4 ? 'дней' : 'дня')}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{user.deadline.title}</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4 overflow-hidden">
                    <div className={`${user.deadline.color} h-1.5 rounded-full transition-all duration-1000`} style={{ width: user.deadline.progress }}></div>
                  </div>
                  <button className="w-full py-2 text-sm border border-slate-200 text-slate-700 bg-slate-50 rounded-lg font-medium hover:bg-slate-100 hover:border-slate-300 transition-colors cursor-pointer">
                    Продлить срок
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Divider indicating separate view */}
          <div className="w-full h-px bg-slate-200 mt-16 mb-12 relative flex items-center justify-center">
            <span className="bg-slate-50 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center shadow-sm border border-slate-200 rounded-full py-1">
              Сценарий: Библиография (Мои коллекции)
            </span>
          </div>

          {/* VIEW 2: BIBLIOGRAPHY SCENARIO */}
          <div>
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <div className="text-sm text-slate-500 font-medium mb-1 flex items-center gap-2">
                  <Library size={16}/> Мои коллекции
                </div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Глава 1. Теоретическая база</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                  <Download size={16} /> Экспорт по ГОСТ
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                  <Download size={16} /> Формат BibTeX
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                  <Share2 size={16} /> Поделиться списком
                </button>
              </div>
            </div>

            {/* Bibliography Table View */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    <th className="px-6 py-4 w-1/4">Авторы</th>
                    <th className="px-6 py-4 w-2/5">Название</th>
                    <th className="px-6 py-4">Год</th>
                    <th className="px-6 py-4">Источник</th>
                    <th className="px-6 py-4">Теги</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  <tr className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 text-slate-700 align-top">Ivanov A., Smith J.</td>
                    <td className="px-6 py-4 font-medium text-slate-900 max-w-sm align-top leading-tight cursor-pointer group-hover:text-blue-600 transition-colors">Quantum Error Correction in Multi-Qubit Systems</td>
                    <td className="px-6 py-4 text-slate-600 align-top">2023</td>
                    <td className="px-6 py-4 text-slate-600 align-top">Physical Review Letters</td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-wrap gap-1.5">
                         <span className="px-2 py-1 bg-red-50 text-red-700 border border-red-100 text-[10px] rounded flex items-center font-semibold">
                           <Tag size={10} className="mr-1"/> Важное
                         </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 text-slate-700 align-top">Preskill J.</td>
                    <td className="px-6 py-4 font-medium text-slate-900 max-w-sm align-top leading-tight cursor-pointer group-hover:text-blue-600 transition-colors">Quantum Computing in the NISQ era and beyond</td>
                    <td className="px-6 py-4 text-slate-600 align-top">2018</td>
                    <td className="px-6 py-4 text-slate-600 align-top">Quantum</td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-wrap gap-1.5">
                         <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-100 text-[10px] rounded flex items-center font-semibold">
                           <Tag size={10} className="mr-1"/> Обзор
                         </span>
                         <span className="px-2 py-1 bg-slate-100 text-slate-600 border border-slate-200 text-[10px] rounded flex items-center font-semibold">Цитирование</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 text-slate-700 align-top">Feynman R. P.</td>
                    <td className="px-6 py-4 font-medium text-slate-900 max-w-sm align-top leading-tight cursor-pointer group-hover:text-blue-600 transition-colors">Simulating Physics with Computers</td>
                    <td className="px-6 py-4 text-slate-600 align-top">1982</td>
                    <td className="px-6 py-4 text-slate-600 align-top">Int. J. Theor. Phys.</td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-wrap gap-1.5">
                         <span className="px-2 py-1 bg-amber-50 text-amber-700 border border-amber-100 text-[10px] rounded flex items-center font-semibold">
                           <Tag size={10} className="mr-1"/> Классика
                         </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Visual Divider indicating separate view */}
          <div className="w-full h-px bg-slate-200 mt-20 mb-12 relative flex items-center justify-center">
            <span className="bg-slate-50 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center shadow-sm border border-slate-200 rounded-full py-1">
              Сценарий: Структурная схема (Карта)
            </span>
          </div>

          {/* VIEW 3: STRUCTURAL SCHEMA */}
          <div id="schema" className="mb-10 relative scroll-mt-24">
            <h1 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight flex items-center gap-3">
              <Workflow className="text-blue-600" /> Архитектура и связи разделов
            </h1>

            <AnnotationPin 
              title="Точка: Взаимодействие разделов" 
              desc="Схема отражает потоки данных. Научный профиль (1) служит ядром для генерации Рекомендаций на Главной (2) и Настройки алертов (5)."
              position="-top-2 left-96"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Box 1: Мой профиль */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group hover:shadow-md transition-all flex flex-col">
                <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Раздел 1</div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100"><User size={18} className="text-blue-600"/> Мой профиль</h3>
                <ul className="space-y-3 mb-6 text-sm text-slate-700">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Личные данные и статус</li>
                  <li className="flex items-center gap-2 font-semibold text-blue-700 bg-blue-50 p-1.5 rounded"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Научный профиль (ORCID, РИНЦ)</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Аналитика истории поиска</li>
                </ul>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
                  <ArrowRightLeft size={14} className="text-orange-400 shrink-0 mt-0.5" />
                  <p>Формирует теги, которые передаются в <span className="font-semibold text-slate-700">Рекомендации</span> и <span className="font-semibold text-slate-700">Настройки алертов</span>.</p>
                </div>
              </div>

              {/* Box 2: Главная */}
             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group hover:shadow-md transition-all flex flex-col">
                <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Раздел 2</div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100"><Home size={18} className="text-blue-600"/> Главная (Дашборд)</h3>
                <ul className="space-y-3 mb-6 text-sm text-slate-700">
                  <li className="flex items-center gap-2 text-slate-500 line-through decoration-slate-300"><div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div> Сводка на сегодня (Займы)</li>
                  <li className="flex items-center gap-2 font-semibold text-blue-700 bg-blue-50 p-1.5 rounded"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Рекомендации виджет</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Глобальный поиск</li>
                </ul>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
                  <ArrowRightLeft size={14} className="text-orange-400 shrink-0 mt-0.5" />
                  <p>Агрегирует интересы из <span className="font-semibold text-slate-700">Научного профиля</span> и дедлайны из <span className="font-semibold text-slate-700">Моих книг</span>.</p>
                </div>
              </div>

              {/* Box 3: Мои книги */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group hover:shadow-md transition-all flex flex-col">
                <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Раздел 3</div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100"><Library size={18} className="text-blue-600"/> Мои книги (Коллекции)</h3>
                <ul className="space-y-3 mb-6 text-sm text-slate-700">
                  <li className="flex items-center gap-2 font-semibold text-slate-800"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Тематические коллекции (Папки)</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Дедлайны по печатным изданиям</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Генерация списков (ГОСТ/BibTeX)</li>
                </ul>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
                  <ArrowRightLeft size={14} className="text-orange-400 shrink-0 mt-0.5" />
                  <p>Центральное хранилище. Поставляет информацию для дэшборд-<span className="font-semibold text-slate-700">Сводки</span>.</p>
                </div>
              </div>

              {/* Box 4: ЭЛ ресурсы */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group hover:shadow-md transition-all flex flex-col lg:col-span-2">
                <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Раздел 4</div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100"><Database size={18} className="text-blue-600"/> Электронные ресурсы</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Кросс-поиск (Scopus, eLibrary)</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Внутренний онлайн-каталог</li>
                  </ul>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Заказ оцифровки ЭДД</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Доступ (Proxy) к внешним ресурсам</li>
                  </ul>
                </div>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
                  <ArrowRightLeft size={14} className="text-orange-400 shrink-0 mt-0.5" />
                  <p>Напрямую интегрировано с разделом <span className="font-semibold text-slate-700">Мои книги</span>: статьи добавляются в папки в 1 клик.</p>
                </div>
              </div>

              {/* Box 5: Настройки */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group hover:shadow-md transition-all flex flex-col">
                <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Раздел 5</div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100"><Settings size={18} className="text-blue-600"/> Настройки</h3>
                <ul className="space-y-3 mb-6 text-sm text-slate-700">
                  <li className="flex items-center gap-2 font-semibold text-blue-700 bg-blue-50 p-1.5 rounded"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Управление уведомлениями (Алерты)</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Интерфейс и язык</li>
                </ul>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
                  <ArrowRightLeft size={14} className="text-orange-400 shrink-0 mt-0.5" />
                  <p>Получает триггеры от <span className="font-semibold text-slate-700">Электронных ресурсов</span> по параметрам из <span className="font-semibold text-slate-700">Научного профиля</span>.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="mt-auto border-t border-slate-200 bg-white py-6 flex items-center justify-center">
           <div className="text-sm font-medium text-slate-500">
             Выполнил студент <span className="text-slate-800">Адамчевская Анна Викторовна</span>
           </div>
        </footer>
      </div>
    </div>
  );
}
