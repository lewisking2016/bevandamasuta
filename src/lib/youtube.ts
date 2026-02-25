// YouTube Data API v3 utility
// Channel: https://youtube.com/@bevandamasuta

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_HANDLE = "bevandamasuta";

export interface YouTubeVideo {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    publishedAt: string;
    duration?: string;
}

// Step 1: Get Channel ID from handle
async function getChannelId(): Promise<string | null> {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=id,contentDetails&forHandle=${CHANNEL_HANDLE}&key=${YOUTUBE_API_KEY}`,
        { next: { revalidate: 3600 } } // Revalidate every hour
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.items?.[0]?.id ?? null;
}

// Step 2: Get uploads playlist ID from channel
async function getUploadsPlaylistId(channelId: string): Promise<string | null> {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`,
        { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null;
}

// Step 3: Fetch all videos from the uploads playlist
async function getPlaylistVideos(playlistId: string): Promise<YouTubeVideo[]> {
    const videos: YouTubeVideo[] = [];
    let pageToken = "";

    do {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${YOUTUBE_API_KEY}${pageToken ? `&pageToken=${pageToken}` : ""}`;
        const res = await fetch(url, { next: { revalidate: 3600 } });
        if (!res.ok) break;

        const data = await res.json();
        for (const item of data.items ?? []) {
            const snippet = item.snippet;
            if (snippet.resourceId?.videoId) {
                videos.push({
                    id: snippet.resourceId.videoId,
                    title: snippet.title,
                    description: snippet.description,
                    thumbnail:
                        snippet.thumbnails?.maxres?.url ||
                        snippet.thumbnails?.high?.url ||
                        snippet.thumbnails?.medium?.url ||
                        "",
                    publishedAt: snippet.publishedAt,
                });
            }
        }
        pageToken = data.nextPageToken ?? "";
    } while (pageToken);

    // Sort newest first
    videos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return videos;
}

// Main export: fetch all channel videos
export async function getChannelVideos(): Promise<{ videos: YouTubeVideo[]; error?: string }> {
    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === "YOUR_API_KEY_HERE") {
        return { videos: [], error: "YouTube API key not configured." };
    }

    try {
        const channelId = await getChannelId();
        if (!channelId) return { videos: [], error: "Channel not found." };

        const uploadsId = await getUploadsPlaylistId(channelId);
        if (!uploadsId) return { videos: [], error: "Could not retrieve uploads playlist." };

        const videos = await getPlaylistVideos(uploadsId);
        return { videos };
    } catch (e) {
        console.error("YouTube API error:", e);
        return { videos: [], error: "Failed to load videos." };
    }
}

export function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
