
import { Theme, ThemeId, LanguageCode, DeepPartial, TranslationData } from './types';

// Helper to convert hex to RGB space-separated for Tailwind variable usage
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
    : '0 0 0';
};

const createTheme = (
    id: ThemeId, 
    colors: Record<string, string>, 
    textOverrides: { [key in LanguageCode]?: DeepPartial<TranslationData> }
): Theme => ({
    id,
    colors: {
        primary: hexToRgb(colors.primary),
        secondary: hexToRgb(colors.secondary),
        background: hexToRgb(colors.background),
        surface: hexToRgb(colors.surface),
        surfaceHighlight: hexToRgb(colors.surfaceHighlight),
        textMain: hexToRgb(colors.textMain),
        textMuted: hexToRgb(colors.textMuted),
        textInverted: hexToRgb(colors.textInverted),
        success: hexToRgb(colors.success || '#22c55e'),
        warning: hexToRgb(colors.warning || '#eab308'),
        danger: hexToRgb(colors.danger || '#ef4444'),
    },
    textOverrides
});

export const themes: Record<ThemeId, Theme> = {
    neutral: createTheme(
        'neutral',
        {
            primary: '#334155', // Slate 700 (Professional, grounded)
            secondary: '#475569', // Slate 600
            background: '#f8fafc', // Slate 50
            surface: '#ffffff',
            surfaceHighlight: '#f1f5f9', // Slate 100
            textMain: '#0f172a', // Slate 900
            textMuted: '#64748b', // Slate 500
            textInverted: '#ffffff',
            success: '#059669', // Emerald 600
            warning: '#d97706', // Amber 600
            danger: '#dc2626', // Red 600
        },
        {}
    ),
    socialist: createTheme(
        'socialist',
        {
            primary: '#e11d48', // Rose 600
            secondary: '#881337', // Rose 900
            background: '#fff1f2', // Rose 50
            surface: '#ffffff',
            surfaceHighlight: '#ffe4e6',
            textMain: '#1e293b', // Slate 800
            textMuted: '#64748b', // Slate 500
            textInverted: '#ffffff',
        },
        {
            ru: { appName: "Красный Организатор" },
            en: { appName: "Red Organizer" },
            es: { appName: "Organizador Rojo" },
        }
    ),
    cozy: createTheme(
        'cozy',
        {
            primary: '#809bce',
            secondary: '#95b8d1',
            background: '#fbf6ef',
            surface: '#ffffff',
            surfaceHighlight: '#f3e7d6',
            textMain: '#4a4036',
            textMuted: '#8c8073',
            textInverted: '#ffffff',
            success: '#81b29a',
            warning: '#e2b1b1',
            danger: '#e07a5f'
        },
        {
            en: {
                appName: "Thoughts",
                nav: { current: "Journal", analysis: "New Thought", archive: "Memories" },
                dashboard: { title: "My Space", emptyTitle: "A Quiet Moment", emptyDesc: "Take a sip of tea and reflect on something new.", activeTasks: "Reflections" },
                view: { briefingTitle: "Deep Reflection", objectLabel: "Topic", contradictionLabel: "The Core Feeling", strategyTitle: "Path Forward", risksTitle: "Be Careful" },
                archive: { title: "Memory Box", btnBurn: "Let go", labelArchive: "Stored" },
                wizard: { btnNext: "Continue", btnBack: "Back", btnSave: "Save for later", contextLabel: "My Thoughts" }
            },
            ru: {
                appName: "Мысли",
                nav: { current: "Дневник", analysis: "Новая Мысль", archive: "Воспоминания" },
                dashboard: { title: "Мой Уголок", emptyTitle: "Тихий момент", emptyDesc: "Выпей чаю и подумай о чем-то новом.", activeTasks: "Размышления" },
                view: { briefingTitle: "Глубокое размышление", objectLabel: "Тема", contradictionLabel: "Главное чувство", strategyTitle: "Путь вперед", risksTitle: "Осторожно" },
                archive: { title: "Шкатулка", btnBurn: "Отпустить", labelArchive: "Сохранено" },
                wizard: { btnNext: "Далее", btnBack: "Назад", btnSave: "Отложить", contextLabel: "Мои мысли" }
            },
        }
    ),
    brutal: createTheme(
        'brutal',
        {
            primary: '#000000',
            secondary: '#ff5e00',
            background: '#c0c0c0',
            surface: '#e0e0e0',
            surfaceHighlight: '#ffffff',
            textMain: '#000000',
            textMuted: '#404040',
            textInverted: '#ffffff',
            success: '#00ff00',
            danger: '#ff0000',
        },
        {
            en: {
                appName: "PROTOCOL_V2",
                nav: { current: "TASKS", analysis: "EXECUTE", archive: "DUMP" },
                dashboard: { title: "CONTROL", emptyTitle: "SYSTEM_IDLE", emptyDesc: "INPUT REQUIRED.", activeTasks: "RUNNING" },
                view: { briefingTitle: "OUTPUT_LOG", objectLabel: "TARGET", contradictionLabel: "CONFLICT_CORE", strategyTitle: "EXEC_PLAN" },
                archive: { title: "DATA_DUMP", btnBurn: "PURGE", labelArchive: "TERMINATED" },
                wizard: { btnNext: "NEXT_STEP", btnBack: "ROLLBACK", btnSave: "SUSPEND", contextLabel: "DATA_BUFFER" }
            },
            ru: {
                appName: "ПРОТОКОЛ_V2",
                nav: { current: "ЗАДАЧИ", analysis: "ВЫПОЛНИТЬ", archive: "СВАЛКА" },
                dashboard: { title: "КОНТРОЛЬ", emptyTitle: "ПРОСТОЙ", emptyDesc: "ТРЕБУЕТСЯ ВВОД.", activeTasks: "В ПРОЦЕССЕ" },
                view: { briefingTitle: "ЛОГ_ВЫВОДА", objectLabel: "ЦЕЛЬ", contradictionLabel: "ЯДРО_КОНФЛИКТА", strategyTitle: "ПЛАН_ВЫПОЛНЕНИЯ" },
                archive: { title: "ДАМП_ДАННЫХ", btnBurn: "СТЕРЕТЬ", labelArchive: "ПРЕРВАНО" },
                wizard: { btnNext: "СЛЕД_ШАГ", btnBack: "ОТКАТ", btnSave: "ПРЕРВАТЬ", contextLabel: "БУФЕР" }
            },
        }
    ),
    amoled: createTheme(
        'amoled',
        {
            primary: '#22d3ee',
            secondary: '#0891b2',
            background: '#000000',
            surface: '#0f0f0f',
            surfaceHighlight: '#1a1a1a',
            textMain: '#e5e5e5',
            textMuted: '#a3a3a3',
            textInverted: '#000000',
            success: '#4ade80',
            danger: '#f87171',
        },
        {
            en: {
                appName: "The Void",
                nav: { current: "Signals", analysis: "Probing", archive: "Deep Space" },
                dashboard: { title: "Bridge", emptyTitle: "Silence", emptyDesc: "No signals. Send a probe.", activeTasks: "Transmissions" },
                view: { briefingTitle: "Decoded Signal", contradictionLabel: "Anomaly" }
            },
            ru: {
                appName: "Пустота",
                nav: { current: "Сигналы", analysis: "Зондирование", archive: "Дальний Космос" },
                dashboard: { title: "Мостик", emptyTitle: "Тишина", emptyDesc: "Нет сигналов. Отправить зонд.", activeTasks: "Передачи" },
                view: { briefingTitle: "Расшифровка", contradictionLabel: "Аномалия" }
            },
        }
    ),
    premium: createTheme(
        'premium',
        {
            primary: '#475569',
            secondary: '#1e293b',
            background: '#f8fafc',
            surface: '#ffffff',
            surfaceHighlight: '#f1f5f9',
            textMain: '#0f172a',
            textMuted: '#64748b',
            textInverted: '#ffffff',
            success: '#10b981',
            warning: '#d97706',
            danger: '#ef4444',
        },
        {
            en: {
                appName: "Insight Pro",
                nav: { current: "Portfolio", analysis: "Compose", archive: "Vault" },
                dashboard: { title: "Executive Dashboard", emptyTitle: "Ready", emptyDesc: "Begin a new session.", activeTasks: "Active Projects" },
                view: { briefingTitle: "Executive Summary", contradictionLabel: "Key Insight", strategyTitle: "Roadmap" },
                archive: { title: "Vault", btnBurn: "Shred" }
            },
            ru: {
                appName: "Инсайт PRO",
                nav: { current: "Портфель", analysis: "Создать", archive: "Сейф" },
                dashboard: { title: "Кабинет", emptyTitle: "Готов к работе", emptyDesc: "Начать новую сессию.", activeTasks: "Проекты" },
                view: { briefingTitle: "Сводка", contradictionLabel: "Ключевой Инсайт", strategyTitle: "Дорожная карта" },
                archive: { title: "Сейф", btnBurn: "Уничтожить" }
            },
        }
    ),
    kitty: createTheme(
        'kitty',
        {
            primary: '#f472b6',
            secondary: '#db2777',
            background: '#fdf2f8',
            surface: '#ffffff',
            surfaceHighlight: '#fce7f3',
            textMain: '#831843',
            textMuted: '#be185d',
            textInverted: '#ffffff',
            success: '#a7f3d0',
            warning: '#fde047',
            danger: '#fda4af',
        },
        {
            en: {
                appName: "Kitty Logic",
                nav: { current: "Home", analysis: "New Meow", archive: "Box" },
                dashboard: { title: "My Basket", emptyTitle: "Nap Time", emptyDesc: "Purr... let's play!", activeTasks: "Yarn Balls" },
                wizard: { titleNew: "New Scratch", btnNext: "Pounce!", btnFinish: "Purrfect!", hintLabel: "Wisdom:", vulnLabel: "Ouchie parts:", oppLabel: "Treats:" },
                view: { briefingTitle: "Super Smart Plan", contradictionLabel: "The Tangle", strategyTitle: "Playtime", risksTitle: "Hiss List" },
                archive: { title: "Cardboard Box", btnBurn: "Hiss" }
            },
            ru: {
                appName: "Кото-Логика",
                nav: { current: "Домик", analysis: "Новый Кусь", archive: "Коробка" },
                dashboard: { title: "Корзинка", emptyTitle: "Время сна", emptyDesc: "Мур... давай поиграем с проблемой!", activeTasks: "Клубочки" },
                wizard: { titleNew: "Новая Царапка", btnNext: "Прыг!", btnFinish: "Идеально!", hintLabel: "Мудрость:", vulnLabel: "Больно:", oppLabel: "Вкусняшки:" },
                view: { briefingTitle: "Умный План", contradictionLabel: "Запутанность", strategyTitle: "Время Игры", risksTitle: "Шипение" },
                archive: { title: "Картонная Коробка", btnBurn: "Зашипеть" }
            },
        }
    ),
    pirate: createTheme(
        'pirate',
        {
            primary: '#ca8a04',
            secondary: '#854d0e',
            background: '#0c4a6e',
            surface: '#164e63',
            surfaceHighlight: '#155e75',
            textMain: '#fef3c7',
            textMuted: '#94a3b8',
            textInverted: '#000000',
            success: '#10b981',
            danger: '#dc2626',
        },
        {
            en: {
                appName: "Captain's Log",
                nav: { current: "Deck", analysis: "New Voyage", archive: "Chest" },
                dashboard: { title: "Captain's Quarters", emptyTitle: "Calm Seas", emptyDesc: "Horizon is clear. Plot a course!", activeTasks: "Quests" },
                wizard: { titleNew: "Plot Course", btnNext: "Aye Aye!", btnFinish: "Mark Map", hintLabel: "Quartermaster:", vulnLabel: "Hull Breaches:", oppLabel: "Plunder:" },
                view: { briefingTitle: "Treasure Map", contradictionLabel: "The Storm", strategyTitle: "Boarding Plan", risksTitle: "Kraken Watch" },
                archive: { title: "Buried Chest", btnBurn: "Walk Plank" }
            },
            ru: {
                appName: "Судовой Журнал",
                nav: { current: "Палуба", analysis: "Новый Рейс", archive: "Сундук" },
                dashboard: { title: "Каюта Капитана", emptyTitle: "Штиль", emptyDesc: "Горизонт чист. Проложи курс!", activeTasks: "Походы" },
                wizard: { titleNew: "Проложить Курс", btnNext: "Так точно!", btnFinish: "Отметить Карту", hintLabel: "Квартирмейстер:", vulnLabel: "Пробоины:", oppLabel: "Добыча:" },
                view: { briefingTitle: "Карта Сокровищ", contradictionLabel: "Шторм", strategyTitle: "План Абордажа", risksTitle: "Кракен" },
                archive: { title: "Зарытый Сундук", btnBurn: "На Рею" }
            },
        }
    )
};