"use client";
import { useEffect, useRef } from "react";

type G = any; // eslint-disable-line @typescript-eslint/no-explicit-any

const cityList = [
  { lat: 40.7,  lon: -74.0  },
  { lat: 51.5,  lon: -0.1   },
  { lat: 12.9,  lon: 77.6,  label: "BANGALORE", highlight: true },
  { lat: 35.7,  lon: 139.7  },
  { lat: -33.9, lon: 151.2  },
  { lat: 25.2,  lon: 55.3   },
  { lat: 1.3,   lon: 103.8  },
  { lat: 19.1,  lon: 72.9   },
  { lat: 52.5,  lon: 13.4   },
  { lat: 43.7,  lon: -79.4  },
  { lat: 39.9,  lon: 116.4  },
  { lat: 30.0,  lon: 31.2   },
  { lat: 50.1,  lon: 8.7    },
  { lat: 37.6,  lon: 126.9  },
  { lat: -23.5, lon: -46.6  },
  { lat: 55.8,  lon: 37.6   },
];

const connPairs = [
  [2,1],[2,5],[2,7],[2,6],[2,10],[2,3],
  [1,0],[1,8],[1,12],[1,15],[1,11],
  [0,9],[3,13],[4,6],[5,11],[10,13],
];

export default function WorldMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const gc: CanvasRenderingContext2D = ctx;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animId = 0;
    let frame = 0;

    Promise.all([
      import("d3-geo"),
      import("topojson-client"),
      fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(r => r.json()),
    ]).then(([d3geo, topo, world]: [G, G, G]) => {
      const W = canvas.width;
      const H = canvas.height;

      const projection = d3geo.geoNaturalEarth1()
        .scale(W / 6.5)
        .translate([W / 2, H / 2]);

      const pathGen = d3geo.geoPath(projection, gc);
      const graticuleGen = d3geo.geoGraticule()();
      const land = topo.feature(world, world.objects.land);
      const borders = topo.mesh(world, world.objects.countries, (a: G, b: G) => a !== b);
      const countries = topo.feature(world, world.objects.countries);

      const cities = cityList.map(city => ({
        ...city,
        pingR: Math.random() * 22,
        pingA: Math.random() * 0.45,
        ping2R: Math.random() * 35,
        ping2A: Math.random() * 0.25,
      }));

      const conns = connPairs.map(([f, t]) => ({
        from: f, to: t,
        progress: Math.random(),
        speed: 0.001 + Math.random() * 0.0018,
      }));

      function proj(lon: number, lat: number): [number, number] {
        return projection([lon, lat]) ?? [0, 0];
      }


      function draw() {
        gc.clearRect(0, 0, W, H);
        frame++;

        // Graticule
        gc.beginPath();
        pathGen(graticuleGen);
        gc.strokeStyle = "rgba(0,200,255,0.05)";
        gc.lineWidth = 0.4;
        gc.stroke();

        // Land fill
        gc.beginPath();
        pathGen(land);
        gc.fillStyle = "rgba(0,200,255,0.06)";
        gc.fill();

        // Glowing coastlines — draw twice for glow effect
        gc.beginPath();
        pathGen(countries);
        gc.strokeStyle = "rgba(0,220,255,0.12)";
        gc.lineWidth = 2.5;
        gc.shadowBlur = 6;
        gc.shadowColor = "rgba(0,220,255,0.4)";
        gc.stroke();
        gc.shadowBlur = 0;

        gc.beginPath();
        pathGen(countries);
        gc.strokeStyle = "rgba(0,220,255,0.38)";
        gc.lineWidth = 0.75;
        gc.stroke();

        // Internal borders
        gc.beginPath();
        pathGen(borders);
        gc.strokeStyle = "rgba(0,200,255,0.1)";
        gc.lineWidth = 0.35;
        gc.stroke();

        // Straight dashed connection lines
        gc.setLineDash([3, 5]);
        gc.lineWidth = 0.6;
        conns.forEach(({ from, to }) => {
          const [x1, y1] = proj(cities[from].lon, cities[from].lat);
          const [x2, y2] = proj(cities[to].lon, cities[to].lat);
          gc.beginPath();
          gc.moveTo(x1, y1);
          gc.lineTo(x2, y2);
          gc.strokeStyle = "rgba(0,200,255,0.08)";
          gc.stroke();
        });
        gc.setLineDash([]);

        // Traveling dots along straight lines
        conns.forEach(conn => {
          const [x1, y1] = proj(cities[conn.from].lon, cities[conn.from].lat);
          const [x2, y2] = proj(cities[conn.to].lon, cities[conn.to].lat);
          const tx = x1 + (x2 - x1) * conn.progress;
          const ty = y1 + (y2 - y1) * conn.progress;
          gc.beginPath();
          gc.arc(tx, ty, 1.8, 0, Math.PI * 2);
          gc.fillStyle = "rgba(0,229,255,0.95)";
          gc.shadowBlur = 10;
          gc.shadowColor = "rgba(0,229,255,0.9)";
          gc.fill();
          gc.shadowBlur = 0;
          conn.progress += conn.speed;
          if (conn.progress > 1) conn.progress = 0;
        });

        // City nodes
        cities.forEach(city => {
          const [x, y] = proj(city.lon, city.lat);
          const hl = (city as G).highlight;
          const mc = hl ? "rgba(0,255,136," : "rgba(0,200,255,";

          // Outer slow pulse (highlight only)
          if (hl) {
            if (city.ping2A > 0) {
              gc.beginPath();
              gc.arc(x, y, city.ping2R, 0, Math.PI * 2);
              gc.strokeStyle = `rgba(0,255,136,${city.ping2A.toFixed(2)})`;
              gc.lineWidth = 0.6;
              gc.stroke();
              city.ping2R += 0.3;
              city.ping2A -= 0.003;
            } else {
              city.ping2R = 0;
              city.ping2A = 0.3;
            }
          }

          // Inner pulse ring
          if (city.pingA > 0) {
            gc.beginPath();
            gc.arc(x, y, city.pingR, 0, Math.PI * 2);
            gc.strokeStyle = `${mc}${city.pingA.toFixed(2)})`;
            gc.lineWidth = hl ? 1.2 : 0.7;
            gc.stroke();
            city.pingR += 0.45;
            city.pingA -= 0.006;
          } else {
            city.pingR = 0;
            city.pingA = hl ? 0.8 : 0.5;
          }

          // Static ring
          gc.beginPath();
          gc.arc(x, y, hl ? 9 : 4.5, 0, Math.PI * 2);
          gc.strokeStyle = `${mc}0.3)`;
          gc.lineWidth = hl ? 1 : 0.7;
          gc.stroke();

          // Center dot with glow
          gc.beginPath();
          gc.arc(x, y, hl ? 4.5 : 2.5, 0, Math.PI * 2);
          gc.fillStyle = hl ? "rgba(0,255,136,1)" : "rgba(0,200,255,0.9)";
          gc.shadowBlur = hl ? 18 : 8;
          gc.shadowColor = hl ? "rgba(0,255,136,1)" : "rgba(0,200,255,0.8)";
          gc.fill();
          gc.shadowBlur = 0;

          // Label
          if ((city as G).label) {
            gc.font = "bold 8px JetBrains Mono, monospace";
            gc.fillStyle = "rgba(0,255,136,1)";
            gc.shadowBlur = 6;
            gc.shadowColor = "rgba(0,255,136,0.8)";
            gc.fillText((city as G).label, x + 12, y - 8);
            gc.shadowBlur = 0;
          }
        });

        animId = requestAnimationFrame(draw);
      }

      draw();
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.65, mixBlendMode: "screen" }}
    />
  );
}
