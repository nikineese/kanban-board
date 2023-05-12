import compose from "compose-function";
import { withPreloadSidebarData } from "./with-preload-data";
import { withGlobalStyledWrapper } from "./with-global-styled-wrapper";
export const withProviders = compose(
  withPreloadSidebarData,
  withGlobalStyledWrapper
);
