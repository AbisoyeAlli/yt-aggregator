import axios from "axios";

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

const fetchTrendingVideos = async (
  regionCode: string,
  videoCategoryId: string,
  maxResults: any
) => {
  const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/videos?regionCode=${regionCode}`;

  try {
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
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
