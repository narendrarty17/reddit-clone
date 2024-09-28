import { createContext } from "react";

export const CommunityCreationContext = createContext({
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
