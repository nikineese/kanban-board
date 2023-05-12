import Head from "next/head";
import { BoardScreen } from "@/widgets/board-screen";
import { Sidebar } from "@/widgets/sidebar";
import { withProviders } from "@/providers";
import { useSideEffectsState } from "@/entities/redux";
import React from "react";
import { ErrorPopup } from "@/shared/lib";

function Main() {
  const { error } = useSideEffectsState();

  return (
    <>
      <Head>
        <title>Kanban Board</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Sidebar />
      <BoardScreen />
      <ErrorPopup error={error} />
    </>
  );
}

export default withProviders(Main);
