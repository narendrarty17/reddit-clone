import { createContext } from "react";

export const ItemCreationContext = createContext({
  handleCancel: () => {},
  addCommunityData: () => {},
  onSubmit: () => {},
  name: "",
  desc: "",
  updateCommunityName: () => {},
  updateCommunityDesc: () => {},
  backPage: () => {},
  submitPage: () => {},
  communityData: {},
});
