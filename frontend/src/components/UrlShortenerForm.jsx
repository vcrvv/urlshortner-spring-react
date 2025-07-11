import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export default function UrlShortenerForm({ onShorten, loading }) {
  const [url, setUrl] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!isValidUrl(url)) {
      setError("URL inválida");
      return;
    }
    if (expiresAt < 1) {
      setError("Expiração mínima de 1 hora");
      return;
    }
    onShorten(url, expiresAt);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={2} display="flex" flexDirection="column" gap={2}>
      <TextField
        label="URL Original"
        variant="outlined"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        error={!!error}
        helperText={error}
        required
        disabled={loading}
      />
      <TextField
        label="Expiração (horas)"
        type="number"
        value={expiresAt}
        onChange={(e) => setExpiresAt(Number(e.target.value))}
        InputProps={{
          startAdornment: <InputAdornment position="start">⏰</InputAdornment>,
          inputProps: { min: 1 },
        }}
        fullWidth
        disabled={loading}
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? "Encurtando..." : "Encurtar"}
      </Button>
    </Box>
  );
}
