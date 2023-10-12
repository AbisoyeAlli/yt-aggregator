import axios from "axios";

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
const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/videos";

const fetchTrendingVideos = async (
  regionCode: string,
  videoCategoryId: string,
  maxResults: number
): Promise<YouTubeVideo[]> => {
  try {
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode,
        videoCategoryId,
        maxResults,
        key: apiKey,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    throw error;
  }
};

export default fetchTrendingVideos;
