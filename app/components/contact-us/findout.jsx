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
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.836802936377!2d77.41845003955078!3d28.585997900000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef25407d8d75%3A0x7c8b0b102e9204b1!2sEternia%20Residences!5e0!3m2!1sen!2sin!4v1774602648191!5m2!1sen!2sin"
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
