import cx from "classnames";
import React, { ReactNode } from "react";

enum Variant {
  Default,
  ItemsCenter,
  JustifyCenter,
}

type Props = {
  variant?: Variant;
  isNew?: boolean;
  children: ReactNode;
  data: {
    title: string;
  };
};

const DemoCard = ({
  variant = Variant.Default,
  isNew,
  children,
  data: { title },
}: Props) => {
  const id = title.replace(" ", "_").toLowerCase();

  return (
    <section className="mb-12 w-full" id={id}>
      <div
        className={cx(
          "relative flex w-full rounded-xl p-6 shadow",
          "bg-gradient-to-br from-black/30 via-fuchsia-100 to-black/30 dark:from-pink-800 dark:via-fuchsia-900 dark:to-purple-800",
          {
            [Variant.Default]: "items-center justify-center",
            [Variant.ItemsCenter]: "items-center",
            [Variant.JustifyCenter]: "justify-center pt-24", // Height of title bar
          }[variant],
        )}
      >
        {children}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between rounded-t-xl bg-black/50 px-4 py-2.5 dark:bg-black/30">
          <div className="flex items-center space-x-2">
            <a
              className="select-none text-sm font-medium text-white dark:text-gray-300"
              href={`#${id}`}
            >
              {title}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

DemoCard.variant = Variant;
export default DemoCard;
