import { NextResponse } from "next/server";

interface DiscountOption {
  id: number;
  option: string;
  value: number;
  chance: number;
  type: "haircut" | "percentage" | "cosmetics";
}

const discountOptions: DiscountOption[] = [
  {
    id: 0,
    option: "Бесплатная стрижка",
    value: 100,
    chance: 5,
    type: "haircut",
  },
  {
    id: 1,
    option: "50%",
    value: 50,
    chance: 10,
    type: "percentage",
  },
  {
    id: 2,
    option: "30%",
    value: 30,
    chance: 15,
    type: "percentage",
  },
  {
    id: 3,
    option: "30%",
    value: 30,
    chance: 15,
    type: "percentage",
  },
  {
    id: 4,
    option: "20%",
    value: 20,
    chance: 20,
    type: "percentage",
  },
  {
    id: 5,
    option: "20%",
    value: 20,
    chance: 20,
    type: "percentage",
  },
  {
    id: 6,
    option: "20% на косметику",
    value: 20,
    chance: 15,
    type: "cosmetics",
  },
];

function calculateSpinResult(): DiscountOption {
  const random = Math.random() * 100;

  let cumulativeChance = 0;

  for (const option of discountOptions) {
    cumulativeChance += option.chance;
    if (random <= cumulativeChance) {
      return option;
    }
  }

  return discountOptions[discountOptions.length - 1];
}

export async function GET() {
  try {
    const result = calculateSpinResult();

    return NextResponse.json({
      success: true,
      result: {
        id: result.id,
        option: result.option,
        value: result.value,
        type: result.type,
      },
    });
  } catch (error) {
    console.error("Error in spin endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
