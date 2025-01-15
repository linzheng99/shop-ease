import { Transform } from 'class-transformer';

export function TransformStringArray() {
  return Transform(({ value }) => {
    if (!value || value === '') return undefined;
    return Array.isArray(value) ? value : value.split(',').filter(Boolean);
  });
}
