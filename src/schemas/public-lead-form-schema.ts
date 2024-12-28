export const schema = {
    type: "object",
    properties: {
      firstName: { type: "string", title: "First Name" },
      lastName: { type: "string", title: "Last Name" },
      email: { type: "string", format: "email", title: "Email" },
      countryOfCitizenship: {
        type: "string",
        enum: ["United States", "Canada", "India", "Australia", "Other"],
        title: "Country of Citizenship",
      },
      linkedinUrl: { type: "string", format: "uri", title: "LinkedIn URL" },
      visaCategories: {
        type: "array",
        title: "Visa Categories of Interest",
        items: {
          type: "string",
          enum: ["O1", "EB1A", "EB2-NIW", "I don’t know"],
        },
        uniqueItems: true,
      },
      helpMessage: { type: "string", title: "How can we help you?" },
    },
    required: ["firstName", "lastName", "email", "countryOfCitizenship"],
  };
  
  export const uischema = {
    type: "VerticalLayout",
    elements: [
      { type: "Control", scope: "#/properties/firstName" },
      { type: "Control", scope: "#/properties/lastName" },
      { type: "Control", scope: "#/properties/email" },
      { type: "Control", scope: "#/properties/countryOfCitizenship" },
      { type: "Control", scope: "#/properties/linkedinUrl" },
      {
        type: "VerticalLayout",
        elements: [
          {
            type: "Label",
            text: "Visa Category of Interest",
          },
          {
            type: "VerticalLayout",
            elements: [
              { type: "Control", scope: "#/properties/visaCategories" },
            ],
          },
        ],
      },
      {
        type: "VerticalLayout",
        elements: [
          { type: "Control", scope: "#/properties/visaCategories" },
        ],
      },
      {
        type: "VerticalLayout",
        elements: [
          {
            type: "Label",
            text: "How can we help you?",
          },
          {
            type: "Control",
            scope: "#/properties/helpMessage",
            options: {
            multi: true,
            className: "help-textbox", 
            },
          },
        ],
      },
    ],
  };
  
  
