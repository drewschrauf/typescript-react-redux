/* eslint-disable import/prefer-default-export */
export const asyncTimeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
