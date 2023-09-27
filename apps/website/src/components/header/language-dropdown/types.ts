import type { ReactElement, SVGProps } from "react";

import EnglishIcon from "~icons/language-icons/en.svg";
import ItalianIcon from "~icons/language-icons/it.svg";

interface LanguageMapping {
  [localeCode: string]: {
    label: string;
    Icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
  };
}

export const languageMapping: LanguageMapping = {
  en: {
    label: "English",
    Icon: EnglishIcon,
  },
  it: {
    label: "Italiano",
    Icon: ItalianIcon,
  },
};
