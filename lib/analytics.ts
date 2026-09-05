export type AnalyticsEvent =
  | "hero_cta_click"
  | "photo_upload_start"
  | "photo_upload_complete"
  | "calculator_start"
  | "calculator_complete"
  | "lead_form_start"
  | "lead_submit"
  | "phone_click"
  | "max_click"
  | "crash_test_play"
  | "faq_open"
  | "portfolio_open"
  | "business_cta_click";

export type AnalyticsPayload = Record<string, unknown>;

export type AnalyticsProvider = {
  track: (event: AnalyticsEvent, payload?: AnalyticsPayload) => void;
};

const providers: AnalyticsProvider[] = [];

export function registerAnalyticsProvider(provider: AnalyticsProvider) {
  providers.push(provider);
}

export function track(event: AnalyticsEvent, payload?: AnalyticsPayload) {
  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", event, payload ?? {});
  }

  for (const provider of providers) {
    try {
      provider.track(event, payload);
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[analytics] provider failed", error);
      }
    }
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("bezoskolkov:analytics", { detail: { event, payload } }),
    );
  }
}

export const analytics = { track, registerAnalyticsProvider };
