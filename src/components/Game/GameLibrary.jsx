import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllGames, loadMoreGames, searchGames } from '../../redux/thunks';
import GameCard from './GameCard';
import {
  Container,
  Title,
  SimpleGrid,
  TextInput,
  Button,
  Group,
  LoadingOverlay,
  Alert,
  Box,
} from '@mantine/core';
import { IconSearch, IconRefresh } from '@tabler/icons-react';

const GameLibrary = () => {
  const dispatch = useDispatch();
  const { games, loading, error, visibleGames, searchResults } = useSelector(
    (state) => state.games
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    dispatch(fetchAllGames());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearching(true);
      dispatch(searchGames(searchTerm));
    } else {
      setIsSearching(false);
    }
  };

  const handleLoadMore = () => {
    dispatch(loadMoreGames());
  };

  const handleReset = () => {
    setSearchTerm('');
    setIsSearching(false);
  };

  const displayedGames = isSearching ? searchResults : games.slice(0, visibleGames);

  return (
    <Container size="xl" py="xl">
      <Box mb="xl">
        <Title order={2} mb="md">
          Game Library
        </Title>
        
        <form onSubmit={handleSearch}>
          <Group>
            <TextInput
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              icon={<IconSearch size={16} />}
              style={{ flex: 1 }}
            />
            <Button type="submit" variant="light">
              Search
            </Button>
            {isSearching && (
              <Button 
                variant="subtle" 
                leftIcon={<IconRefresh size={16} />}
                onClick={handleReset}
              >
                Reset
              </Button>
            )}
          </Group>
        </form>
      </Box>

      {loading && !games.length ? (
        <LoadingOverlay visible />
      ) : error ? (
        <Alert color="red" title="Error">
          {error}
        </Alert>
      ) : isSearching ? (
        <>
          <Title order={3} mb="md">
            Search Results
          </Title>
          {searchResults.length === 0 ? (
            <Alert color="yellow" title="No games found">
              Try a different search term
            </Alert>
          ) : (
            <SimpleGrid
              cols={4}
              spacing="lg"
              breakpoints={[
                { maxWidth: 'lg', cols: 3 },
                { maxWidth: 'md', cols: 2 },
                { maxWidth: 'sm', cols: 1 },
              ]}
            >
              {searchResults.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </SimpleGrid>
          )}
        </>
      ) : (
        <>
          <Box>
            <Title order={3} mb="md">
              All Games
            </Title>
            <SimpleGrid
              cols={4}
              spacing="lg"
              breakpoints={[
                { maxWidth: 'lg', cols: 3 },
                { maxWidth: 'md', cols: 2 },
                { maxWidth: 'sm', cols: 1 },
              ]}
            >
              {displayedGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </SimpleGrid>
            {visibleGames < games.length && (
              <Button
                onClick={handleLoadMore}
                fullWidth
                mt="xl"
                variant="outline"
              >
                Load More Games
              </Button>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default GameLibrary;
