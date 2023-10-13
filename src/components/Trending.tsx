// src/components/TrendingVideos.tsx
import React, { useState, useEffect } from "react";
import fetchTrendingVideos from "../utils/YoutubeApi";
import Countries from "./Countries";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const TrendingVideos: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("GB");
  const [maxResults, setMaxResults] = useState(10);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoCategoryId = "0";

        const trendingVideos = await fetchTrendingVideos(
          selectedCountry,
          videoCategoryId,
          maxResults
        );
        setVideos(trendingVideos);
      } catch (error) {
        // Handle error
      }
    };

    fetchVideos();
  }, [selectedCountry, maxResults]);

  const handleCountryChange = (event: any) => {
    setSelectedCountry(event.target.value);
  };

  const handleMaxResultsChange = (event: any) => {
    setMaxResults(event.target.value);
  };

  const openVideoLink = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  return (
    <div>
      <div style={{ padding: "2rem" }}>
        <Typography variant="h3" align="center" gutterBottom={true}>
          Top {maxResults} Trending Videos in {selectedCountry}
        </Typography>
        <div style={{ marginBottom: "1rem" }}>
          <Countries
            selectedCountry={selectedCountry}
            maxResults={maxResults}
            onCountryChange={handleCountryChange}
            onMaxResultsChange={handleMaxResultsChange}
          />
        </div>
        <Grid container spacing={3}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={3} key={video.id}>
              <Card sx={{ maxHeight: 600 }}>
                <CardMedia
                  component="img"
                  alt="Video Thumbnail"
                  height="250"
                  image={video.snippet.thumbnails.default.url}
                />
                <CardContent>
                  <Typography variant="h6" noWrap={true}>
                    {video.snippet.title}
                  </Typography>
                  <Typography variant="subtitle2" noWrap={true}>
                    {video.snippet.description}
                  </Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => openVideoLink(video.id)}
                >
                  Open Video
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default TrendingVideos;
