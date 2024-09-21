import { createContext } from "react";

export const ItemCreationContext = createContext({
  handleCancel: () => {},
  addCommunityData: () => {},
  onSubmit: () => {},
  updateCommunityName: () => {},
  updateCommunityDesc: () => {},
  backPage: () => {},
  submitPage: () => {},
  communityData: {},
  formSubmitted: Boolean,
});
