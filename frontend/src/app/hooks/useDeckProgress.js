"use client";
import { useEffect, useState, useCallback } from "react";
import { getDeckProgress } from "../utils/DeckApi";

export function useDeckProgress(deckId) {
  const [progress, setProgress] = useState({ mastered: 0, total: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDeckProgress(deckId);
      setProgress(data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [deckId]);

  useEffect(() => {
    if (deckId) {
      fetchProgress();
    }
  }, [fetchProgress]);

  return { progress, fetchProgress, loading, error };
}
