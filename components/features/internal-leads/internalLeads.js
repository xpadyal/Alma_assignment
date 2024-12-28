import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";

const InternalLeads = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch leads
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get("api/leads");
        console.log("Fetched Leads:", response.data); // Debug log
        setLeads(response.data);
        setFilteredLeads(response.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };
    fetchLeads();
  }, []);
  

  // Handle search and filters
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    filterLeads(query, statusFilter);
  };

  const handleStatusFilter = (e) => {
    const status = e.target.value;
    setStatusFilter(status);
    filterLeads(search, status);
  };

  const filterLeads = (searchQuery, status) => {
    let filtered = leads;
    if (searchQuery) {
      filtered = filtered.filter(
        (lead) =>
          lead.firstName.toLowerCase().includes(searchQuery) ||
          lead.lastName.toLowerCase().includes(searchQuery)
      );
    }
    if (status) {
      filtered = filtered.filter((lead) => lead.state === status);
    }
    setFilteredLeads(filtered);
  };

  // Handle state update
  const updateLeadState = async (id) => {
    try {
      const response = await axios.put("api/leads", {
        id,
        state: "REACHED_OUT",
      });
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === id ? { ...lead, state: response.data.state } : lead
        )
      );
      setFilteredLeads((prev) =>
        prev.map((lead) =>
          lead.id === id ? { ...lead, state: response.data.state } : lead
        )
      );
    } catch (error) {
      console.error("Error updating lead state:", error);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#f8f9fa",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography variant="h6" style={{ marginBottom: "20px" }}>
            alma
          </Typography>
          <Button variant="text" style={{ display: "block", marginBottom: "10px" }}>
            Leads
          </Button>
          <Button variant="text" style={{ display: "block", marginBottom: "10px" }}>
            Settings
          </Button>
        </div>
        <div>
          <Button variant="text">Admin</Button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Leads
        </Typography>
        <div style={{ display: "flex", marginBottom: "20px", gap: "10px" }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={search}
            onChange={handleSearch}
            style={{ flex: 1 }}
          />
          <Select
            value={statusFilter}
            onChange={handleStatusFilter}
            displayEmpty
            size="small"
            style={{ minWidth: "150px" }}
          >
            <MenuItem value="">Status</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="REACHED_OUT">Reached Out</MenuItem>
          </Select>
        </div>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {filteredLeads.map((lead) => {
     // Debugging
    return (
      <TableRow key={lead.id}>
        <TableCell>{`${lead.firstName} ${lead.lastName}`}</TableCell>
        <TableCell>{lead.submittedAt}</TableCell>
        <TableCell>{lead.state}</TableCell>
        <TableCell>{lead.countryOfCitizenship}</TableCell> {/* Country Field */}
        <TableCell>
          {lead.state === "PENDING" && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => updateLeadState(lead.id)}
            >
              Mark as Reached Out
            </Button>
          )}
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default InternalLeads;
