import { createContext } from "react";

export const ItemCreationContext = createContext({
  handleCancel: () => {},
  addCommunityData: () => {},
  onSubmit: () => {},
});
