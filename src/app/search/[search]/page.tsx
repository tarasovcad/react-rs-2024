import Main from "@/components/App";
import React from "react";

interface PageProps {
  params: {
    search: number;
  };
}

const Page = ({ params }: PageProps) => {
  const { search } = params;
  console.log(search, "search");
  return <Main search={search} />;
};

export default Page;
