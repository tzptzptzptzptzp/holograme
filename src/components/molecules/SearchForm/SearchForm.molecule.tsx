"use client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { Input } from "@/components/atoms/Input/Input.atom";
import { useDevice } from "@/hooks/useDevice.hook";
import { useModal } from "@/hooks/useModal.hook";
import { Icons } from "@/icons";
import { CreateFavoriteState, SearchTypeState } from "@/recoil/atoms.recoil";

type Inputs = {
  search: string;
};

export const SearchForm = () => {
  const [placeholder, setPlaceholder] = useState("Google で 検索");
  const searchType = useRecoilValue(SearchTypeState);
  const { register, setFocus, handleSubmit, watch } = useForm<Inputs>();

  const setCreateFavorite = useSetRecoilState(CreateFavoriteState);

  const { type } = useDevice();
  const { handleOpen } = useModal();

  useEffect(() => {
    if (type === "PC" || type === "Tablet") {
      setFocus("search");
    }
  }, [setFocus, type]);

  useEffect(() => {
    if (searchType === "newTab") {
      setPlaceholder("Google で 検索 - 新規タブで開く");
    } else {
      setPlaceholder("Google で 検索");
    }
  }, [searchType]);

  const handleCreateFavoriteOpen = () => {
    if (watch("search").startsWith("http")) {
      setCreateFavorite((prev) => ({
        ...prev,
        url: watch("search"),
      }));
    }
    handleOpen("createFavorite");
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const query = data.search.trim();
    if (!query) return;
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
      className="flex gap-[6px] w-full s:w-1/2 s:min-w-0 pl-4 pr-3 py-2 bg-white rounded-full"
    >
      <Input
        className="flex-1 w-full"
        placeholder={placeholder}
        {...register("search", { required: true })}
      />
      <div className="flex gap-1">
        <Button className="w-fit" type="submit">
          <Icons.Search />
        </Button>
        <Button className="w-fit" onClick={handleCreateFavoriteOpen}>
          <Icons.Star className="-translate-y-[1px]" />
        </Button>
      </div>
    </form>
  );
};
