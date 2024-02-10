"use client";
import { useEffect, useState } from "react";
// import fetch from "isomorphic-unfetch";

interface Gif {
  id: string;
  title: string;
  images: {
    downsized: {
      url: string;
    };
    fixed_height: {
      url: string;
    };
  };
}

export default function Home() {
  const [term, setTerm] = useState<string>("");
  const [gif, setGif] = useState<Gif[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa&q=${term}`
    );
    const data = await response.json();
    setGif(data.data);
    console.log(data.data);
  };

  const openLightbox = (index: number) => {
    setIsOpen(true);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    // setSelectedImage("");
  };

  const nextImage = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % gif.length);
  };
  const prevImage = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + gif.length) % gif.length);
  };

  return (
    <main className="">
      <form className="p-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
        />
        <button className="border" type="submit">
          Search
        </button>
      </form>

      <div className="flex flex-wrap">
        {gif.map((gif, index) => (
          <div key={gif.id} className="w-1/5 p-4 h-1/5">
            <div className="w-40 h-40 border">
              <h2 className="text-xs">{gif.title}</h2>
              <img
                className="w-40 h-40"
                src={gif.images.downsized.url}
                alt={gif.title}
                onClick={() => openLightbox(index)}
              />
            </div>
          </div>
        ))}
        {isOpen && gif.length > 0 && gif[selectedIndex] && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <button className="text-white p-4" onClick={prevImage}>
              Prev
            </button>
            <img src={gif[selectedIndex].images.fixed_height.url} />
            <button className="text-white p-4" onClick={nextImage}>
              Next
            </button>
            <button className="text-white" onClick={closeLightbox}>
              Close
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
