export const BRAND_NAME = "БезОсколков";
export const BRAND_TAGLINE = "Защитные плёнки для окон";

export const PHONE = "+79114199100";
export const EMAIL = "belieokna2009@gmail.com";
/** Ящики, куда уходят заявки с сайта */
export const LEAD_INBOXES = [
  EMAIL,
  "sir.kalinin@gmail.com",
] as const;
/** Ссылка MAX: полный URL (`https://max.ru/u/...` или `https://max.ru/@bot`) либо `@botname` */
export const MAX = "placeholder";

export const PHONE_DISPLAY = "+7 911 419-91-00";

export const CITY = "Москва";
export const REGION = "Московская область";
export const CITY_SHORT = "Москва и МО";

export const FILM_THICKNESS = "200 мкм";
export const FILM_CLASS = "SB2D / К4*";
export const UV_PROTECTION = "98%";
export const FILM_TRANSPARENCY = "100%";
export const FILM_WARRANTY = "10 лет*";
export const INSTALLATION_WARRANTY = "1 год*";
export const FREE_VISIT_FROM_WINDOWS = 3;

export const RESPONSE_MINUTES = 5;
export const CALCULATION_MINUTES = 5;

export const LEGAL_NAME = "ИП Шукюров Ильяс Ниязи оглы";
export const INN = "100129422996";
export const OGRN = "318100100020399";

export const SITE_URL = "https://bezoskolkov.ru";

export const SEO = {
  title: "БезОсколков — защита окон от осколков при взрывах и атаках БПЛА",
  description:
    "Защитная противоосколочная плёнка для окон в Москве и Московской области. Удержание осколков стекла при разрушении окна, в том числе при воздействии взрывной волны. Расчёт стоимости по фото.",
  h1: "Защита окон от осколков при взрывах и атаках БПЛА",
  keywords: [
    "защита окон от осколков",
    "защита окон от взрывной волны",
    "защита окон при взрыве",
    "плёнка на окна от осколков",
    "противоосколочная плёнка",
    "защитная плёнка на окна",
    "бронирование окон плёнкой",
    "защита стекла от осколков",
    "защита окон при атаке БПЛА",
    "защита стекол при атаке БПЛА",
    "защитная плёнка Москва",
    "защитная плёнка Московская область",
    "бронирование окон Москва",
    "бронирование окон Московская область",
  ],
};

export const BRAND_PHRASE = {
  line1: "Стекло может разбиться.",
  line2: "Осколки не должны разлетаться.",
};

export const BRAND_ACCENT = {
  line1: "Не против дрона.",
  line2: "Против осколков.",
};

export const CTA = {
  primary: "Рассчитать стоимость по фото",
  primaryArrow: "Рассчитать стоимость по фото →",
  calculate: "Рассчитать стоимость",
  howItWorks: "Посмотреть, как это работает",
  howFilmWorks: "Посмотреть, как работает плёнка",
  crashTest: "Посмотреть краш-тест",
  getEstimate: "Получить расчёт",
  getEstimateArrow: "Получить расчёт →",
  sendPhoto: "Отправить фото окна",
  sendPhotoArrow: "Отправить фото →",
  business: "Рассчитать коммерческий объект",
  businessArrow: "Рассчитать коммерческий объект →",
  ask: "Задать вопрос",
  startWithPhoto: "Начать с фотографии →",
  watchTest: "Смотреть испытание",
  showDocuments: "Показать документы →",
  mobile: "Рассчитать стоимость",
};

