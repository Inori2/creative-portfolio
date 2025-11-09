export default function Services({
  number = "[00]",
  services = "Services",
  details = "Building human-centered web experiences that look as good as they feel.",
  ref,
}) {
  return (
    <>
      <div
        ref={ref}
        className="services-container border-b border-neutral-800 flex gap-20 font-primary pb-7"
      >
        <div className="flex gap-16 w-full">
          <span className="text-neutral-500 text-base">{number}</span>
          <h3 className="text-neutral-50 text-xl font-bold tracking-wide">
            {services}
          </h3>
        </div>
        <div className="w-full">
          <span className="text-neutral-400 text-sm tracking-wide leading-5">
            {details}
          </span>
        </div>
      </div>
    </>
  );
}
