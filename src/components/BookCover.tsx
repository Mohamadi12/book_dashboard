"use client"

import { cn } from "@/lib/utils";
import React from "react";
import BookCoverSvg from "./BookCoverSvg";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

type BookCoverVariant = "small" | "default" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  small: "book-cover_small",
  wide: "book-cover_wide",
  default: "book-cover"
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}

const BookCover = ({
    className,
    variant = "default",
    coverColor = "#012B48",
    coverImage = "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor}/>
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <IKImage
          path={coverImage}
          urlEndpoint={config.env.imageKit.urlEndpoint}
          alt="Book cover"
          fill
          className="rounded-sm object-fill"
          loading="lazy"
          lqip={{active: true}}
        />
      </div>
    </div>
  );
};

export default BookCover;