export const MICROCOPY = {
  response: `Ответим в течение ${RESPONSE_MINUTES} минут`,
  noPaidMeasure: "Без платного предварительного замера",
  priceBeforeInstall: "Цена согласовывается до монтажа",
  city: CITY_SHORT,
  photoUploaded: "Фото загружено ✓",
  leadSent: "Расчёт отправлен в работу ✓",
  photoReceived: "Фото получили ✓",
  afterLead: "Мы подготовим предварительный расчёт и свяжемся с вами.",
  calcByPhoto: `Расчёт по фото за ${CALCULATION_MINUTES} минут`,
  fixedPrice: "Фиксируем стоимость до монтажа",
  preliminary:
    "Предварительный расчёт. Окончательная стоимость согласовывается до начала работ.",
  disclaimerUav:
    "Не защищает от прямого попадания БПЛА. Предназначена для снижения риска от осколков при разрушении стекла.",
  disclaimerShort: "Не защищает от прямого попадания БПЛА.",
  specsNote:
    "* Конкретные характеристики и условия гарантии подтверждаются документацией на используемый материал.",
  docsPending: "Документы будут добавлены после загрузки оригиналов.",
  docPending: "Документ будет добавлен после загрузки оригинала.",
  crashPlaceholder: "Здесь будет размещено реальное видео испытания.",
  portfolioPlaceholder: "Фотография объекта появится после загрузки оригинала.",
};

export const NAV = [
  { href: "#how-it-works", label: "Как работает" },
  { href: "#characteristics", label: "Характеристики" },
  { href: "#mounting", label: "Монтаж" },
  { href: "#business", label: "Для бизнеса" },
  { href: "#faq", label: "FAQ" },
] as const;

export const OBJECT_TYPES = [
  { id: "apartment", label: "Квартира" },
  { id: "house", label: "Дом" },
  { id: "cottage", label: "Коттедж" },
  { id: "balcony", label: "Балкон" },
  { id: "panorama", label: "Панорамное остекление" },
  { id: "showcase", label: "Витрина" },
  { id: "office", label: "Офис" },
  { id: "cafe", label: "Кафе / ресторан" },
  { id: "other", label: "Другое" },
] as const;

export type ObjectTypeId = (typeof OBJECT_TYPES)[number]["id"];

export const CONTACT_CHANNELS = [
  { id: "phone", label: "Телефон" },
  { id: "max", label: "MAX" },
] as const;

export type ContactChannelId = (typeof CONTACT_CHANNELS)[number]["id"];

export type DocumentKind =
  | "certificate"
  | "test-protocol"
  | "specs"
  | "warranty";

export type DocumentRecord = {
  id: string;
  kind: DocumentKind;
  title: string;
  description: string;
  file?: string;
};

export const DOCUMENTS: DocumentRecord[] = [
  {
    id: "certificate",
    kind: "certificate",
    title: "Сертификат на материал",
    description: "Подтверждение характеристик используемой плёнки.",
  },
  {
    id: "test-protocol",
    kind: "test-protocol",
    title: "Протокол испытаний",
    description: "Документ с результатами испытаний материала.",
  },
  {
    id: "specs",
    kind: "specs",
    title: "Технические характеристики",
    description: "Официальное описание параметров плёнки.",
  },
  {
    id: "warranty",
    kind: "warranty",
    title: "Гарантийные условия",
    description: "Условия гарантии на материал и монтаж.",
  },
];

export const PORTFOLIO_FILTERS = [
  { id: "all", label: "Все" },
  { id: "apartment", label: "Квартиры" },
  { id: "house", label: "Дома" },
  { id: "cottage", label: "Коттеджи" },
  { id: "panorama", label: "Панорамные окна" },
  { id: "business", label: "Бизнес" },
] as const;

export type PortfolioCategory = Exclude<(typeof PORTFOLIO_FILTERS)[number]["id"], "all">;

export type PortfolioItem = {
  id: string;
  category: PortfolioCategory;
  objectType: string;
  location: typeof CITY | "МО";
  image?: string;
};

export const PORTFOLIO: PortfolioItem[] = [
  { id: "1", category: "apartment", objectType: "Квартира", location: CITY },
  { id: "2", category: "house", objectType: "Дом", location: "МО" },
  { id: "3", category: "cottage", objectType: "Коттедж", location: "МО" },
  { id: "4", category: "panorama", objectType: "Панорамные окна", location: CITY },
  { id: "5", category: "business", objectType: "Офис", location: CITY },
  { id: "6", category: "apartment", objectType: "Квартира", location: CITY },
];

