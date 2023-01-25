type Replace<T, R> = Omit<T, keyof R> & R;

export { Replace };
