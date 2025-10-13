// hooks/useFileView.js
import { useState } from "react";

export function useFileView() {
  const [activeView, setActiveView] = useState("my-zone");
  const [viewMode, setViewMode] = useState("grid");

  const viewTitle = {
    "my-zone": "Zone của tôi",
    shared: "Được chia sẻ với tôi",
    recent: "Gần đây",
    starred: "Đánh dấu sao",
    trash: "Thùng rác",
  }[activeView];

  return {
    activeView,
    setActiveView,
    viewMode,
    setViewMode,
    viewTitle,
  };
}
