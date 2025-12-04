import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Link from "next/link";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) return;
    const handler = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(
        `/api/games/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data.results || []);
      setLoading(false);
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <TextField
        fullWidth
        label="Search games"
        variant="outlined"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (e.target.value.length < 2) {
            setResults([]);
            setLoading(false);
          }
        }}
        autoFocus
      />
      {query.length >= 2 && loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}
      {query.length >= 2 && (
        <List>
          {results.map((game) => (
            <ListItem key={game.id} disablePadding>
              <Link
                href={`/games/${game.id}`}
                style={{ textDecoration: "none", width: "100%" }}
              >
                <Box sx={{ px: 2, py: 1, width: "100%" }}>{game.name}</Box>
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
