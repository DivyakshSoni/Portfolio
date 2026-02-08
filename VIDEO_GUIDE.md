# How to Add Your Video to the Home Page

## Location
Your video will appear on the **right side** of the Hero section, next to "Complexity Into Clarity" text.

## Option 1: Local Video File (Recommended)

1. **Create a videos folder** in the `public` directory:
   ```
   public/videos/
   ```

2. **Add your video file** to that folder:
   - Example: `public/videos/intro-video.mp4`
   - Recommended format: MP4 (H.264 codec)
   - Keep file size under 50MB for faster loading

3. **Open** `src/components/Overlay.jsx` and find the Hero section (around line 84-130)

4. **Uncomment and update** the video tag:
   ```jsx
   <video
       src="/videos/your-video.mp4"  // Change to your video filename
       poster="/videos/your-poster.jpg"  // Optional: add a thumbnail image
       autoPlay
       loop
       muted
       playsInline
       controls
       style={{
           width: '100%',
           height: '100%',
           objectFit: 'cover'
       }}
   >
       Your browser does not support the video tag.
   </video>
   ```

5. **Remove the placeholder div** (the gray box that says "Add your video here")

## Option 2: YouTube Embed

1. **Get your YouTube video ID** from the URL:
   - Example: `https://www.youtube.com/watch?v=ABC123xyz` → ID is `ABC123xyz`

2. **In Overlay.jsx**, comment out the `<video>` tag and uncomment the `<iframe>`:
   ```jsx
   <iframe
       src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=YOUR_VIDEO_ID"
       style={{
           position: 'absolute',
           top: 0,
           left: 0,
           width: '100%',
           height: '100%',
           border: 'none'
       }}
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
       allowFullScreen
   />
   ```

3. **Replace** `YOUR_VIDEO_ID` with your actual YouTube video ID

## Option 3: Vimeo Embed

1. **Get your Vimeo video ID** from the URL:
   - Example: `https://vimeo.com/123456789` → ID is `123456789`

2. **Use this iframe**:
   ```jsx
   <iframe
       src="https://player.vimeo.com/video/YOUR_VIDEO_ID?autoplay=1&muted=1&loop=1"
       style={{
           position: 'absolute',
           top: 0,
           left: 0,
           width: '100%',
           height: '100%',
           border: 'none'
       }}
       allow="autoplay; fullscreen; picture-in-picture"
       allowFullScreen
   />
   ```

## Video Recommendations

- **Aspect Ratio**: 16:9 works best (will auto-fit)
- **Duration**: Keep it under 2 minutes for hero section
- **Content**: Intro video, project demo, or personal introduction
- **Format**: MP4 for local files
- **Size**: Compress videos to reduce file size

## Current Setup

The video container is already styled and positioned on the right side of the hero section. You just need to:
1. Add your video file or embed code
2. Remove the placeholder div
3. Test it!

The video will automatically:
- Auto-play (muted)
- Loop continuously
- Show controls for user interaction
- Be responsive on all screen sizes
