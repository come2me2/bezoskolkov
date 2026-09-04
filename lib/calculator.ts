import type { ObjectTypeId } from "@/lib/constants";

export type CalculatorInput = {
  windows: number;
  widthCm: number;
  heightCm: number;
  objectType: ObjectTypeId;
};

export type RateTable = {
  pricePerSqm: number;
};

export type CalculatorResult =
  | {
      status: "needs_photo";
      areaSqm: number;
      message: string;
    }
  | {
      status: "estimated";
      areaSqm: number;
      amount: number;
      currency: "RUB";
    };

const RATES: RateTable | null = null;

export function calcAreaSqm(input: Pick<CalculatorInput, "windows" | "widthCm" | "heightCm">) {
  const area = (input.widthCm / 100) * (input.heightCm / 100) * input.windows;
  return Math.round(area * 100) / 100;
}

export function estimate(input: CalculatorInput): CalculatorResult {
  const areaSqm = calcAreaSqm(input);

  if (!RATES) {
    return {
      status: "needs_photo",
      areaSqm,
      message: "Для точного расчёта отправьте фотографию окна.",
    };
  }

  return {
    status: "estimated",
    areaSqm,
    amount: Math.round(areaSqm * RATES.pricePerSqm),
    currency: "RUB",
  };
}
