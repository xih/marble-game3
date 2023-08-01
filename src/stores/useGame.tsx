import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type State = {
  blocksCount: number;
  phase: string;
  start: () => void;
  restart: () => void;
  end: () => void;

  // random level
  blocksSeed: number;

  // mobile keys state
  forwardTouch: boolean;
  leftPointer: boolean;
  backPointer: boolean;
  rightPointer: boolean;
  forwardTouchOnKeyDown: () => void;
  forwardTouchOnKeyUp: () => void;
  leftPointerKeyDown: () => void;
  leftPointerKeyUp: () => void;
  backPointerKeyDown: () => void;
  backPointerKeyUp: () => void;
  rightPointerKeyDown: () => void;
  rightPointerKeyUp: () => void;

  jumpPressed: boolean;
  jumpKeyDown: () => void;
  jumpKeyUp: () => void;

  startTime: number;
  endTime: number;
};

export default create<State>()(
  subscribeWithSelector((set) => {
    return {
      blocksCount: 10,
      blocksSeed: 0,
      startTime: 0,
      endTime: 0,

      // Phases
      phase: "ready",
      start: () =>
        set((state) => {
          if (state.phase === "ready") {
            return {
              phase: "playing",
              startTime: Date.now(),
            };
          }

          return {};
        }),
      restart: () => {
        set((state) => {
          if (state.phase === "ended" || state.phase === "playing") {
            return {
              phase: "ready",
              blocksSeed: Math.random(),
            };
          }
          return {};
        });
      },
      end: () =>
        set((state) => {
          if (state.phase === "playing") {
            return {
              phase: "ended",
              endTime: Date.now(),
            };
          }

          return {};
        }),

      // mobile interfaces
      forwardTouch: false,
      leftPointer: false,
      backPointer: false,
      rightPointer: false,

      // forwardPointer
      forwardTouchOnKeyDown: () => {
        set((state) => {
          return {
            forwardTouch: true,
          };
        });
      },
      forwardTouchOnKeyUp: () => {
        set((state) => {
          return {
            forwardTouch: false,
          };
        });
      },
      // leftPointer
      leftPointerKeyDown: () => {
        set((state) => {
          return {
            leftPointer: true,
          };
        });
      },
      leftPointerKeyUp: () => {
        set((state) => {
          return {
            leftPointer: false,
          };
        });
      },

      // backpointer
      backPointerKeyDown: () => {
        set((state) => {
          return {
            backPointer: true,
          };
        });
      },
      backPointerKeyUp: () => {
        set((state) => {
          return {
            backPointer: false,
          };
        });
      },

      // right pointer
      rightPointerKeyDown: () => {
        set((state) => {
          return {
            rightPointer: true,
          };
        });
      },
      rightPointerKeyUp: () => {
        set((state) => {
          return {
            rightPointer: false,
          };
        });
      },

      // jump
      jumpPressed: false,
      jumpKeyDown: () => {
        set((state) => {
          return {
            jumpPressed: true,
          };
        });
      },
      jumpKeyUp: () => {
        set((state) => {
          return {
            jumpPressed: false,
          };
        });
      },
    };
  })
);
