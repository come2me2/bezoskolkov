export type SitePhoto = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export const PHOTOS = {
  hero: {
    id: "hero",
    src: "/images/hero-banner.jpg",
    width: 1920,
    height: 2560,
    alt: "Окно частного дома с защитной плёнкой: прозрачное остекление и вид на участок",
    caption: "После монтажа плёнка остаётся прозрачной",
  },
  interior: {
    id: "interior",
    src: "/images/install/01.jpg",
    width: 1920,
    height: 2560,
    alt: "Интерьер дома после монтажа: большое окно с защитной плёнкой и вид на участок",
    caption: "После монтажа плёнка остаётся прозрачной",
  },
  tools: {
    id: "tools",
    src: "/images/install/02.jpg",
    width: 1920,
    height: 2560,
    alt: "Мастер готовит стекло к монтажу, рядом рулон защитной плёнки и инструмент",
    caption: "Подготовка стекла перед монтажом",
  },
  toolsClose: {
    id: "toolsClose",
    src: "/images/install/03.jpg",
    width: 1920,
    height: 2560,
    alt: "Мастер наносит раствор и готовит нижнюю часть окна к установке плёнки",
    caption: "Аккуратная работа у стекла",
  },
  applyBack: {
    id: "applyBack",
    src: "/images/install/04.jpg",
    width: 1920,
    height: 2560,
    alt: "Мастер разглаживает защитную плёнку на большом окне",
    caption: "Нанесение плёнки на стекло",
  },
  applyCorner: {
    id: "applyCorner",
    src: "/images/install/05.jpg",
    width: 1920,
    height: 2560,
    alt: "Мастер прорабатывает край плёнки в верхней части оконной рамы",
    caption: "Фиксация края плёнки",
  },
  applyWide: {
    id: "applyWide",
    src: "/images/install/06.jpg",
    width: 2560,
    height: 1920,
    alt: "Монтаж защитной плёнки на панорамное окно частного дома",
    caption: "Монтаж на большое остекление",
  },
  applyProfile: {
    id: "applyProfile",
    src: "/images/install/07.jpg",
    width: 2560,
    height: 1920,
    alt: "Профиль мастера во время разглаживания плёнки скребком",
    caption: "Выгонка раствора из-под плёнки",
  },
  portrait: {
    id: "portrait",
    src: "/images/install/08.jpg",
    width: 1920,
    height: 2560,
    alt: "Мастер во время монтажа защитной плёнки на окно",
    caption: "Работаем на объекте, не по шаблону",
  },
  squeegee: {
    id: "squeegee",
    src: "/images/install/09.jpg",
    width: 1920,
    height: 2560,
    alt: "Мастер выгоняет раствор из-под плёнки скребком у нижней части окна",
    caption: "Финальная проработка полотна",
  },
} as const satisfies Record<string, SitePhoto>;

export const INSTALL_GALLERY = [
  PHOTOS.interior,
  PHOTOS.tools,
  PHOTOS.toolsClose,
  PHOTOS.applyBack,
  PHOTOS.applyCorner,
  PHOTOS.applyWide,
  PHOTOS.applyProfile,
  PHOTOS.portrait,
  PHOTOS.squeegee,
] as const;
