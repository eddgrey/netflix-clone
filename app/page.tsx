import Category from "@/components/Category";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import data from "@/data/videos.json";

type Video = {
  id: string;
  imageUrl: string;
};

enum Size {
  small = "small",
  medium = "medium",
  large = "large",
}

async function getVideos() {
  const videos = data.items.map(
    (video) =>
      ({
        id: video.id.videoId,
        imageUrl: video.snippet.thumbnails.medium.url,
      } as Video)
  );

  return videos;
}

export default async function Home() {
  const videos = await getVideos();
  return (
    <main>
      <Navbar />
      <Hero />
      <section className="px-8 md:px-12 lg:px-16 mt-16 mb-32 space-y-16">
        <Category title="Películas" size={Size.large} videos={videos} />
        <Category title="Películas" size={Size.medium} videos={videos} />
        <Category title="Películas" size={Size.small} videos={videos} />
      </section>
    </main>
  );
}
