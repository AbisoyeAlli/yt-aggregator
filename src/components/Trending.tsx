// src/components/TrendingVideos.tsx
import React, { useState, useEffect } from "react";
import fetchTrendingVideos from "../utils/YoutubeApi";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}

const TrendingVideos: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const regionCode = "GB";
        const videoCategoryId = "0";
        const maxResults = 12;

        const trendingVideos = await fetchTrendingVideos(
          regionCode,
          videoCategoryId,
          maxResults
        );
        setVideos(trendingVideos);
      } catch (error) {
        // Handle error
      }
    };

    fetchVideos();
  }, []);

  const openVideoLink = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  return (
    <div>
      <div style={{ padding: "2rem" }}>
        <Typography variant="h3" align="center" gutterBottom={true}>
          Top 12 Trending Videos in the UK
        </Typography>
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
