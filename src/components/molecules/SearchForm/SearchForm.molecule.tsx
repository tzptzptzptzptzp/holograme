"use client";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/atoms/Button/Button.atom";
import { Input } from "@/components/atoms/Input/Input.atom";
import { Icons } from "@/icons";

type Inputs = {
  search: string;
};

export const SearchForm = () => {
  const { register, setFocus, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    setFocus("search");
  }, [setFocus]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const query = data.search;
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      query
    )}`;
    window.location.href = googleSearchUrl;
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="u-shadow flex gap-[6px] w-full pl-4 pr-3 py-2 bg-white rounded-full"
    >
      <Input
        className="flex-1 w-full"
        placeholder="Google で 検索"
        {...register("search")}
      />
      <Button className="w-fit" type="submit">
        <Icons.Search />
      </Button>
    </form>
  );
};
