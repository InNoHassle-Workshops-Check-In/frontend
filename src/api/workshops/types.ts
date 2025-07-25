/**
 * Workshop API types
 */
/**
 * ========== КАК ДОБАВИТЬ НОВЫЙ ЭНДПОИНТ ==========
 *
 * 1. Добавьте новый путь в формате "/your/endpoint/path": { ... }
 * 2. Укажите все HTTP методы (get, post, put, delete и т.д.)
 * 3. Для неиспользуемых методов ставьте "never"
 * 4. Для используемых методов ссылайтесь на операцию: operations["operation_name"]
 *
 * Пример добавления GET эндпоинта для получения списка мастер-классов:
 *
 * "/api/workshops/": {
 *   parameters: {
 *     query?: {
 *       page?: number;        // Опциональные query параметры, чекай доки хасана
 *       limit?: number;
 *     };
 *     header?: never;         // Если не используются header параметры
 *     path?: never;           // Если нет path параметров
 *     cookie?: never;         // Если не используются cookies
 *   };
 *   get: operations["get_workshops_list"];  // Ссылка на операцию
 *   put?: never;            // Неиспользуемые методы помечаем как never
 *   post: operations["create_workshop"]; // Ссылка на операцию для создания мастер-класса
 *   delete?: never;
 *   options?: never;
 *   head?: never;
 *   patch?: never;
 *   trace?: never;
 * };
 */
