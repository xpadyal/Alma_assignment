let leads = []; // In-memory store for leads

export default function handler(req, res) {
  if (req.method === "GET") {
    // Return the list of leads
    console.log("Returning Leads:", leads);
    res.status(200).json(leads);
  } else if (req.method === "POST") {
    // Extract fields from the request body
    const { firstName, lastName, email, countryOfCitizenship, linkedinUrl, visaCategories, helpMessage } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !countryOfCitizenship) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create a new lead
    const newLead = {
      id: leads.length + 1,
      firstName,
      lastName,
      email,
      countryOfCitizenship,
      linkedinUrl,
      visaCategories,
      helpMessage,
      state: "PENDING",
      submittedAt: new Date().toLocaleString(),
    };

    leads.push(newLead);
    console.log("New Lead Added:", newLead);
    res.status(201).json(newLead);
  } else if (req.method === "PUT") {
    // Update the state of a lead
    const { id, state } = req.body;
    const leadIndex = leads.findIndex((lead) => lead.id === id);
    if (leadIndex > -1) {
      leads[leadIndex].state = state;
      res.status(200).json(leads[leadIndex]);
    } else {
      res.status(404).json({ error: "Lead not found" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}


