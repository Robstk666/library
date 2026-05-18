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
  UserPlus
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
    }
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
    }
  }
};

export default function App() {
  const [activePersona, setActivePersona] = useState<keyof typeof PERSONAS>('mikhail');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = PERSONAS[activePersona];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed inset-y-0 left-0 z-20">
        {/* Account Dropdown */}
        <div className="relative border-b border-slate-800">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-800 transition-colors focus:outline-none"
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
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full bg-slate-800 shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200 border-b border-slate-700">
              <div className="px-4 pb-2 mb-2 border-b border-slate-700/50 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Ваши аккаунты
              </div>
              {Object.values(PERSONAS).map(p => (
                <button
                  key={p.id}
                  onClick={() => { setActivePersona(p.id as keyof typeof PERSONAS); setIsDropdownOpen(false); }}
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
              <div className="mt-2 pt-2 border-t border-slate-700/50">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
                  <UserPlus size={16} /> Добавить аккаунт
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-slate-700 transition-colors">
                  <LogOut size={16} /> Выйти
                </button>
              </div>
            </div>
          )}
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-blue-600/10 text-blue-400 rounded-lg font-medium transition-colors">
            <Home size={18} />
            Главная
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors">
            <Library size={18} />
            Мои коллекции
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors">
            <Database size={18} />
            Электронные ресурсы
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors">
            <BookOpen size={18} />
            Заказы и оцифровка
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors">
            <BellRing size={18} />
            Настройки алертов
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen relative">
        {/* Header / Global Search */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-5 flex justify-between items-center">
          <div className="relative w-full max-w-2xl flex items-center shadow-sm rounded-lg border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            <div className="pl-4 pr-2 text-slate-400">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Поиск по локальному каталогу, Scopus, eLibrary..." 
              className="w-full bg-transparent border-none py-2.5 text-sm focus:outline-none text-slate-700 placeholder-slate-400"
            />
            <button className="px-4 py-2 text-slate-500 hover:text-slate-700 border-l border-slate-200 flex items-center gap-2 text-sm font-medium transition-colors">
              <Filter size={16} />
              Фильтры
            </button>
          </div>
        </header>

        <main className="p-8 pb-12 overflow-x-hidden flex-1 animate-in fade-in duration-500">
          {/* VIEW 1: DASHBOARD */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Сводка</h1>
            
            {/* Metric Summary Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                <div className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">{user.trend}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personalized Recommendations */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-800">
                    Новые поступления по вашей теме 
                    <span className="inline-block text-blue-700 font-medium ml-3 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md text-sm">
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
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-800">Займы и дедлайны</h2>
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2.5 bg-orange-50 rounded-lg border border-orange-100 text-orange-600 shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-slate-900">Возврат через {user.deadline.days} {user.deadline.days === 1 ? 'день' : 'дня/дней'}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{user.deadline.title}</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4 overflow-hidden">
                    <div className={`${user.deadline.color} h-1.5 rounded-full transition-all duration-1000`} style={{ width: user.deadline.progress }}></div>
                  </div>
                  <button className="w-full py-2 text-sm border border-slate-200 text-slate-700 bg-slate-50 rounded-lg font-medium hover:bg-slate-100 hover:border-slate-300 transition-colors">
                    Продлить срок
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Divider indicating separate view */}
          <div className="w-full h-px bg-slate-200 my-12 relative flex items-center justify-center">
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
                  <Download size={16} /> Экспорт по ГОСТ Р 7.0.100-2018
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                  <Download size={16} /> Экспорт в BibTeX
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
                    <th className="px-6 py-4">Авторы</th>
                    <th className="px-6 py-4">Название</th>
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

