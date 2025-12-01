
# Схема Данных

## Основные Типы

### `Analysis` (Основная сущность)
Объект, описывающий одну сессию анализа.

```typescript
interface Analysis {
  id: string;          // UUID v4. Уникальный идентификатор.
  title: string;       // Название объекта анализа.
  thesis: string;      // Первичное описание ситуации (Факт).
  synthesis: string;   // Центральное противоречие (Фаза 2).
  
  // Стратегические поля (Фаза 3)
  vulnerabilities?: string; // Слабости системы.
  opportunities?: string;   // Наши возможности.
  
  // Аудит (Фаза 4)
  risks?: string;       // Риски и "Черные лебеди".
  blindSpots?: string;  // (Deprecated) Объединено с risks.

  createdAt: number;    // Timestamp создания.
  updatedAt: number;    // Timestamp последнего изменения.
  stage: AnalysisStage; // Текущий этап визарда.
  answers: Answer[];    // Массив ответов на вопросы Фазы 1.
  isArchived: boolean;  // Флаг архивации (Soft delete).
}
```

### `Answer` (Ответ на вопрос)
```typescript
interface Answer {
  questionId: string; // ID вопроса (напр. 'q_history')
  text: string;       // Текст ответа пользователя.
  timestamp: number;  // Время ответа.
}
```

### `AnalysisStage` (Enum)
Этапы прохождения протокола.
*   `INIT`: Ввод названия и тезиса.
*   `MODULES`: Ответы на 4 вопроса (Векторы).
*   `SYNTHESIS`: Формулировка противоречия.
*   `STRATEGY`: Поиск уязвимостей и возможностей.
*   `RISKS`: Оценка рисков.
*   `COMPLETED`: Анализ завершен и доступен только для чтения (или редактирования через возврат).

## Хранение
Данные сериализуются в JSON и хранятся в LocalStorage по ключу:
`dialectical_organizer_data_v2`

## Миграция
При изменении структуры данных в будущих версиях, необходимо реализовать функцию миграции в `services/storage.ts`, которая будет проверять версию данных при загрузке и трансформировать их в новый формат.
