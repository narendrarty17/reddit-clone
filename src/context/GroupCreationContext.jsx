import { createContext } from "react";

export const GroupCreationContext = createContext({
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
