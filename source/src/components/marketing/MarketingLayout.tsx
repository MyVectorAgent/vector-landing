import vectorLogoUrl from "../../assets/vector-logo.png";

type Props = {
  children: React.ReactNode;
  /** When false, only background + font (e.g. nested use). Default shows top chrome. */
  showChrome?: boolean;
};

export default function MarketingLayout({ children, showChrome = true }: Props) {
  return (
    <div className="font-display relative min-h-screen overflow-x-hidden bg-[#FFFFFF] text-[#0F0F12] antialiased selection:bg-[#E878BE]/18 selection:text-[#0F0F12]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[#FFFFFF]" />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15,15,18,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,15,18,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {showChrome ? (
        <header className="relative z-20 mx-auto flex max-w-[96rem] items-center gap-4 px-5 pt-7 pb-4 sm:px-8 sm:pt-8">
          <a
            href="./"
            className="group flex items-center gap-2.5 no-underline outline-none transition-opacity hover:opacity-90"
            aria-label="Vector home"
          >
            <img
              src={vectorLogoUrl}
              alt=""
              className="h-9 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105 sm:h-10"
              decoding="async"
            />
            <span className="text-lg font-semibold tracking-tight text-[#0F0F12] sm:text-xl">Vector</span>
          </a>
        </header>
      ) : null}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
