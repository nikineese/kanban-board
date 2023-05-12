import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TicketType } from "../model";

export const boardTableApi = createApi({
  reducerPath: "boardTable",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getTicketTypes: builder.query<TicketType[], void>({
      query: () => "ticket-types",
    }),
  }),
});

export const boardTableApiReducer = boardTableApi.reducer;
export const { useGetTicketTypesQuery } = boardTableApi;
