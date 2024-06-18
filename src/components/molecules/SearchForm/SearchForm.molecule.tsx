"use client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { Input } from "@/components/atoms/Input/Input.atom";
import { Icons } from "@/icons";
import { SearchTypeState } from "@/recoil/atoms.recoil";

type Inputs = {
  search: string;
};

export const SearchForm = () => {
  const [placeholder, setPlaceholder] = useState("Google で 検索");
  const searchType = useRecoilValue(SearchTypeState);
  const { register, setFocus, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    setFocus("search");
  }, [setFocus]);

  useEffect(() => {
    if (searchType === "newTab") {
      setPlaceholder("Google で 検索 - 新規タブで開く");
    } else {
      setPlaceholder("Google で 検索");
    }
  }, [searchType]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const query = data.search;
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      query
    )}`;
    const searchHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );
    searchHistory.unshift(query);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    if (searchType === "newTab") {
      window.open(googleSearchUrl, "_blank");
    } else {
      window.location.href = googleSearchUrl;
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-[6px] w-full pl-4 pr-3 py-2 bg-white rounded-full"
    >
      <Input
        className="flex-1 w-full"
        placeholder={placeholder}
        {...register("search")}
      />
      <Button className="w-fit" type="submit">
        <Icons.Search />
      </Button>
    </form>
  );
};
