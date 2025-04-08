"use client";

import Header from "@/app/components/Header/page";

const BookingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header stays at the top */}
      <Header />

      {/* Background container starting right after the header */}
      <div className="w-full flex justify-center mt-10 py-10">
        <div className="w-full max-w-screen-xl bg-white p-8 roundved-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-4">Booking Form</h2>

          {/* Microsoft Form Embed - Full width */}
          <iframe
            src="https://forms.office.com/Pages/ResponsePage.aspx?id=gyEv9Wef0kq2Vm91T-GWy_vmKDg2Qy1OodgKcEt35YtUM1FJQktNUTVaUkZNRjEyMEpIMFdUWktKTS4u" // Replace with your actual form link
            width="100%"
            height="800px"
            className="border rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
