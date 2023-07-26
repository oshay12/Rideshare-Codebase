import "./contactus.css";
import React, { useState } from "react";
import { Breadcrumb } from "react-bootstrap";

function ContactUs() {
  const FORM_ENDPOINT =
    "https://public.herotofu.com/v1/daca8410-d1be-11ed-b656-837b57be60e0";
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setTimeout(() => {
      setSubmitted(true);
    }, 100);
  };

  if (submitted) {
    return (
      <>
        <div className="text-2xl">Thank you!</div>
        <div className="text-md">We'll be in touch soon.</div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Contact us!</Breadcrumb.Item>
      </Breadcrumb>
      <div className="contact-square">
        <form
          action={FORM_ENDPOINT}
          onSubmit={handleSubmit}
          method="POST"
          target="_blank"
        >
          <h1>Any questions or concerns? Contact us!</h1>
          <div>
            <label for="name">Your Name:</label>
            <input name="Name" id="name" type="text" required />
          </div>
          <div>
            <label for="emailAddress">Your Email Address:</label>
            <input name="Email" id="email" type="email" required />
          </div>
          <div>
          <label for="email">Send us an email!:</label>
            <input
              type="text"
              name="_gotcha"
              tabindex="-1"
              autocomplete="off"
            />
          </div>
          <div>
            
            <input type="submit" value="Send" />
            <div aria-hidden="true"></div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ContactUs;
