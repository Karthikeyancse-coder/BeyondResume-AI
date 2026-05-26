"use client";

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts";
import { useThemeStore } from "@/store/useThemeStore";

interface CapabilityData {
  subject: string;
  value: number;
  fullMark: number;
}

interface CapabilityRadarProps {
  data: CapabilityData[];
}

export default function CapabilityRadar({ data }: CapabilityRadarProps) {
  const { theme } = useThemeStore();
  
  // Custom colors for light/dark theme contrast in charts
  const axisColor = theme === "dark" ? "#5C617A" : "#7B7FA8";
  const gridColor = theme === "dark" ? "#2D3460" : "#DDE1F5";
  const fillColor = "#4F46E5";
  const strokeColor = "#06B6D4";

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke={gridColor} />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: axisColor, fontSize: 12, fontWeight: 500 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={false} 
            axisLine={false} 
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-default)",
              borderRadius: "8px",
              color: "var(--text-primary)",
              boxShadow: "var(--shadow-md)"
            }}
          />
          <Radar
            name="Capability"
            dataKey="value"
            stroke={strokeColor}
            fill={fillColor}
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
