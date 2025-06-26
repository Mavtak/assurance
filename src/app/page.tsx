"use client";

import { Advocate } from "@/db/schema";
import { useState } from "react";
import useAsyncEffect from "./utils/useAsyncEffect";
import delay from "./utils/delay";
import styled from "styled-components";
import SearchField from "./SearchField";
import AdvocateList from "./AdvocateList";

const Container = styled.main`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [loadingState, setLoadingState] = useState<'loading' | 'initializing' | 'ready'>('initializing');
  const [searchTerm, setSearchTerm] = useState('');

  useAsyncEffect(async (checkIsLatestCall) => {
    if (loadingState !== 'initializing') {
      await delay(250);

      if (!checkIsLatestCall()) {
        return;
      }

      setLoadingState('loading');
    }

    const path = `/api/advocates?searchTerm=${searchTerm}`;
    const response = await fetch(path);
    const jsonResponse = await response.json();

    if (!checkIsLatestCall()) {
      return;
    }

    setAdvocates(jsonResponse.data);
    setLoadingState('ready');
  }, [searchTerm]);

  if (loadingState === 'initializing') {
    return (
      <div>
        loading
      </div>
    )
  }

  const renderResults = () => {
    if (loadingState === 'loading') {
      return (
        <div>
          loading
        </div>
      )
    };

    return (
      <AdvocateList advocates={advocates} />
    )
  };

  return (
    <Container>
      <h1>Solace Advocates</h1>
      <h2>Search</h2>
      <SearchField onChange={setSearchTerm} value={searchTerm} />
      {renderResults()}
    </Container>
  );
}