export interface paths {
  "/users/change_role": {
    parameters: {
      query: {
        role: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["users_change_role"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/me": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["users_get_me"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/my_checkins": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["get_my_checkins"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/workshops/{workshop_id}/checkin": {
    parameters: {
      query?: never;
      header?: never;
      path?: { workshop_id: string };
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["check_out"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/workshops/{workshop_id}/checkout": {
    parameters: {
      query?: never;
      header?: never;
      path?: { workshop_id: string };
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["check_out"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };

  "/workshops/": {
    parameters: {
      query?: {
        limit?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["get_all_workshops"];
    put?: never;
    post: operations["create_workshop"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/workshops/{workshop_id}": {
    parameters: {
      query?: never;
      header?: never;
      path: { workshop_id: string };
      cookie?: never;
    };
    get?: never;
    put: operations["update_workshop"];
    post?: never;
    delete: operations["delete_workshop"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/workshops/{workshop_id}/checkins": {
    parameters: {
      query?: never;
      header?: never;
      path: { workshop_id: string };
      cookie?: never;
    };
    get: operations["checkins"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  //Другие эндпоинты здесь, следуя тому же шаблону
}
/**
 * ========== КАК ДОБАВИТЬ НОВЫЕ ТИПЫ ДАННЫХ ==========
 *
 * Здесь определяются все типы данных для запросов и ответов.
 *
 * Для каждого эндпоинта обычно нужно:
 * 1. Request тип - данные, которые отправляет клиент
 * 2. Response тип - данные, которые возвращает сервер
 *
 * Примеры:
 *
 * // Запрос для получения списка мастер-классов
 * GetWorkshopsListRequest: {
 *   page?: number;           // Опциональные поля помечаем знаком ?
 *   limit?: number;
 *   category?: string;
 * };
 */
export interface components {
  schemas: {
    ChangeRoleResponse: {
      message: string;
    };
    CurrentUser: {
      id: string;
      innohassle_id: string;
      email: string;
      name: string;
      role: "user" | "admin";
      t_alias?: string;
    };
    ValidationError: {
      detail: Array<{
        loc: (string | number)[];
        msg: string;
        type: string;
      }>;
    };
    Workshop: {
      id: string;
      name: string;
      description: string;
      dtstart: string;
      dtend: string;
      place: string;
      capacity: number;
      remain_places: number;
      is_active: boolean;
      is_registrable: boolean;
    };
    GetAllWorkshopsResponse: Array<{
      id: string;
      name: string;
      description: string;
      dtstart: string;
      dtend: string;
      place: string;
      capacity: number;
      remain_places: number;
      is_active: boolean;
      is_registrable: boolean;
    }>;
    GetMyWorkshopsResponse: {
      myWorkshops: Array<{
        id: string;
        name: string;
        alias: string;
        dtstart: string;
        dtend: string;
        place: string;
        is_active: boolean;
        is_registrable: boolean;
      }>;
    };
    CheckInOutResponse: {
      message: string;
    };
    GetCheckInsResponse: {
      id: string;
      innohassle_id: string;
      role: "admin" | "user";
      email: string;
      t_alias?: string;
    }[];
    CreateWorkshopRequest: {
      name: string;
      description: string;
      capacity: number;
      remain_places: number;
      place: string;
      dtstart: string;
      dtend: string;
      is_active: boolean;
    };
    CreateWorkshopResponse: {
      id: string;
      name: string;
      description: string;
      dtstart: string;
      dtend: string;
      place: string;
      capacity: number;
      remain_places: number;
      is_active: boolean;
    };
    UpdateWorkshopRequest: {
      name: string;
      alias?: string;
      description: string;
      dtstart: string;
      dtend: string;
      place: string;
      capacity: number;
      is_active: boolean;
    };
    // Другие схемы здесь
  };
}

/**
 * ========== КАК ДОБАВИТЬ НОВЫЕ ОПЕРАЦИИ ==========
 *
 * Операции описывают полную спецификацию HTTP запроса для каждого эндпоинта.
 * Каждая операция должна включать:
 * 1. parameters - параметры запроса
 * 2. requestBody - тело запроса (для POST, PUT, PATCH)
 * 3. responses - возможные ответы с кодами состояния
 *
 * Пример GET операции (без тела запроса):
 *
 * get_workshops_list: {
 *   parameters: {
 *     query?: {
 *       page?: number;
 *       limit?: number;
 *       category?: string;
 *     };
 *     header?: never;
 *     path?: never;
 *     cookie?: never;
 *   };
 *   requestBody?: never;     // GET запросы не имеют тела
 *   responses: {
 *     200: {                 // Успешный ответ
 *       headers: {
 *         [name: string]: unknown;
 *       };
 *       content: {
 *         "application/json": components["schemas"]["GetWorkshopsListResponse"];
 *       };
 *     };
 *     400: {                 // Ошибка валидации
 *       headers: {
 *         [name: string]: unknown;
 *       };
 *       content?: never;     // Если нет тела ответа
 *     };
 *     401: {                 // Не авторизован
 *       headers: {
 *         [name: string]: unknown;
 *       };
 *       content?: never;
 *     };
 *     422: {                 // Ошибка валидации с деталями
 *       headers: {
 *         [name: string]: unknown;
 *       };
 *       content: {
 *         "application/json": components["schemas"]["ValidationError"];
 *       };
 *     };
 *   };
 * };
 *
 * Пример POST операции (с телом запроса):
 *
 * update_workshop: {
 *   parameters: {
 *     query?: never;
 *     header?: never;
 *     path: {
 *       workshop_id: string; // Обязательный path параметр
 *     };
 *     cookie?: never;
 *   };
 *   requestBody: {
 *     content: {
 *       "application/json": components["schemas"]["UpdateWorkshopRequest"];
 *     };
 *   };
 *   responses: {
 *     200: {
 *       headers: {
 *         [name: string]: unknown;
 *       };
 *       content: {
 *         "application/json": components["schemas"]["CreateWorkshopResponse"];
 *       };
 *     };
 *     404: {
 *       headers: {
 *         [name: string]: unknown;
 *       };
 *       content?: never;
 *     };
 *     422: {
 *       headers: {
 *         [name: string]: unknown;
 *       };
 *       content: {
 *         "application/json": components["schemas"]["ValidationError"];
 *       };
 *     };
 *   };
 * };
 *
 * ВАЖНО: Имя операции должно совпадать с тем, что указано в paths!
 */
export interface operations {
  users_change_role: {
    parameters: {
      query: {
        role: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": string;
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            detail: Array<{
              loc: (string | number)[];
              msg: string;
              type: string;
            }>;
          };
        };
      };
    };
  };
  users_get_me: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["CurrentUser"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  get_my_checkins: {
    parameters: {
      query?: {
        page?: number;
        limit?: number;
        category?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["GetMyWorkshopsResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  check_in: {
    parameters: {
      query?: never;
      header?: never;
      path: { workshop_id: string };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["CheckInOutResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ValidationError"];
        };
      };
    };
  };
  check_out: {
    parameters: {
      query?: never;
      header?: never;
      path: { workshop_id: string };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["CheckInOutResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ValidationError"];
        };
      };
    };
  };
  checkins: {
    parameters: {
      query?: never;
      header?: never;
      path: { workshop_id: string };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["GetCheckInsResponse"];
        };
      };
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ValidationError"];
        };
      };
    };
  };
  get_all_workshops: {
    parameters: {
      query?: {
        limit?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["GetAllWorkshopsResponse"];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ValidationError"];
        };
      };
    };
  };
  create_workshop: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateWorkshopRequest"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["CreateWorkshopResponse"];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ValidationError"];
        };
      };
    };
  };
  update_workshop: {
    parameters: {
      query?: never;
      header?: never;
      path: { workshop_id: string };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateWorkshopRequest"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": string;
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ValidationError"];
        };
      };
    };
  };
  delete_workshop: {
    parameters: {
      query?: never;
      header?: never;
      path: { workshop_id: string };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": string;
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ValidationError"];
        };
      };
    };
  };
  // Другие операции здесь
}
