import type { IconName } from "@/components/Icon";
import type { ContentType } from "./platforms";

export type Tool = {
  slug: string;
  name: string;
  kind: ContentType;
  summary: string;
};

export type PlatformDetail = {
  /** Two or three sentences shown under the page title. */
  intro: string;
  /** Example link formats the platform uses. */
  examples: string[];
  /** Where to find the share link inside this platform's app. */
  steps: [string, string, string];
  faqs: { q: string; a: string }[];
  /** Content types that SocialMediaFetch returns today. Empty until the platform is live. */
  available: ContentType[];
  tools: Tool[];
};

export const details: Record<string, PlatformDetail> = {
  instagram: {
    intro:
      "Paste a link to a public Instagram Reel, photo, or carousel post. SocialMediaFetch reads the post through Meta's official oEmbed service and shows the thumbnail, caption, and creator details.",
    examples: [
      "https://www.instagram.com/reel/C1a2B3c4D5e/",
      "https://www.instagram.com/p/C1a2B3c4D5e/",
      "https://instagr.am/p/C1a2B3c4D5e/",
    ],
    steps: [
      "Open the Reel or post in the Instagram app or on instagram.com.",
      "Tap the paper-plane (Share) icon, then Copy link. On desktop, copy the address bar.",
      "Paste the link above and press Fetch.",
    ],
    faqs: [
      { q: "Can I fetch Instagram Stories or Highlights?", a: "Not yet. Stories disappear after 24 hours and need a signed-in session, so they aren't available through Meta's public embed data." },
      { q: "Why can't I fetch a post from a private account?", a: "Private posts are only visible to approved followers. SocialMediaFetch never signs in to accounts, so it can only see what anyone on the web can see." },
      { q: "Does it work with carousel posts?", a: "Yes. Carousel links are accepted. Meta's embed data returns the cover image and caption for the post." },
    ],
    available: ["thumbnail", "caption", "metadata"],
    tools: [
      { slug: "instagram-reels-downloader", name: "Instagram Reels Downloader", kind: "video", summary: "Fetch public Reels with their cover image, caption, and creator." },
      { slug: "instagram-photo-downloader", name: "Instagram Photo Downloader", kind: "image", summary: "Save the image from a public Instagram photo post." },
      { slug: "instagram-carousel-downloader", name: "Instagram Carousel Downloader", kind: "image", summary: "Get the cover and details of multi-image carousel posts." },
      { slug: "instagram-thumbnail-downloader", name: "Instagram Thumbnail Downloader", kind: "thumbnail", summary: "Grab the cover image of any public Reel or video post." },
      { slug: "instagram-caption-copier", name: "Instagram Caption Copier", kind: "caption", summary: "Copy the full caption and hashtags from a public post." },
    ],
  },
  tiktok: {
    intro:
      "Paste a public TikTok video link to get its cover image, caption, and creator details. Data comes from TikTok's official oEmbed endpoint, so only content TikTok allows to be embedded is returned.",
    examples: [
      "https://www.tiktok.com/@creator/video/7301234567890123456",
      "https://vm.tiktok.com/ZM8abcDEF/",
    ],
    steps: [
      "Open the video in the TikTok app or on tiktok.com.",
      "Tap Share (the arrow icon), then Copy link.",
      "Paste the link above and press Fetch.",
    ],
    faqs: [
      { q: "Can I download TikTok videos without the watermark?", a: "No. SocialMediaFetch only returns what TikTok's official embed data provides: the cover image, caption, and creator details." },
      { q: "Do short vm.tiktok.com links work?", a: "Yes. Short share links from the app are accepted alongside full tiktok.com links." },
      { q: "Why does it say the video wasn't found?", a: "The video may be private, removed, or limited to certain regions. Only public videos that TikTok allows to be embedded can be fetched." },
    ],
    available: ["thumbnail", "caption", "metadata"],
    tools: [
      { slug: "tiktok-video-downloader", name: "TikTok Video Downloader", kind: "video", summary: "Fetch details and the cover image of any public TikTok video." },
      { slug: "tiktok-thumbnail-downloader", name: "TikTok Thumbnail Downloader", kind: "thumbnail", summary: "Save the cover image of a public TikTok in one click." },
      { slug: "tiktok-caption-copier", name: "TikTok Caption Copier", kind: "caption", summary: "Copy a TikTok's caption and hashtags without retyping." },
    ],
  },
  youtube: {
    intro:
      "Paste any YouTube video, Shorts, or live link to get every thumbnail size, the video title, and channel details. YouTube's terms don't allow video downloads without permission, so video files aren't offered.",
    examples: [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://youtu.be/dQw4w9WgXcQ",
      "https://www.youtube.com/shorts/dQw4w9WgXcQ",
    ],
    steps: [
      "Open the video or Short on YouTube.",
      "Tap Share, then Copy link. On desktop, copy the address bar.",
      "Paste the link above and press Fetch.",
    ],
    faqs: [
      { q: "Which thumbnail sizes are available?", a: "Up to five: max resolution (1280×720), standard (640×480), high (480×360), medium (320×180), and default (120×90). Max resolution only exists for HD uploads." },
      { q: "Can I download the YouTube video itself?", a: "No. YouTube's terms of service don't permit downloading videos without the owner's permission. Use YouTube Premium for offline viewing." },
      { q: "Does it work with Shorts and live streams?", a: "Yes. Shorts, live, embed, and youtu.be links all work, as long as the video is public or unlisted." },
    ],
    available: ["thumbnail", "metadata"],
    tools: [
      { slug: "youtube-thumbnail-downloader", name: "YouTube Thumbnail Downloader", kind: "thumbnail", summary: "Every thumbnail size, from 1280×720 down, for any video." },
      { slug: "youtube-shorts-thumbnail-downloader", name: "YouTube Shorts Thumbnail Downloader", kind: "thumbnail", summary: "Grab the cover image of any YouTube Short." },
      { slug: "youtube-video-info", name: "YouTube Video Info", kind: "metadata", summary: "Look up a video's title, channel, and video ID from its link." },
    ],
  },
  facebook: {
    intro:
      "Paste a link to a public Facebook video, Reel, or photo post. Post details come from Meta's official oEmbed service, which returns the post's embed data and author.",
    examples: [
      "https://www.facebook.com/watch/?v=1234567890",
      "https://www.facebook.com/reel/1234567890",
      "https://fb.watch/abcDEF123/",
    ],
    steps: [
      "Open the video, Reel, or post on Facebook.",
      "Tap Share, then Copy link. On desktop, click the post's timestamp and copy the address bar.",
      "Paste the link above and press Fetch.",
    ],
    faqs: [
      { q: "Can I fetch posts from private profiles or groups?", a: "No. Only posts shared publicly can be read. Posts limited to friends or private groups aren't visible to SocialMediaFetch." },
      { q: "Do fb.watch links work?", a: "Yes. fb.watch short links and full facebook.com links are both accepted." },
      { q: "Why is Facebook marked as not connected?", a: "Meta requires an approved developer app for its oEmbed service. Once the site owner connects one, Facebook links work automatically." },
    ],
    available: ["thumbnail", "metadata"],
    tools: [
      { slug: "facebook-video-downloader", name: "Facebook Video Downloader", kind: "video", summary: "Fetch details from public Facebook video posts." },
      { slug: "facebook-reels-downloader", name: "Facebook Reels Downloader", kind: "video", summary: "Get details and covers of public Facebook Reels." },
      { slug: "facebook-photo-downloader", name: "Facebook Photo Downloader", kind: "image", summary: "Look up public Facebook photo posts and their author." },
    ],
  },
  "x-twitter": {
    intro:
      "Paste a public post link from X (formerly Twitter) to read its full text and author. Data comes from X's official publish.twitter.com oEmbed service.",
    examples: [
      "https://x.com/user/status/1234567890123456789",
      "https://twitter.com/user/status/1234567890123456789",
    ],
    steps: [
      "Open the post on X.",
      "Tap Share (the arrow icon), then Copy link.",
      "Paste the link above and press Fetch.",
    ],
    faqs: [
      { q: "Do old twitter.com links still work?", a: "Yes. Both x.com and twitter.com links are accepted." },
      { q: "Can I get videos and GIFs from X posts?", a: "Not yet. X's public embed data includes the post text and author but not media files. Media support is planned." },
      { q: "Why does a post show as restricted?", a: "Posts from protected accounts, or posts that were deleted, can't be read publicly." },
    ],
    available: ["caption", "metadata"],
    tools: [
      { slug: "x-video-downloader", name: "X Video Downloader", kind: "video", summary: "Fetch details from public X posts with video." },
      { slug: "x-gif-downloader", name: "X GIF Downloader", kind: "gif", summary: "Look up public X posts that contain GIFs." },
      { slug: "x-post-text-copier", name: "X Post Text Copier", kind: "caption", summary: "Copy the full text of any public post on X." },
    ],
  },
  pinterest: {
    intro:
      "Pinterest support is coming in Phase 1. You'll be able to paste a public Pin link to save image Pins, video Pins, and their thumbnails. Links are already recognised.",
    examples: ["https://www.pinterest.com/pin/123456789012345678/", "https://pin.it/abcDEF123"],
    steps: [
      "Open the Pin on Pinterest.",
      "Tap the share icon, then Copy link.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [
      { q: "When will Pinterest be available?", a: "Pinterest is part of the Phase 1 launch list and is next in line after the platforms already live." },
      { q: "Will board downloads be supported?", a: "The first version will handle single Pins. Boards may follow later." },
    ],
    available: [],
    tools: [
      { slug: "pinterest-image-downloader", name: "Pinterest Image Downloader", kind: "image", summary: "Save public image Pins in their original size." },
      { slug: "pinterest-video-downloader", name: "Pinterest Video Downloader", kind: "video", summary: "Fetch public video Pins and their covers." },
    ],
  },
  reddit: {
    intro:
      "Paste a public Reddit post link to get its title, author, and subreddit. Data comes from Reddit's official oEmbed endpoint.",
    examples: [
      "https://www.reddit.com/r/pics/comments/abc123/post_title/",
      "https://redd.it/abc123",
    ],
    steps: [
      "Open the post on Reddit.",
      "Tap Share, then Copy link.",
      "Paste the link above and press Fetch.",
    ],
    faqs: [
      { q: "Can I fetch posts from private or quarantined subreddits?", a: "No. Only posts that anyone can view without signing in can be fetched." },
      { q: "Will Reddit videos and galleries be supported?", a: "Yes, they're planned. Today SocialMediaFetch returns post details from Reddit's embed data." },
      { q: "Do share links like reddit.com/r/…/s/… work?", a: "Full post links work best. If a share link fails, open it in your browser first and copy the full address." },
    ],
    available: ["metadata"],
    tools: [
      { slug: "reddit-video-downloader", name: "Reddit Video Downloader", kind: "video", summary: "Fetch details from public Reddit video posts." },
      { slug: "reddit-image-downloader", name: "Reddit Image Downloader", kind: "image", summary: "Look up public Reddit image posts." },
      { slug: "reddit-gif-downloader", name: "Reddit GIF Downloader", kind: "gif", summary: "Look up public Reddit GIF posts." },
    ],
  },
  threads: {
    intro:
      "Threads support is planned for Phase 2. You'll be able to read public Threads posts, including their text, images, and videos. Links are already recognised.",
    examples: ["https://www.threads.net/@user/post/C1a2B3c4D5e"],
    steps: [
      "Open the post in Threads.",
      "Tap the share icon, then Copy link.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [
      { q: "Why isn't Threads available yet?", a: "Threads' embed data needs an approved Meta app. It's planned for Phase 2." },
    ],
    available: [],
    tools: [
      { slug: "threads-video-downloader", name: "Threads Video Downloader", kind: "video", summary: "Fetch public Threads posts with video." },
      { slug: "threads-photo-downloader", name: "Threads Photo Downloader", kind: "image", summary: "Save images from public Threads posts." },
    ],
  },
  linkedin: {
    intro:
      "LinkedIn support is planned for Phase 2: public post information and media that the author has made available. Links are already recognised.",
    examples: ["https://www.linkedin.com/posts/user_activity-1234567890123456789-abcd", "https://lnkd.in/abcDEF"],
    steps: [
      "Open the post on LinkedIn.",
      "Click the three dots (…) on the post, then Copy link to post.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [
      { q: "Will it work with posts only visible to connections?", a: "No. Only posts set to public (Anyone) can be read." },
    ],
    available: [],
    tools: [
      { slug: "linkedin-video-downloader", name: "LinkedIn Video Downloader", kind: "video", summary: "Fetch public LinkedIn video posts." },
      { slug: "linkedin-image-downloader", name: "LinkedIn Image Downloader", kind: "image", summary: "Save images from public LinkedIn posts." },
    ],
  },
  snapchat: {
    intro:
      "Snapchat support is planned for Phase 2, covering public Spotlight videos where Snapchat allows access. Links are already recognised.",
    examples: ["https://www.snapchat.com/spotlight/W7_EDlXWTBiXAEEniNoMPwAA"],
    steps: [
      "Open the Spotlight video in Snapchat.",
      "Tap Share, then Copy link.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [
      { q: "Can I save private Snaps or Stories?", a: "No. Private Snaps and friends-only Stories are never accessible. Only public Spotlight content is planned." },
    ],
    available: [],
    tools: [
      { slug: "snapchat-spotlight-downloader", name: "Snapchat Spotlight Downloader", kind: "video", summary: "Fetch public Spotlight videos where accessible." },
    ],
  },
  vimeo: {
    intro:
      "Paste a public Vimeo video link to get its thumbnail, title, duration, upload date, and creator. Data comes from Vimeo's official oEmbed API.",
    examples: ["https://vimeo.com/76979871", "https://player.vimeo.com/video/76979871"],
    steps: [
      "Open the video on Vimeo.",
      "Click Share, then copy the link. Or copy the address bar.",
      "Paste the link above and press Fetch.",
    ],
    faqs: [
      { q: "Can I download Vimeo videos?", a: "Only when the owner allows it. Vimeo shows a Download button on the video page when downloads are enabled. Direct file links need the owner's permission through Vimeo's API." },
      { q: "Does it work with private or password-protected videos?", a: "No. Only public videos can be read." },
      { q: "What details do I get?", a: "Title, creator, duration, upload date, and the video's thumbnail." },
    ],
    available: ["thumbnail", "metadata"],
    tools: [
      { slug: "vimeo-thumbnail-downloader", name: "Vimeo Thumbnail Downloader", kind: "thumbnail", summary: "Save the thumbnail of any public Vimeo video." },
      { slug: "vimeo-video-info", name: "Vimeo Video Info", kind: "metadata", summary: "Look up a Vimeo video's title, duration, and upload date." },
    ],
  },
  dailymotion: {
    intro:
      "Paste a public Dailymotion video link to get its thumbnail, title, and channel. Data comes from Dailymotion's official oEmbed service.",
    examples: ["https://www.dailymotion.com/video/x8abcd1", "https://dai.ly/x8abcd1"],
    steps: [
      "Open the video on Dailymotion.",
      "Click Share, then Copy link.",
      "Paste the link above and press Fetch.",
    ],
    faqs: [
      { q: "Do dai.ly short links work?", a: "Yes. Both dai.ly and dailymotion.com links are accepted." },
      { q: "Can I download the video file?", a: "No. Dailymotion's public data includes the thumbnail and details, not the video file." },
    ],
    available: ["thumbnail", "metadata"],
    tools: [
      { slug: "dailymotion-thumbnail-downloader", name: "Dailymotion Thumbnail Downloader", kind: "thumbnail", summary: "Save the thumbnail of any public Dailymotion video." },
      { slug: "dailymotion-video-info", name: "Dailymotion Video Info", kind: "metadata", summary: "Look up a Dailymotion video's title and channel." },
    ],
  },
  twitch: {
    intro:
      "Twitch support is planned for Phase 2: clip and VOD information, thumbnails, and downloads where the streamer allows them. Links are already recognised.",
    examples: ["https://www.twitch.tv/streamer/clip/AbcDefGhi", "https://clips.twitch.tv/AbcDefGhi", "https://www.twitch.tv/videos/1234567890"],
    steps: [
      "Open the clip or VOD on Twitch.",
      "Click Share, then Copy link.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [
      { q: "Will subscriber-only VODs work?", a: "No. Only content that anyone can watch without subscribing will be supported." },
    ],
    available: [],
    tools: [
      { slug: "twitch-clip-downloader", name: "Twitch Clip Downloader", kind: "video", summary: "Fetch public Twitch clips and their thumbnails." },
      { slug: "twitch-vod-info", name: "Twitch VOD Info", kind: "metadata", summary: "Look up details of past broadcasts." },
    ],
  },
  soundcloud: {
    intro:
      "Paste a public SoundCloud track or playlist link to get its artwork, title, and artist. Data comes from SoundCloud's official oEmbed service.",
    examples: ["https://soundcloud.com/artist/track-name", "https://on.soundcloud.com/abcDEF"],
    steps: [
      "Open the track on SoundCloud.",
      "Tap Share, then Copy link.",
      "Paste the link above and press Fetch.",
    ],
    faqs: [
      { q: "Can I download the audio?", a: "Only when the artist allows it. SoundCloud shows a Download option on tracks where the artist has enabled it." },
      { q: "Do playlists and albums work?", a: "Yes. Playlist links return the playlist's artwork and details." },
    ],
    available: ["thumbnail", "metadata"],
    tools: [
      { slug: "soundcloud-artwork-downloader", name: "SoundCloud Artwork Downloader", kind: "thumbnail", summary: "Save the cover art of any public track or playlist." },
      { slug: "soundcloud-track-info", name: "SoundCloud Track Info", kind: "metadata", summary: "Look up a track's title and artist from its link." },
    ],
  },
  tumblr: {
    intro:
      "Paste a public Tumblr post link to get its details and author. Data comes from Tumblr's official oEmbed service.",
    examples: ["https://www.tumblr.com/blogname/123456789012/post-title", "https://blogname.tumblr.com/post/123456789012"],
    steps: [
      "Open the post on Tumblr.",
      "Tap the share (paper plane) icon, then Copy link.",
      "Paste the link above and press Fetch.",
    ],
    faqs: [
      { q: "Will photos, GIFs, and videos be available?", a: "They're planned. Today, Tumblr's embed data returns the post details and author." },
      { q: "Do blog subdomain links work?", a: "Yes. Both tumblr.com/blogname and blogname.tumblr.com links are accepted." },
    ],
    available: ["metadata"],
    tools: [
      { slug: "tumblr-image-downloader", name: "Tumblr Image Downloader", kind: "image", summary: "Look up public Tumblr photo posts." },
      { slug: "tumblr-gif-downloader", name: "Tumblr GIF Downloader", kind: "gif", summary: "Look up public Tumblr GIF posts." },
      { slug: "tumblr-video-downloader", name: "Tumblr Video Downloader", kind: "video", summary: "Look up public Tumblr video posts." },
    ],
  },
  telegram: {
    intro:
      "Telegram support is planned for Phase 2: posts and media from public channels. Private chats and groups are never accessible. Links are already recognised.",
    examples: ["https://t.me/channelname/1234"],
    steps: [
      "Open the post in a public Telegram channel.",
      "Long-press the post (or right-click on desktop), then Copy Post Link.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [
      { q: "Can I fetch from private groups or chats?", a: "No. Only posts in public channels have shareable public links." },
    ],
    available: [],
    tools: [
      { slug: "telegram-video-downloader", name: "Telegram Video Downloader", kind: "video", summary: "Fetch videos from public Telegram channel posts." },
      { slug: "telegram-image-downloader", name: "Telegram Image Downloader", kind: "image", summary: "Save images from public Telegram channel posts." },
    ],
  },
  bluesky: {
    intro:
      "Paste a public Bluesky post link to read its full text and author. Data comes from Bluesky's official embed service.",
    examples: ["https://bsky.app/profile/user.bsky.social/post/3kabcdefghi2x"],
    steps: [
      "Open the post on Bluesky.",
      "Tap the share icon, then Copy link to post.",
      "Paste the link above and press Fetch.",
    ],
    faqs: [
      { q: "Will images and videos be supported?", a: "Yes, they're planned. Today the post text and author are returned." },
      { q: "Do custom-domain handles work?", a: "Yes. Any bsky.app post link works, whatever the author's handle." },
    ],
    available: ["caption", "metadata"],
    tools: [
      { slug: "bluesky-post-text-copier", name: "Bluesky Post Text Copier", kind: "caption", summary: "Copy the full text of any public Bluesky post." },
      { slug: "bluesky-image-downloader", name: "Bluesky Image Downloader", kind: "image", summary: "Look up public Bluesky posts with images." },
      { slug: "bluesky-video-downloader", name: "Bluesky Video Downloader", kind: "video", summary: "Look up public Bluesky posts with video." },
    ],
  },
  mastodon: {
    intro:
      "Mastodon support is planned for Phase 3: public posts and attachments from any instance. Links from popular instances, and any link shaped like /@user/123, are already recognised.",
    examples: ["https://mastodon.social/@user/112233445566778899"],
    steps: [
      "Open the post on its Mastodon instance.",
      "Click the three dots (…), then Copy link to post.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [
      { q: "Will every Mastodon instance work?", a: "The plan is to support any instance that serves public posts." },
    ],
    available: [],
    tools: [
      { slug: "mastodon-media-downloader", name: "Mastodon Media Downloader", kind: "image", summary: "Save images and attachments from public posts." },
    ],
  },
  flickr: {
    intro:
      "Paste a public Flickr photo link to download the photo in a large size, with its title and photographer. Data comes from Flickr's official oEmbed service.",
    examples: ["https://www.flickr.com/photos/username/12345678901/", "https://flic.kr/p/2abcDEF"],
    steps: [
      "Open the photo on Flickr.",
      "Click the share arrow, then copy the link.",
      "Paste the link above and press Fetch.",
    ],
    faqs: [
      { q: "Can I use the photos I download?", a: "Check the photo's licence on Flickr. Many photos are all-rights-reserved; others use Creative Commons licences with conditions." },
      { q: "What size will I get?", a: "The large size that Flickr makes available through its embed data, usually up to 1024 pixels wide." },
    ],
    available: ["image", "metadata"],
    tools: [
      { slug: "flickr-photo-downloader", name: "Flickr Photo Downloader", kind: "image", summary: "Download public Flickr photos in a large size." },
      { slug: "flickr-photo-info", name: "Flickr Photo Info", kind: "metadata", summary: "Look up a photo's title and photographer." },
    ],
  },
  imgur: {
    intro:
      "Imgur support is planned for Phase 2: public images, GIFs, and albums. Links are already recognised.",
    examples: ["https://imgur.com/gallery/abcDEF1", "https://imgur.com/abcDEF1"],
    steps: [
      "Open the image or album on Imgur.",
      "Click Share, then Copy link.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [
      { q: "Will whole albums download at once?", a: "Album support is planned alongside single images." },
    ],
    available: [],
    tools: [
      { slug: "imgur-image-downloader", name: "Imgur Image Downloader", kind: "image", summary: "Save public Imgur images in full size." },
      { slug: "imgur-gif-downloader", name: "Imgur GIF Downloader", kind: "gif", summary: "Save public Imgur GIFs." },
    ],
  },
  bilibili: {
    intro:
      "Bilibili support is planned for Phase 3: public video information, covers, and supported downloads. Links are already recognised.",
    examples: ["https://www.bilibili.com/video/BV1xx411c7mD", "https://b23.tv/abcDEF"],
    steps: [
      "Open the video on Bilibili.",
      "Tap Share, then Copy link.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [{ q: "Will region-locked videos work?", a: "No. Only videos publicly available in your region will be supported." }],
    available: [],
    tools: [
      { slug: "bilibili-cover-downloader", name: "Bilibili Cover Downloader", kind: "thumbnail", summary: "Save the cover image of public Bilibili videos." },
    ],
  },
  likee: {
    intro: "Likee support is planned for Phase 3: public short-video links where accessible. Links are already recognised.",
    examples: ["https://likee.video/@user/video/1234567890"],
    steps: [
      "Open the video in Likee.",
      "Tap Share, then Copy link.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [{ q: "When will Likee be supported?", a: "Likee is on the Phase 3 list, after Phase 1 and 2 platforms." }],
    available: [],
    tools: [{ slug: "likee-video-downloader", name: "Likee Video Downloader", kind: "video", summary: "Fetch public Likee short videos where accessible." }],
  },
  kwai: {
    intro: "Kwai support is planned for Phase 3: public short videos where accessible. Links are already recognised.",
    examples: ["https://www.kwai.com/@user/video/1234567890"],
    steps: [
      "Open the video in Kwai.",
      "Tap Share, then Copy link.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [{ q: "When will Kwai be supported?", a: "Kwai is on the Phase 3 list, after Phase 1 and 2 platforms." }],
    available: [],
    tools: [{ slug: "kwai-video-downloader", name: "Kwai Video Downloader", kind: "video", summary: "Fetch public Kwai short videos where accessible." }],
  },
  douyin: {
    intro: "Douyin support is planned for Phase 3: public short-video links where accessible. Links are already recognised.",
    examples: ["https://www.douyin.com/video/7301234567890123456", "https://v.douyin.com/abcDEF/"],
    steps: [
      "Open the video in Douyin.",
      "Tap Share, then Copy link.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [{ q: "Is Douyin the same as TikTok?", a: "They're sister apps from the same company, but separate platforms with separate content. Douyin serves mainland China." }],
    available: [],
    tools: [{ slug: "douyin-video-downloader", name: "Douyin Video Downloader", kind: "video", summary: "Fetch public Douyin short videos where accessible." }],
  },
  weibo: {
    intro: "Weibo support is planned for Phase 3: public posts, images, and video information. Links are already recognised.",
    examples: ["https://weibo.com/1234567890/AbCdEfGhI"],
    steps: [
      "Open the post on Weibo.",
      "Tap the share icon, then Copy link.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [{ q: "Will posts that need sign-in work?", a: "No. Only posts visible without signing in will be supported." }],
    available: [],
    tools: [{ slug: "weibo-image-downloader", name: "Weibo Image Downloader", kind: "image", summary: "Save images from public Weibo posts." }],
  },
  vk: {
    intro: "VK support is planned for Phase 3: public posts, photos, and videos. Links are already recognised.",
    examples: ["https://vk.com/wall-12345678_1234", "https://vkvideo.ru/video-12345678_456239017"],
    steps: [
      "Open the post or video on VK.",
      "Click Share, then Copy link.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [{ q: "Will closed communities work?", a: "No. Only public posts and videos will be supported." }],
    available: [],
    tools: [
      { slug: "vk-video-downloader", name: "VK Video Downloader", kind: "video", summary: "Fetch public VK videos." },
      { slug: "vk-photo-downloader", name: "VK Photo Downloader", kind: "image", summary: "Save photos from public VK posts." },
    ],
  },
  lemon8: {
    intro: "Lemon8 support is planned for Phase 3: public lifestyle posts and images where accessible. Links are already recognised.",
    examples: ["https://www.lemon8-app.com/@user/1234567890123456789"],
    steps: [
      "Open the post in Lemon8.",
      "Tap Share, then Copy link.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [{ q: "When will Lemon8 be supported?", a: "Lemon8 is on the Phase 3 list, after Phase 1 and 2 platforms." }],
    available: [],
    tools: [{ slug: "lemon8-image-downloader", name: "Lemon8 Image Downloader", kind: "image", summary: "Save images from public Lemon8 posts." }],
  },
  kick: {
    intro: "Kick support is planned for Phase 3: public stream and clip information where supported. Links are already recognised.",
    examples: ["https://kick.com/streamer/clips/clip_01ABCDEF", "https://kick.com/streamer"],
    steps: [
      "Open the clip or channel on Kick.",
      "Click Share, then copy the link.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [{ q: "Will live streams be downloadable?", a: "No. The plan covers clip and stream information, not recording live streams." }],
    available: [],
    tools: [{ slug: "kick-clip-downloader", name: "Kick Clip Downloader", kind: "video", summary: "Fetch public Kick clips and their details." }],
  },
  rumble: {
    intro: "Rumble support is planned for Phase 3: public video information and downloads the creator allows. Links are already recognised.",
    examples: ["https://rumble.com/v4abcde-video-title.html"],
    steps: [
      "Open the video on Rumble.",
      "Click Share, then copy the link.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [{ q: "When will Rumble be supported?", a: "Rumble is on the Phase 3 list, after Phase 1 and 2 platforms." }],
    available: [],
    tools: [{ slug: "rumble-video-downloader", name: "Rumble Video Downloader", kind: "video", summary: "Fetch public Rumble video details and thumbnails." }],
  },
  odysee: {
    intro: "Odysee support is planned for Phase 3: public video information and available media. Links are already recognised.",
    examples: ["https://odysee.com/@channel:a/video-title:b"],
    steps: [
      "Open the video on Odysee.",
      "Click Share, then copy the link.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [{ q: "When will Odysee be supported?", a: "Odysee is on the Phase 3 list, after Phase 1 and 2 platforms." }],
    available: [],
    tools: [{ slug: "odysee-video-downloader", name: "Odysee Video Downloader", kind: "video", summary: "Fetch public Odysee video details and media." }],
  },
  peertube: {
    intro:
      "PeerTube support is planned for Phase 3: public videos from supported instances. Links from known instances, and any /w/ or /videos/watch/ link, are already recognised.",
    examples: ["https://framatube.org/w/abcDEFghiJKLmnoPQRstu1"],
    steps: [
      "Open the video on its PeerTube instance.",
      "Click Share, then copy the URL.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [{ q: "Will every PeerTube instance work?", a: "The plan is to support instances that allow public access to their videos." }],
    available: [],
    tools: [{ slug: "peertube-video-downloader", name: "PeerTube Video Downloader", kind: "video", summary: "Fetch public PeerTube videos where the instance allows." }],
  },
  streamable: {
    intro:
      "Paste a public Streamable link to get the video's thumbnail and title. Data comes from Streamable's official oEmbed service.",
    examples: ["https://streamable.com/abc123"],
    steps: [
      "Open the video on Streamable.",
      "Copy the link from the address bar or the Share button.",
      "Paste the link above and press Fetch.",
    ],
    faqs: [
      { q: "Can I download the video file?", a: "Not yet. Streamable's public embed data includes the thumbnail and title." },
    ],
    available: ["thumbnail", "metadata"],
    tools: [
      { slug: "streamable-thumbnail-downloader", name: "Streamable Thumbnail Downloader", kind: "thumbnail", summary: "Save the thumbnail of any public Streamable video." },
    ],
  },
  bandcamp: {
    intro:
      "Bandcamp support is planned for Phase 3: album and track information, artwork, and links to the downloads the artist sells or gives away. Links are already recognised.",
    examples: ["https://artist.bandcamp.com/album/album-name", "https://artist.bandcamp.com/track/track-name"],
    steps: [
      "Open the album or track on Bandcamp.",
      "Click Share / Embed, then copy the link. Or copy the address bar.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [{ q: "Will paid music be downloadable?", a: "No. Bandcamp artists sell their music directly. Buy it on Bandcamp to download it and support the artist." }],
    available: [],
    tools: [{ slug: "bandcamp-artwork-downloader", name: "Bandcamp Artwork Downloader", kind: "thumbnail", summary: "Save album and track artwork from Bandcamp." }],
  },
  mixcloud: {
    intro:
      "Paste a public Mixcloud show link to get its artwork, title, and creator. Data comes from Mixcloud's official oEmbed service.",
    examples: ["https://www.mixcloud.com/creator/show-name/"],
    steps: [
      "Open the show on Mixcloud.",
      "Click Share, then copy the link.",
      "Paste the link above and press Fetch.",
    ],
    faqs: [
      { q: "Can I download the mix?", a: "No. Mixcloud's licensing doesn't allow downloads of shows. You'll get the artwork and details." },
    ],
    available: ["thumbnail", "metadata"],
    tools: [
      { slug: "mixcloud-artwork-downloader", name: "Mixcloud Artwork Downloader", kind: "thumbnail", summary: "Save the cover art of any public Mixcloud show." },
      { slug: "mixcloud-show-info", name: "Mixcloud Show Info", kind: "metadata", summary: "Look up a show's title and creator from its link." },
    ],
  },
  audiomack: {
    intro:
      "Audiomack support is planned for Phase 3: track information, artwork, and downloads the artist allows. Links are already recognised.",
    examples: ["https://audiomack.com/artist/song/track-name"],
    steps: [
      "Open the track on Audiomack.",
      "Tap Share, then Copy link.",
      "Paste the link above. We'll detect it and tell you when fetching is live.",
    ],
    faqs: [{ q: "When will Audiomack be supported?", a: "Audiomack is on the Phase 3 list, after Phase 1 and 2 platforms." }],
    available: [],
    tools: [{ slug: "audiomack-artwork-downloader", name: "Audiomack Artwork Downloader", kind: "thumbnail", summary: "Save track and album artwork from Audiomack." }],
  },
};

export function getDetail(slug: string): PlatformDetail {
  const d = details[slug];
  if (!d) throw new Error(`Missing details for platform "${slug}"`);
  return d;
}

export const allTools = Object.entries(details).flatMap(([platform, d]) =>
  d.tools.map((t) => ({ ...t, platform })),
);

export function getTool(slug: string) {
  return allTools.find((t) => t.slug === slug);
}

export const kindIcon: Record<ContentType, IconName> = {
  video: "play",
  audio: "headphones",
  image: "image",
  gif: "zap",
  thumbnail: "image",
  caption: "type",
  metadata: "layers",
};

