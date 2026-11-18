"use client";
/** next/link that automatically adds the current language to internal links ("/about" → "/nl/about"). */
import NextLink from "next/link";
import { forwardRef, type ComponentProps } from "react";
import { useI18n } from "@/i18n/I18nProvider";

const LocalLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof NextLink>>(function LocalLink({ href, ...rest }, ref) {
  const { href: loc } = useI18n();
  const h = typeof href === "string" ? loc(href) : href;
  return <NextLink ref={ref} href={h} {...rest} />;
});
export default LocalLink;
