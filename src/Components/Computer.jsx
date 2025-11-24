import React, { useEffect, useState } from "react";
import TerminalOutput from "./TerminalOutput";

const info = [
  "PS C:\\WINDOWS\\system32> computer",
  "faris@FARIS_PC",
  "---------------------",
  "OS: Windows 11 Pro (25H2) x86_64",
  "Kernel: WIN32_NT 10.0.26200.7171",
  'Display (M27Q): 2560x1440 in 32", 170 Hz [External]',
  'Display (ASUS VP247): 1920x1080 in 24", 60 Hz [External]',
  "CPU: AMD Ryzen 7 5800X3D (16) @ 3.40 GHz",
  "GPU: AMD Radeon RX 6700 XT",
  "Memory: 15.92 GiB / 15.92 GiB",
  "Local IP: 192.168.1.67/24",
  "Terminal: Windows Console 10.0.26100.7019",
];

const getIsMobile = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
};

const Computer = () => {
  const [isMobile, setIsMobile] = useState(getIsMobile());
  useEffect(() => {
    const handler = () => setIsMobile(getIsMobile());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const lines = isMobile
    ? info
    : (() => {
        const logo = [
          "/////////////////  /////////////////",
          "/////////////////  /////////////////",
          "/////////////////  /////////////////",
          "/////////////////  /////////////////",
          "/////////////////  /////////////////",
          "/////////////////  /////////////////",
          "/////////////////  /////////////////",
          "/////////////////  /////////////////",
          "                                    ",
          "/////////////////  /////////////////",
          "/////////////////  /////////////////",
          "/////////////////  /////////////////",
          "/////////////////  /////////////////",
          "/////////////////  /////////////////",
          "/////////////////  /////////////////",
          "/////////////////  /////////////////",
          "/////////////////  /////////////////",
        ];
        const paddedInfo = [...info];
        while (paddedInfo.length < logo.length) paddedInfo.push("");
        // Use a clear delimiter so TerminalOutput can split left (logo) and right (info)
        return logo.map((l, i) => l + "|||" + paddedInfo[i]);
      })();

  return (
    <section className="padding terminal" id="computer">
      <div style={{ maxWidth: 900, margin: "2rem auto", padding: "1rem" }}>
        <TerminalOutput
          sectionId="computer"
          lines={lines}
          promptLabel="computer"
          speed={6}
          preserveWhitespace={true}
        />
      </div>
    </section>
  );
};

export default Computer;
