import { useState } from "react";
import axios from "axios";
import styles from "./public-lead-form.module.css";
import { DocumentTextIcon, HeartIcon, CubeIcon } from "@heroicons/react/solid";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import { schema, uischema } from "../src/schemas/public-lead-form-schema";

export default function PublicLeadForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "countryOfCitizenship"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Missing required fields: ${missingFields.join(", ")}`);
      return;
    }

    const leadData = {
      ...formData,
      submittedAt: new Date().toLocaleString(),
    };

    try {
      await axios.post("/api/leads", leadData);
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  if (formSubmitted) {
    return (
      <div className={styles["thank-you-container"]}>
        <DocumentTextIcon className={styles["thank-you-icon"]} />
        <h1 className={styles["thank-you-title"]}>Thank You</h1>
        <p className={styles["thank-you-message"]}>
          Your information was submitted to our team of immigration attorneys.
          Expect an email from <strong>hello@tryalma.ai</strong>.
        </p>
        <button
          className={styles["thank-you-button"]}
          onClick={() => setFormSubmitted(false)}
        >
          Go Back to Homepage
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className={styles["header-container"]}>
        <div className={styles.logo}>alma</div>
        <header className={styles["form-header"]}>
          <h1 className={styles["main-heading"]}>Get An Assessment<br />Of Your Immigration Case</h1>
        </header>
      </div>

      <div>
        <div className={styles["icon-container"]}>
          <DocumentTextIcon className={styles["thank-you-icon-1"]} />
        </div>
        <h2 className={styles["heading-2"]}>Want to understand your visa options?</h2>
        <p className={styles["subheading"]}>
          Submit the form below and our team of experienced attorneys will<br />
          review your information and send a preliminary assessment of your<br />
          case based on your goals.
        </p>
      </div>

      <div className={styles["form-container"]}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Cube Icon for Visa Category */}
          <div className={styles["icon-wrapper"]}>
            <CubeIcon className={styles["cube-icon"]} />
          </div>

          <JsonForms
            schema={schema}
            // uischema={uischema}
            data={formData}
            renderers={materialRenderers}
            onChange={({ data }) => setFormData(data)}
          />

          {/* Heart Icon for Help Message */}
          <div className={styles["icon-wrapper"]}>
            <HeartIcon className={styles["heart-icon"]} />
          </div>

          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
