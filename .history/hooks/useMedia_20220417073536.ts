import { createMedia } from "@artsy/fresnel";

export const { MediaContextProvider, Media } = createMedia({
	breakpoints: {
	  sm: 0,
	  md: 600,
	  lg: 1000,
	  xl: 1220,
	},
  });