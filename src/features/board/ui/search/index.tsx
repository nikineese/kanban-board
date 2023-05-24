import React, { useState } from "react";
import { SearchParams } from "./types";
import { SearchInput } from "./styled";
import { Box, Typography } from "@mui/material";
import { colors, Icon, filterDataByString } from "@/shared/lib";
import {
  setSearchedTicket,
  Ticket,
  TicketModal,
  useBoardState,
} from "@/entities/board";
import { EmptySearchPlaceholder } from "../empty-search-placeholder";
import { useDispatch } from "react-redux";

export const Search: React.FC<SearchParams> = ({ searchInData, board }) => {
  const dispatch = useDispatch();
  const { searchedTicket } = useBoardState();

  const [search, setSearch] = useState("");
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const filteredDataBySearch = filterDataByString<Ticket>(
    searchInData,
    "title",
    search
  );

  const chooseSearchedTicket = (ticket: Ticket) => {
    setIsTicketModalOpen(true);
    dispatch(setSearchedTicket(ticket));
    setSearch("");
  };

  return (
    <>
      <Box position="relative">
        <Box
          display="flex"
          fontSize={18}
          position="relative"
          alignItems="center"
        >
          <SearchInput
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Icon
            name="search"
            size={27}
            absolute={{
              isAbsolute: true,
              position: { top: -8, right: 0 },
            }}
          />
        </Box>
        {search.length > 0 && (
          <Box
            zIndex={2}
            position="absolute"
            display="flex"
            flexDirection="column"
            width="100%"
            gap="10px"
            border={`1px solid ${colors.black.default}`}
            bgcolor={colors.white.default}
            padding="10px"
          >
            {filteredDataBySearch.length <= 0 && <EmptySearchPlaceholder />}
            {filteredDataBySearch.map((el) => (
              <Box
                key={el.id}
                className="pointer"
                borderBottom={`1px solid ${colors.gray.light}`}
                onClick={() => chooseSearchedTicket(el)}
              >
                <Typography>{el.title}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      {searchedTicket && (
        <TicketModal
          view={{ isModeEnabled: true, modeData: searchedTicket }}
          isOpen={isTicketModalOpen}
          setIsOpen={setIsTicketModalOpen}
          board={board}
        />
      )}
    </>
  );
};
