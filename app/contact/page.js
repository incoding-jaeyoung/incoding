"use client";

import dynamic from "next/dynamic";

const ContactPage = dynamic(() => import("../../components/ContactPage"), {
  ssr: false,
});

export default ContactPage;