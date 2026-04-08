export function FindoutSection() {
  return (
    <>
      <div className="py-8 md:py-12 ">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
            <h2 className="m-0 font-quattrocento text-[24px] md:text-[36px] font-normal text-center md:text-left uppercase leading-[100%] tracking-normal text-[#111111]">
              Our Locations
            </h2>
          </div>
        </div>
      </div>
      <img
        src="/assets/City-Map-Infrastructure.png"
        alt="Contact us"
        className="block h-auto w-full max-w-full object-cover lg:h-[450px] xl:h-[567px]"
      />
      <div className="mt-[10px] w-full px-4 sm:px-6 md:px-8 mb-14">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-[10px] md:grid-cols-4 xl:max-w-[1280px]">
          <img
            src="/assets/building1.jpg"
            alt="Modern residential towers"
            className="h-auto w-full object-cover"
          />
          <img
            src="/assets/advisor.jpg"
            alt="City skyline and construction"
            className="h-auto w-full object-cover"
          />
          <img
            src="/assets/construction1.jpg"
            alt="Construction site"
            className="h-auto w-full object-cover"
          />
          <img
            src="/assets/family.jpg"
            alt="Happy family reviewing home plans"
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