export const FAQ_ITEMS = [
  {
    question: "Что такое противоосколочная плёнка?",
    answer:
      "Это прозрачная защитная плёнка, которая наклеивается на стекло. Её задача — связывать фрагменты стекла при разрушении и снижать их разлёт внутрь помещения.",
  },
  {
    question: "Как плёнка защищает от осколков?",
    answer:
      "Плёнка удерживает фрагменты повреждённого стекла. При правильно выполненном монтаже они остаются связанными и с большей вероятностью остаются в раме, а не разлетаются по комнате.",
  },
  {
    question: "Помогает ли плёнка при взрывной волне?",
    answer:
      "Плёнка предназначена для удержания фрагментов повреждённого стекла и снижения их разлёта. Она не делает стекло неразбиваемым и не является защитой от прямого попадания БПЛА.",
  },
  {
    question: "Защищает ли плёнка от БПЛА?",
    answer:
      "Нет. Плёнка не предназначена для защиты от прямого попадания БПЛА. Она защищает от последствий разрушения стекла — от разлёта осколков.",
  },
  {
    question: "Что произойдёт со стеклом при повреждении?",
    answer:
      "Стекло может треснуть или разрушиться. Задача плёнки — удерживать фрагменты после разрушения, а не сохранить окно целым при любом воздействии.",
  },
  {
    question: "Можно ли установить плёнку на существующие окна?",
    answer:
      "Да. В большинстве случаев плёнка устанавливается на существующее стекло без замены стеклопакета.",
  },
  {
    question: "Можно ли установить под штапик?",
    answer:
      "Если конструкция окна позволяет, край плёнки можно завести под штапик. Возможность такого монтажа определяется конструкцией конкретного окна.",
  },
  {
    question: "Сколько служит плёнка?",
    answer:
      `Заявленный срок службы материала указан в документации. Гарантия на материал — ${FILM_WARRANTY.replace("*", "")}, конкретные условия подтверждаются документами на используемый материал.`,
  },
  {
    question: "Какая гарантия?",
    answer: `Гарантия на материал — ${FILM_WARRANTY.replace("*", "")}. Гарантия на монтаж — ${INSTALLATION_WARRANTY.replace("*", "")}. Условия подтверждаются документацией.`,
  },
  {
    question: "Сколько стоит монтаж?",
    answer:
      "Стоимость зависит от количества окон, площади остекления и конструкции. Предварительный расчёт можно получить по фотографии окна. Окончательная стоимость согласовывается до начала работ.",
  },
  {
    question: "Нужно ли делать замер?",
    answer:
      "Предварительный расчёт можно сделать по фото. Без платного предварительного замера. При необходимости параметры уточняются до монтажа.",
  },
  {
    question: "Можно ли рассчитать стоимость по фотографии?",
    answer:
      "Да. Отправьте фотографии окон — мы оценим объект и подготовим предварительный расчёт.",
  },
  {
    question: "Работаете ли вы с юридическими лицами?",
    answer:
      "Да. Работаем с коммерческими объектами и юридическими лицами, предоставляем документы согласно условиям договора.",
  },
];

export const OBJECTIONS = [
  {
    question: "Плёнку будет видно?",
    answer: "При качественном монтаже прозрачная плёнка практически незаметна.",
  },
  {
    question: "Нужно менять стеклопакет?",
    answer: "В большинстве случаев плёнка устанавливается на существующее стекло.",
  },
  {
    question: "Она действительно защищает от взрывной волны?",
    answer:
      "Плёнка предназначена для удержания фрагментов повреждённого стекла и снижения их разлёта. Она не является защитой от прямого попадания БПЛА.",
  },
  {
    question: "Что если стекло всё-таки разобьётся?",
    answer:
      "Плёнка должна удерживать фрагменты стекла и снижать их разлёт внутрь помещения в рамках характеристик конкретной системы.",
  },
  {
    question: "Можно ли установить в квартире?",
    answer: "Да.",
  },
  {
    question: "Можно ли установить на панорамные окна?",
    answer: "Возможность монтажа определяется конструкцией стеклянной системы.",
  },
  {
    question: "Будет грязно?",
    answer: "Стекло подготавливается перед монтажом, после работ рабочее место убирается.",
  },
  {
    question: "Цена изменится после приезда мастера?",
    answer:
      "Согласованная стоимость не должна изменяться без согласования дополнительных работ с клиентом.",
  },
];

