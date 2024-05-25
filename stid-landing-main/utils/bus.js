import { Emitter } from './emitter';

/**
 * Simple singleton with an event system
 */
export const useBus = (() => {
  let bus;
  return () => {
    if (!bus) bus = new Emitter();
    return bus;
  };
})();
