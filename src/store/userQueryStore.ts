import { create, SetState } from "zustand";
import { UserQuery } from "../types";

interface StoreState {
  userQueries: UserQuery[];
  setUserQueries: (newUserQueries: UserQuery[]) => void;
}

export const useUserQueryStore = create<StoreState>(
    (set: SetState<StoreState>) => ({
      userQueries: [],
      setUserQueries: (newUserQueries) => set({ userQueries: newUserQueries }),
    }),
);

