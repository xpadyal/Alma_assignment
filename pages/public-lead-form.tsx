import { useState } from "react";
import React from "react";
import axios from "axios";
import styles from "./public-lead-form.module.css";
import countries from "world-countries";
import { DocumentTextIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/solid";
import { CubeIcon } from "@heroicons/react/solid";




// Format countries for the dropdown
const countryOptions = countries.map((country) => ({
  value: country.cca2, // Country code
  label: country.name.common, // Country name
}));

export default function PublicLeadForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryOfCitizenship: "",
    linkedinUrl: "",
    visaCategories: [],
    helpMessage: "",
    resume: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, resume: file }));
    }
  };

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryOfCitizenship: "",
    linkedinUrl: "",
    helpMessage: "",
  });

  const validate = () => {
    const newErrors: any = {};

    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.countryOfCitizenship) {
      newErrors.countryOfCitizenship = "Please select a country";
    }
    if (!formData.linkedinUrl) {
      newErrors.linkedinUrl = "LinkedIn/Website URL is required";
    } else if (
      !/^(https?:\/\/)?([\w\d-]+\.){1,3}[a-zA-Z]{2,}(\/.*)?$/.test(
        formData.linkedinUrl
      )
    ) {
      newErrors.linkedinUrl = "Invalid URL";
    }
    if (!formData.helpMessage) {
      newErrors.helpMessage = "Please provide some details";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setErrors({ ...errors, [name]: "" }); // Clear error when typing

    if (type === "checkbox") {
      // Handle checkbox group
      setFormData((prevData) => ({
        ...prevData,
        visaCategories: checked
          ? [...prevData.visaCategories, value]
          : prevData.visaCategories.filter((category) => category !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDropdownChange = (e) => {
    setFormData({ ...formData, countryOfCitizenship: e.target.value });
    setErrors({ ...errors, countryOfCitizenship: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const leadData = {
      ...formData,
      submittedAt: new Date().toLocaleString(), // Add submission timestamp
    };
    console.log("Lead Data:", leadData);
    try {
      await axios.post("api/leads", leadData); // Send form data to API
      setFormSubmitted(true); // Show Thank You message
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
          Submit the form below and our team of experienced attorneys will<br/>
          review your information and send a preliminary assessment of your<br/>
          case based on your goals.
        </p>
      </div>

      <div className={styles["form-container"]}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles["input-group"]}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className={styles.error}>{errors.firstName}</p>
            )}

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}

            <div className={styles["input-group"]}>
              <label htmlFor="countryOfCitizenship"></label>
              <select
                id="countryOfCitizenship"
                name="countryOfCitizenship"
                value={formData.countryOfCitizenship}
                onChange={handleDropdownChange}
              >
                <option value="" disabled>
                  Select your country
                </option>
                {countryOptions.map((country) => (
                  <option key={country.value} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </select>
              {errors.countryOfCitizenship && (
                <p className={styles.error}>{errors.countryOfCitizenship}</p>
              )}
            </div>

            <input
              type="url"
              name="linkedinUrl"
              placeholder="LinkedIn / Personal Website URL"
              value={formData.linkedinUrl}
              onChange={handleChange}
            />
            {errors.linkedinUrl && (
              <p className={styles.error}>{errors.linkedinUrl}</p>
            )}
          </div>
          {/* # Add resume */}
          <div className={styles["file-upload-group"]}>
            <label htmlFor="resume">Upload Resume/CV</label>
            <button type="button" className={styles["file-upload-button"]}>
              Upload File
            </button>
          </div>
          <br></br>



          <div className={styles["checkbox-group"]}>
          <CubeIcon className={styles["dice-icon"]} />
            <label style={{ display: "block", textAlign: "center", marginBottom: "10px" }}>
              Visa Category of interest
            </label>
            <div className={styles.checkbox}>
              <label>
                <input
                  type="checkbox"
                  name="visaCategories"
                  value="O1"
                  onChange={handleChange}
                />{" "}
                O1
              </label>
              <label>
                <input
                  type="checkbox"
                  name="visaCategories"
                  value="EB1A"
                  onChange={handleChange}
                />{" "}
                EB1A
              </label>
              <label>
                <input
                  type="checkbox"
                  name="visaCategories"
                  value="EB2-NIW"
                  onChange={handleChange}
                />{" "}
                EB2-NIW
              </label>
              <label>
                <input
                  type="checkbox"
                  name="visaCategories"
                  value="I don’t know"
                  onChange={handleChange}
                />{" "}
                I don’t know
              </label>
            </div>
          </div>

          <div className={styles["help-textbox"]}>
          <HeartIcon className={styles["heart-icon"]} />
            <label>How can we help you?</label>
            <textarea
              name="helpMessage"
              placeholder="What is your current status and what does it mean? What are your long-term goals? Are there any unique considerations?"
              rows={5}
              value={formData.helpMessage}
              onChange={handleChange}
            ></textarea>
            {errors.helpMessage && (
              <p className={styles.error}>{errors.helpMessage}</p>
            )}
          </div>

          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}




