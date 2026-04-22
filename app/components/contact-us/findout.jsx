export function FindoutSection() {
  return (
    <>
      <div className="py-8 md:py-12 ">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
            <h2 className="m-0 font-quattrocento text-[20px] md:text-[36px] font-normal text-center md:text-left uppercase leading-[100%] tracking-normal text-[#111111]">
              Our Locations
            </h2>
          </div>
        </div>
      </div>
      <iframe
        title="Map — Eternia Sales Office"
        src="https://www.google.com/maps?q=Eternia+sales+office&output=embed"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="mt-[10px] w-full px-4 sm:px-6 md:px-8 mb-14">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-[10px] md:grid-cols-4 xl:max-w-[1280px]">
          <img
            src="/assets/building1.jpg"
            alt="Modern residential towers at Sanskar Realty"
            title="Modern residential towers at Sanskar Realty"
            className="h-auto w-full object-cover"
          />
          <img
            src="/assets/advisor.jpg"
            alt="City skyline and development — Sanskar Realty locations"
            title="City skyline and development — Sanskar Realty locations"
            className="h-auto w-full object-cover"
          />
          <img
            src="/assets/construction1.jpg"
            alt="Premium construction and building quality"
            title="Premium construction and building quality"
            className="h-auto w-full object-cover"
          />
          <img
            src="/assets/family.jpg"
            alt="Happy family reviewing home plans with Sanskar Realty"
            title="Happy family reviewing home plans with Sanskar Realty"
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
