"use client";

import { Advocate } from "@/db/schema";
import { ChangeEventHandler, useEffect, useState } from "react";
import useAsyncEffect from "./utils/useAsyncEffect";
import delay from "./utils/delay";

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

  const handleChangeSearchTerm: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newSearchTerm = event.target.value;

    setSearchTerm(newSearchTerm);
  };

  const handleResetSearch = () => {
    setSearchTerm('');
  };

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
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {(advocate.specialties as string[]).map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={handleChangeSearchTerm} value={searchTerm} />
        <button onClick={handleResetSearch}>Reset Search</button>
      </div>
      <br />
      <br />
      {renderResults()}
    </main>
  );
}
