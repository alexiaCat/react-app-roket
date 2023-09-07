import { useState, useEffect } from 'react';
import { getTrees } from "../helpers/getTrees";

export const useFetchTrees = () => {
  const [trees, setTrees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTrees = async () => {
    const newTrees = await getTrees();
    setTrees(newTrees);
    setIsLoading(false);
  }

  useEffect(() => {
    loadTrees();
  }, []);

  return {
    trees: trees,
    isLoading: isLoading
  }
}
