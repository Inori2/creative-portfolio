import { forwardRef } from "react";

const Services = forwardRef(function Services(
  {
    number = "[00]",
    services = "Services",
    details = "Building human-centered web experiences that look as good as they feel.",
  },
  ref
) {
  return (
    <div
      ref={ref}
      className="services-container relative flex flex-col lg:flex-row lg:gap-20 font-primary pb-7"
    >
      <div className="flex gap-16 w-full lg:w-1/3">
        <span className="service-number text-neutral-500 text-base">
          {number}
        </span>
        <h3 className="service-title text-neutral-50 text-xl font-bold tracking-wide">
          {services}
        </h3>
      </div>
      <div className="w-full lg:flex-1">
        <span className="service-details text-neutral-400 text-sm tracking-wide leading-5">
          {details}
        </span>
      </div>
      <div className="service-border absolute bottom-0 left-0 h-px w-full bg-neutral-800"></div>
    </div>
  );
});

export default Services;
