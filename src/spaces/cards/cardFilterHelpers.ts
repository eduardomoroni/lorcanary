import type { LorcanitoCard } from "@/shared/types/lorcanito";

export type ValidParams = {
  color?: LorcanitoCard["color"];
  type?: LorcanitoCard["type"];
};

export interface Filter {
  name: string;
  value: string;
}

export function notEmptyPredicate<TValue>(
  value: TValue | null | undefined,
): value is TValue {
  return value !== null && value !== undefined;
}

export function filterCards(filters: Filter[]) {
  return (card: LorcanitoCard) => {
    return filters.every((filter) => {
      if (filter.name === "name") {
        return card.name.toLowerCase().includes(filter.value.toLowerCase());
      }
      if (filter.name === "type") {
        return card.type.toLowerCase() === filter.value.toLowerCase();
      }
      if (filter.name === "color") {
        return card.color.toLowerCase() === filter.value.toLowerCase();
      }
      return true;
    });
  };
}

export function fromSearchParamsToFilters(searchParams: ValidParams): Filter[] {
  return Object.keys(searchParams)
    .map((key) => {
      const value = searchParams[key as keyof ValidParams];

      if (!value) {
        return null;
      }

      return {
        name: key,
        value: value,
      };
    })
    .filter(notEmptyPredicate);
}

export function filterByAttributes({
  color,
  type,
}: {
  color?: LorcanitoCard["color"];
  type?: LorcanitoCard["type"];
}) {
  return (card: LorcanitoCard) => {
    if (color && card.color !== color) return false;
    if (type && card.type !== type) return false;
    return true;
  };
}

export function getCacheKeyForAttributes({
  color,
  type,
}: {
  color?: LorcanitoCard["color"];
  type?: LorcanitoCard["type"];
}) {
  return `${color}-${type}`;
}
