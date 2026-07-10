"use client";
import { useEffect, useRef } from "react";

const continents = [
  [[-125,48],[-95,49],[-70,47],[-65,44],[-75,35],[-80,25],[-88,16],[-95,16],[-110,23],[-117,32],[-125,37],[-125,48]],
  [[-88,16],[-83,10],[-78,8],[-77,9],[-80,8],[-85,11],[-88,16]],
  [[-80,10],[-62,10],[-50,3],[-35,-5],[-35,-8],[-40,-20],[-50,-30],[-65,-35],[-68,-55],[-74,-52],[-75,-40],[-80,-30],[-80,-5],[-75,0],[-80,10]],
  [[-10,36],[5,36],[10,38],[15,38],[28,41],[30,45],[28,60],[20,60],[15,58],[10,55],[8,58],[5,57],[0,51],[-5,48],[-10,44],[-10,36]],
  [[5,57],[8,58],[5,62],[10,63],[15,68],[20,68],[28,70],[30,68],[25,60],[20,58],[15,58],[10,55],[8,58],[5,57]],
  [[-18,15],[-15,10],[-10,5],[0,5],[10,5],[15,0],[20,-5],[25,-10],[30,-20],[32,-30],[30,-35],[25,-34],[18,-34],[15,-22],[10,-10],[5,-5],[0,5],[-5,5],[-10,5],[-15,5],[-18,10],[-18,15]],
  [[28,41],[30,45],[35,42],[40,38],[45,42],[55,42],[60,55],[70,55],[80,55],[90,55],[95,52],[105,50],[110,50],[120,53],[125,50],[130,45],[135,35],[130,32],[125,25],[120,20],[110,15],[105,10],[100,5],[100,1],[95,5],[90,20],[85,25],[80,30],[75,35],[70,22],[65,22],[60,22],[55,22],[50,25],[45,30],[40,30],[35,30],[32,30],[35,28],[32,22],[28,22],[28,30],[26,35],[28,41]],
  [[130,30],[132,33],[135,35],[137,38],[140,40],[141,42],[140,43],[138,40],[135,35],[132,33],[130,30]],
  [[100,5],[103,1],[105,2],[110,5],[115,5],[120,0],[125,2],[128,-3],[120,-5],[115,-8],[110,-8],[105,-7],[100,-5],[95,0],[95,5],[100,5]],
  [[115,-22],[120,-18],[125,-15],[130,-12],[138,-15],[140,-18],[145,-18],[150,-22],[152,-26],[150,-38],[145,-38],[138,-35],[130,-32],[120,-30],[115,-28],[115,-22]],
];

const cityList = [
  { lat: 40.7,  lon: -74.0,  label: "" },
  { lat: 51.5,  lon: -0.1,   label: "" },
  { lat: 12.9,  lon: 77.6,   label: "BANGALORE", highlight: true },
  { lat: 35.7,  lon: 139.7,  label: "" },
  { lat: -33.9, lon: 151.2,  label: "" },
  { lat: 25.2,  lon: 55.3,   label: "" },
  { lat: 1.3,   lon: 103.8,  label: "" },
  { lat: 19.1,  lon: 72.9,   label: "" },
  { lat: 52.5,  lon: 13.4,   label: "" },
  { lat: 43.7,  lon: -79.4,  label: "" },
  { lat: 39.9,  lon: 116.4,  label: "" },
  { lat: 30.0,  lon: 31.2,   label: "" },
  { lat: 50.1,  lon: 8.7,    label: "" },
  { lat: 37.6,  lon: 126.9,  label: "" },
  { lat: 22.3,  lon: 114.2,  label: "" },
  { lat: -23.5, lon: -46.6,  label: "" },
  { lat: 55.8,  lon: 37.6,   label: "" },
];

const connPairs = [
  [2,1],[2,5],[2,7],[2,6],[2,10],[2,3],
  [1,0],[1,8],[1,12],[1,16],[1,11],
  [0,9],[3,13],[4,6],[5,6],[5,11],[10,13],
];

export default function WorldMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function project(lon: number, lat: number) {
      return {
        x: ((lon + 180) / 360) * canvas!.width,
        y: ((90 - lat) / 180) * canvas!.height,
      };
    }

    const cities = cityList.map(c => ({
      ...c,
      pingR: Math.random() * 25,
      pingA: Math.random() * 0.4,
    }));

    const conns = connPairs.map(([f, t]) => ({
      from: f, to: t,
      progress: Math.random(),
      speed: 0.0015 + Math.random() * 0.002,
    }));

    let animId = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = "rgba(0,200,255,0.04)";
      ctx.lineWidth = 0.5;
      for (let lat = -60; lat <= 90; lat += 30) {
        const { y } = project(0, lat);
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
      for (let lon = -180; lon <= 180; lon += 30) {
        const { x } = project(lon, 0);
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }

      // Continents fill
      continents.forEach(pts => {
        ctx.beginPath();
        pts.forEach(([lon, lat], i) => {
          const { x, y } = project(lon, lat);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fillStyle = "rgba(0,200,255,0.04)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0,200,255,0.2)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Connection base lines
      ctx.setLineDash([3, 5]);
      ctx.lineWidth = 0.6;
      conns.forEach(conn => {
        const f = cities[conn.from];
        const t = cities[conn.to];
        const p1 = project(f.lon, f.lat);
        const p2 = project(t.lon, t.lat);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = "rgba(0,200,255,0.07)";
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Animated travel dots
      conns.forEach(conn => {
        const f = cities[conn.from];
        const t = cities[conn.to];
        const p1 = project(f.lon, f.lat);
        const p2 = project(t.lon, t.lat);
        const tx = p1.x + (p2.x - p1.x) * conn.progress;
        const ty = p1.y + (p2.y - p1.y) * conn.progress;

        ctx.beginPath();
        ctx.arc(tx, ty, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,229,255,0.85)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(0,229,255,0.9)";
        ctx.fill();
        ctx.shadowBlur = 0;

        conn.progress += conn.speed;
        if (conn.progress > 1) conn.progress = 0;
      });

      // City nodes
      cities.forEach(city => {
        const { x, y } = project(city.lon, city.lat);
        const hl = city.highlight;
        const mainColor = hl ? "rgba(0,255,136," : "rgba(0,200,255,";

        // Pulsing ring
        if (city.pingA > 0) {
          ctx.beginPath();
          ctx.arc(x, y, city.pingR, 0, Math.PI * 2);
          ctx.strokeStyle = `${mainColor}${city.pingA.toFixed(2)})`;
          ctx.lineWidth = hl ? 1.2 : 0.8;
          ctx.stroke();
          city.pingR += 0.5;
          city.pingA -= 0.005;
        } else {
          city.pingR = 0;
          city.pingA = hl ? 0.7 : 0.45;
        }

        // Static ring
        ctx.beginPath();
        ctx.arc(x, y, hl ? 9 : 5, 0, Math.PI * 2);
        ctx.strokeStyle = `${mainColor}0.25)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(x, y, hl ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = hl ? "rgba(0,255,136,1)" : "rgba(0,200,255,0.85)";
        ctx.shadowBlur = hl ? 14 : 8;
        ctx.shadowColor = hl ? "rgba(0,255,136,0.9)" : "rgba(0,200,255,0.7)";
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        if (city.label) {
          ctx.font = "bold 8px JetBrains Mono, monospace";
          ctx.fillStyle = "rgba(0,255,136,0.95)";
          ctx.fillText(city.label, x + 10, y - 6);
        }
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

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
      style={{ opacity: 0.55, mixBlendMode: "screen" }}
    />
  );
}
