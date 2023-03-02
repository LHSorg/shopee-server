export type AtLeast<T, U extends keyof T> = Partial<T> & Pick<T, U>;
