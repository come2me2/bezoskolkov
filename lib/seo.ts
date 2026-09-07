import {
  BRAND_NAME,
  BRAND_PHRASE,
  CITY,
  CITY_SHORT,
  EMAIL,
  FAQ_ITEMS,
  FILM_CLASS,
  FILM_THICKNESS,
  FILM_TRANSPARENCY,
  FILM_WARRANTY,
  INSTALLATION_WARRANTY,
  LEGAL_NAME,
  PHONE,
  PHONE_DISPLAY,
  REGION,
  SEO,
  SITE_URL,
  UV_PROTECTION,
} from "@/lib/constants";

export function buildOrganizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    email: EMAIL,
    telephone: PHONE,
    description: SEO.description,
    areaServed: [
      { "@type": "City", name: CITY },
      { "@type": "AdministrativeArea", name: REGION },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE,
        contactType: "sales",
        areaServed: "RU",
        availableLanguage: ["ru"],
      },
    ],
  };
}

export function buildLocalBusinessJsonLd() {
  return {
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: BRAND_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/images/hero-banner.jpg`,
    description: SEO.description,
    telephone: PHONE,
    email: EMAIL,
    priceRange: "₽₽",
    currenciesAccepted: "RUB",
    paymentAccepted: "Cash, Bank Transfer",
    areaServed: [
      { "@type": "City", name: CITY },
      { "@type": "AdministrativeArea", name: REGION },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: CITY,
      addressRegion: REGION,
      addressCountry: "RU",
    },
    knowsAbout: [
      "противоосколочная плёнка",
      "защита окон от осколков",
      "защита стекла при взрывной волне",
      "удержание осколков стекла",
      "монтаж защитной плёнки на окна",
    ],
    slogan: `${BRAND_PHRASE.line1} ${BRAND_PHRASE.line2}`,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  };
}

export function buildServiceJsonLd() {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}/#service`,
    name: "Монтаж противоосколочной защитной плёнки на окна",
    serviceType: "Установка защитной противоосколочной плёнки",
    provider: { "@id": `${SITE_URL}/#localbusiness` },
    areaServed: [CITY, REGION],
    description:
      "Установка прозрачной защитной плёнки на существующие окна для удержания фрагментов стекла при разрушении, в том числе при воздействии взрывной волны. Не является защитой от прямого попадания БПЛА и не делает стекло неразбиваемым.",
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/#lead`,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      description: "Предварительный расчёт стоимости по фотографии окна",
    },
    termsOfService: `${SITE_URL}/consent`,
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND_NAME,
    description: SEO.description,
    inLanguage: "ru-RU",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function buildWebPageJsonLd() {
  return {
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: SEO.title,
    description: SEO.description,
    inLanguage: "ru-RU",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#service` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/hero-banner.jpg`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "#faq"],
    },
  };
}

export function buildFaqJsonLd() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildProductFactsJsonLd() {
  return {
    "@type": "Product",
    "@id": `${SITE_URL}/#film`,
    name: "Защитная противоосколочная плёнка для окон",
    description:
      "Прозрачная защитная плёнка для удержания осколков стекла при разрушении окна. Толщина материала 200–300 мкм. Не защищает от прямого попадания БПЛА.",
    brand: { "@type": "Brand", name: BRAND_NAME },
    category: "Защитная плёнка для стекла",
    material: "Защитная полимерная плёнка",
    additionalProperty: [
      { "@type": "PropertyValue", name: "Толщина", value: FILM_THICKNESS },
      { "@type": "PropertyValue", name: "Класс защиты", value: FILM_CLASS },
      { "@type": "PropertyValue", name: "Защита от УФ", value: UV_PROTECTION },
      { "@type": "PropertyValue", name: "Прозрачность", value: FILM_TRANSPARENCY },
      { "@type": "PropertyValue", name: "Гарантия на материал", value: FILM_WARRANTY },
      { "@type": "PropertyValue", name: "Гарантия на монтаж", value: INSTALLATION_WARRANTY },
    ],
  };
}

/** Single @graph for SEO + GEO (AI citation-friendly entities). */
export function buildSiteJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationJsonLd(),
      buildLocalBusinessJsonLd(),
      buildWebSiteJsonLd(),
      buildWebPageJsonLd(),
      buildServiceJsonLd(),
      buildProductFactsJsonLd(),
      buildFaqJsonLd(),
    ],
  };
}

export const GEO_SUMMARY = {
  brand: BRAND_NAME,
  phoneDisplay: PHONE_DISPLAY,
  cityShort: CITY_SHORT,
  what: "Защитная противоосколочная плёнка на окна и стеклянные конструкции",
  does: "Удерживает фрагменты повреждённого стекла и снижает риск их разлёта внутрь помещения",
  doesNot: [
    "Не защищает от прямого попадания БПЛА",
    "Не делает стекло неразбиваемым",
    "Не является пуленепробиваемым стеклом",
    "Не гарантирует целостность окна при любом воздействии",
  ],
  where: CITY_SHORT,
  howToOrder: "Отправьте фото окон на сайте — предварительный расчёт без платного замера",
};
