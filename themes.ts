
import { Theme, ThemeId, LanguageCode, DeepPartial, TranslationData } from './types';

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
            primary: '#0f172a',
            secondary: '#334155',
            background: '#f8fafc',
            surface: '#ffffff',
            surfaceHighlight: '#f1f5f9',
            textMain: '#0f172a',
            textMuted: '#64748b',
            textInverted: '#ffffff',
        },
        {}
    ),
    corporate: createTheme(
        'corporate',
        {
            primary: '#2563eb',
            secondary: '#1e40af',
            background: '#f1f5f9',
            surface: '#ffffff',
            surfaceHighlight: '#e2e8f0',
            textMain: '#0f172a',
            textMuted: '#475569',
            textInverted: '#ffffff',
        },
        {
            ru: {
                appName: "StrategySync",
                nav: { current: "Активы", analysis: "Новый KPI", archive: "Репозиторий" },
                dashboard: { title: "Executive Dashboard", untitled: "Проект №" },
                view: { briefingTitle: "БРИФИНГ ДЛЯ СОВЕТА" }
            },
            en: {
                appName: "StrategySync",
                nav: { current: "Assets", analysis: "New KPI", archive: "Repository" },
                dashboard: { title: "Executive Dashboard", untitled: "Project #" },
                view: { briefingTitle: "BOARD BRIEFING" }
            }
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
        },
        {
            ru: {
                appName: "Дневник Мыслей",
                nav: { current: "Заметки", analysis: "Размышление", archive: "Сундук" },
                dashboard: { title: "Тихий вечер", untitled: "Запись №" },
                view: { briefingTitle: "МОИ РАЗДУМЬЯ" }
            },
            en: {
                appName: "Thought Journal",
                nav: { current: "Notes", analysis: "Reflection", archive: "Chest" },
                dashboard: { title: "Quiet Evening", untitled: "Entry #" },
                view: { briefingTitle: "MY REFLECTIONS" }
            }
        }
    ),
    cyberpunk: createTheme(
        'cyberpunk',
        {
            primary: '#d946ef',
            secondary: '#701a75',
            background: '#020617',
            surface: '#0f172a',
            surfaceHighlight: '#1e293b',
            textMain: '#f8fafc',
            textMuted: '#94a3b8',
            textInverted: '#000000',
        },
        {
            ru: {
                appName: "NeuralLink",
                nav: { current: "Узлы", analysis: "Взлом системы", archive: "Свалка данных" },
                dashboard: { title: "Mainframe", untitled: "Запись_ID:" },
                view: { briefingTitle: "ДЕШИФРОВКА СИГНАЛА" }
            },
            en: {
                appName: "NeuralLink",
                nav: { current: "Nodes", analysis: "System Breach", archive: "Data Scrap" },
                dashboard: { title: "Mainframe", untitled: "Entry_ID:" },
                view: { briefingTitle: "SIGNAL DECRYPTION" }
            }
        }
    ),
    brutal: createTheme(
        'brutal',
        {
            primary: '#000000',
            secondary: '#ff0000',
            background: '#ffffff',
            surface: '#ffffff',
            surfaceHighlight: '#eeeeee',
            textMain: '#000000',
            textMuted: '#555555',
            textInverted: '#ffffff',
        },
        {
            ru: {
                appName: "ИНСТРУМЕНТ",
                nav: { current: "ФАКТЫ", analysis: "ПРОТОКОЛ", archive: "АРХИВ" },
                dashboard: { title: "ТЕРМИНАЛ", untitled: "ОБЪЕКТ_" },
                view: { briefingTitle: "ОТЧЕТ ИСПОЛНЕНИЯ" }
            },
            en: {
                appName: "TOOL",
                nav: { current: "FACTS", analysis: "PROTOCOL", archive: "ARCHIVE" },
                dashboard: { title: "TERMINAL", untitled: "OBJECT_" },
                view: { briefingTitle: "EXECUTION REPORT" }
            }
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
        },
        {}
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
        },
        {
            ru: {
                appName: "L'Excellence",
                nav: { current: "Портфолио", analysis: "Концепция", archive: "Библиотека" },
                dashboard: { title: "Private Suite", untitled: "Кейс №" },
                view: { briefingTitle: "ЭКСКЛЮЗИВНЫЙ АНАЛИЗ" }
            },
            en: {
                appName: "L'Excellence",
                nav: { current: "Portfolio", analysis: "Concept", archive: "Library" },
                dashboard: { title: "Private Suite", untitled: "Case #" },
                view: { briefingTitle: "EXCLUSIVE ANALYSIS" }
            }
        }
    ),
    minimalist: createTheme(
        'minimalist',
        {
            primary: '#000000',
            secondary: '#404040',
            background: '#fafafa',
            surface: '#ffffff',
            surfaceHighlight: '#f3f3f3',
            textMain: '#171717',
            textMuted: '#737373',
            textInverted: '#ffffff',
        },
        {
            ru: {
                appName: "Точка",
                nav: { current: "Суть", analysis: "Ввод", archive: "Склад" },
                dashboard: { title: "Чистое поле", untitled: "Пункт" },
                view: { briefingTitle: "РЕЗЮМЕ" }
            },
            en: {
                appName: "Dot",
                nav: { current: "Core", analysis: "Input", archive: "Store" },
                dashboard: { title: "Clear Field", untitled: "Point" },
                view: { briefingTitle: "SUMMARY" }
            }
        }
    ),
    kitty: createTheme(
        'kitty',
        {
            primary: '#f472b6',
            secondary: '#d946ef',
            background: '#fdf2f8',
            surface: '#ffffff',
            surfaceHighlight: '#fbcfe8',
            textMain: '#701a75',
            textMuted: '#be185d',
            textInverted: '#ffffff',
        },
        {
            ru: {
                appName: "Мур-Метод",
                nav: { current: "Клубочки", analysis: "Мур-анализ", archive: "Корзинка" },
                dashboard: { title: "Мягкое кресло", untitled: "Котенок №" },
                view: { briefingTitle: "ПУШИСТЫЙ ОТЧЕТ" },
                wizard: { btnNext: "Прыг", btnBack: "Топ-топ", btnSave: "Мур-сохранить" }
            },
            en: {
                appName: "KittyMethod",
                nav: { current: "Paws", analysis: "Purr-ocol", archive: "Basket" },
                dashboard: { title: "Sunny Spot", untitled: "Kitty #" },
                view: { briefingTitle: "FLUFFY REPORT" },
                wizard: { btnNext: "Jump", btnBack: "Step", btnSave: "Purr-save" }
            }
        }
    )
};
