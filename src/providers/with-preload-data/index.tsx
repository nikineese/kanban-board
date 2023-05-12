import React from "react";
import { LSKeys, usePreloadLSData } from "@/shared/lib";
import { preloadRecViewedBoard, RecentlyBoard } from "@/entities/sidebar";

export const withPreloadSidebarData =
  (Component: React.ComponentType) => () => {
    usePreloadLSData<RecentlyBoard[]>(
      LSKeys.REC_VIEWED_BOARDS,
      preloadRecViewedBoard
    );
    return <Component />;
  };
