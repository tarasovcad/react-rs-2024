import Loader from "@/components/loader/Loader";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Search = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/search/1");
  }, [router]);
  return <Loader />;
};

export default Search;
