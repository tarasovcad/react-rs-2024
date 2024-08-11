import Main from "@/components/App";
import React from "react";

interface PageProps {
  params: {
    search: number;
  };
  searchParams: {
    page?: string;
    term?: string;
    details?: string;
  };
}

const Page = ({ params, searchParams }: PageProps) => {
  const { search } = params;
  return <Main search={search} searchParams={searchParams} />;
};

export default Page;