export const PROCESS_STEPS = [
  { title: "Вы отправляете фото" },
  { title: "Мы оцениваем объект" },
  { title: "Сообщаем предварительную стоимость" },
  { title: "Согласовываем дату" },
  { title: "Приезжает мастер" },
  { title: "Подготавливаем стекло" },
  { title: "Устанавливаем плёнку" },
  { title: "Убираем после работы" },
];

export const HOW_IT_WORKS = [
  {
    title: "Удар",
    text: "Стекло получает сильное воздействие.",
  },
  {
    title: "Разрушение",
    text: "На стекле появляются трещины или происходит разрушение.",
  },
  {
    title: "Удержание",
    text: "Плёнка связывает фрагменты стекла.",
  },
  {
    title: "Фиксация",
    text: "При правильно выполненном монтаже фрагменты удерживаются в раме.",
  },
];

export const DRONE_CARDS = [
  {
    title: "Взрывная волна",
    text: "При сильном воздействии стекло может треснуть или разрушиться.",
  },
  {
    title: "Разрушение стекла",
    text: "Обычное стекло может потерять целостность.",
  },
  {
    title: "Удержание осколков",
    text: "Плёнка связывает фрагменты и помогает удерживать их в раме.",
  },
];

export const PROBLEM_ZONES = [
  { id: "bed", label: "Кровать" },
  { id: "sofa", label: "Диван" },
  { id: "desk", label: "Рабочее место" },
  { id: "kids", label: "Детская зона" },
] as const;

export const TRUST_HELPS = [
  "удерживать фрагменты стекла",
  "снижать разлёт осколков",
  "снижать риск травм от осколков",
  "защищать помещение от разлетающихся фрагментов",
  "сохранять фрагменты в раме",
];

export const TRUST_NOT = [
  "защитой от прямого попадания БПЛА",
  "пуленепробиваемым стеклом",
  "гарантией целостности окна",
  "заменой специальных защитных конструкций",
];

export const GUARANTEE_CARDS = [
  {
    title: "Расчёт по фото",
    text: "Отправьте фотографию окна — предварительно рассчитаем стоимость.",
  },
  {
    title: "Фиксированная цена",
    text: "Согласованная стоимость не должна неожиданно меняться из-за мелких деталей на месте.",
  },
  {
    title: "Аккуратный монтаж",
    text: "Подготовка стекла, монтаж и уборка после работы.",
  },
  {
    title: "Быстрый выезд",
    text: "Возможен монтаж уже на следующий день при наличии свободного времени.",
  },
];

export const BUSINESS_CARDS = [
  { title: "Офисы" },
  { title: "Магазины" },
  { title: "Витрины" },
  { title: "Кафе" },
  { title: "Рестораны" },
  { title: "Коммерческие помещения" },
];

export const BUSINESS_BENEFITS = [
  "работа с большим количеством окон",
  "расчёт объекта",
  "возможность работы с юридическими лицами",
  "предоставление документов согласно условиям договора",
];

export function isPlaceholderContact(value: string) {
  return value.trim().toLowerCase() === "placeholder";
}

export function telHref() {
  if (isPlaceholderContact(PHONE)) return "#lead";
  return `tel:${PHONE.replace(/[^\d+]/g, "")}`;
}

export function maxHref() {
  if (isPlaceholderContact(MAX)) return "#lead";
  const value = MAX.trim();
  if (/^https?:\/\//i.test(value)) return value;
  const handle = value.replace(/^@/, "");
  return `https://max.ru/@${handle}`;
}

export function mailtoHref() {
  if (isPlaceholderContact(EMAIL)) return "#lead";
  return `mailto:${EMAIL}`;
}
