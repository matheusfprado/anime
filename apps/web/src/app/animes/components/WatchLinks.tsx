const STREAMING_LINKS: Record<
  string,
  { name: string; url: string; logo: string }[]
> = {
  Naruto: [
    {
      name: "Crunchyroll",
      url: "https://www.crunchyroll.com/pt-br/series/GY9PJ5KWR/naruto",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuYqvon-yjtpL4ZJEK4n2vrVyiBjcBlTWWNMr7MdmZJzAWOqPEoerIp-jeGAC85qRxJCU&usqp=CAU",
    },
    {
      name: "Netflix",
      url: "https://www.netflix.com/br/title/70205012",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Netflix-new-icon.png/250px-Netflix-new-icon.png",
    },
  ],
  "One Piece": [
    {
      name: "Crunchyroll",
      url: "https://www.crunchyroll.com/pt-br/series/GRMG8ZQZR/one-piece",
      logo: "/logos/crunchyroll.png",
    },
  ],
  "Attack on Titan": [
    {
      name: "Crunchyroll",
      url: "https://www.crunchyroll.com/pt-br/series/GR751KNZY/attack-on-titan",
      logo: "/logos/crunchyroll.png",
    },
    {
      name: "Netflix",
      url: "https://www.netflix.com/br/title/81074479",
      logo: "/logos/netflix.png",
    },
  ],
  "Demon Slayer": [
    {
      name: "Crunchyroll",
      url: "https://www.crunchyroll.com/pt-br/series/GY5P48XEY/demon-slayer-kimetsu-no-yaiba",
      logo: "/logos/crunchyroll.png",
    },
  ],
};

export function WatchLinks({ title }: { title: string }) {
  const links = STREAMING_LINKS[title] || [];

  if (links.length === 0) return null;

  return (
    <section>
      <h2 className="text-3xl font-extrabold text-yellow-300 mb-5 flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-yellow-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-6 0l-4.553 2.276A1 1 0 013 15.382V8.618a1 1 0 011.447-.894L9 10m6 0L9 14"
          />
        </svg>
        Onde Assistir
      </h2>

      <div className="flex flex-wrap gap-5">
        {links.map((stream) => (
          <a
            key={stream.url}
            href={stream.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-zinc-900/70 border border-white/10 hover:border-yellow-400/50 rounded-xl px-4 py-3 transition-all hover:shadow-[0_0_15px_rgba(255,200,0,0.3)]"
          >
            <img
              src={stream.logo}
              alt={stream.name}
              className="h-6 w-auto object-contain"
            />
            <span className="text-sm text-zinc-200 font-medium">
              {stream.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
