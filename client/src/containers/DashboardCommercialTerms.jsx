// DashboardCommercialTerms.js
import React from "react";
import { Container, Typography } from "@material-ui/core";

const commercialTerms = [
  {
    label: "Payment Terms",
    content:
      "Payment for our services is due upon receipt of the invoice. Failure to pay may result in the suspension of your account.",
  },
  {
    label: "Service Agreement",
    content:
      "Users must adhere to our service agreement, which outlines acceptable use and conduct when using our platform.",
  },
  {
    label: "Refund Policy",
    content:
      "Refunds are issued according to our refund policy. Please review the policy carefully before making a purchase.",
  },
  {
    label: "Termination",
    content:
      "We reserve the right to terminate or suspend your account if you violate our terms of service.",
  },
];

const DashboardCommercialTerms = () => {
  return (
    <Container
      component="main"
      maxWidth="md"
      className="py-20 px-4 mx-auto bg-white rounded-md shadow-md"
    >
      <Typography component="h1" variant="h5" className="text-3xl mb-6">
        Commercial Terms
      </Typography>
      {commercialTerms.map((term, index) => (
        <div key={index} className="text-left m-8">
          <Typography paragraph>
            <span className="font-semibold">{term.label}:</span> {term.content}
          </Typography>
        </div>
      ))}
      <Typography paragraph>
        Please read these terms carefully. If you do not agree with any part of
        these terms, you may not use our services.
      </Typography>
    </Container>
  );
};

export default DashboardCommercialTerms;
