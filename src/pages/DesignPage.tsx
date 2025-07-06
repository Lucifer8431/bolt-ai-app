import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Plus,
  Search,
  Grid,
  List,
  Download,
  Share,
  Heart,
  Eye,
  Copy,
  Layers,
  Type,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";

export function DesignPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const designAssets = [
    {
      id: 1,
      title: "Landing Page Hero",
      type: "Component",
      category: "Web",
      thumbnail: "/api/placeholder/300/200",
      likes: 24,
      views: 156,
      tags: ["Hero", "Landing", "Gradient"],
      created: "2 days ago",
    },
    {
      id: 2,
      title: "Mobile App Dashboard",
      type: "Template",
      category: "Mobile",
      thumbnail: "/api/placeholder/300/200",
      likes: 42,
      views: 289,
      tags: ["Dashboard", "Mobile", "Clean"],
      created: "1 week ago",
    },
    {
      id: 3,
      title: "Logo Collection",
      type: "Assets",
      category: "Branding",
      thumbnail: "/api/placeholder/300/200",
      likes: 18,
      views: 97,
      tags: ["Logo", "Brand", "Modern"],
      created: "3 days ago",
    },
    {
      id: 4,
      title: "Icon Set",
      type: "Icons",
      category: "UI",
      thumbnail: "/api/placeholder/300/200",
      likes: 67,
      views: 423,
      tags: ["Icons", "UI", "Minimal"],
      created: "5 days ago",
    },
  ];

  const designTools = [
    {
      name: "Color Palette Generator",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Typography Pairing",
      icon: Type,
      color: "from-blue-500 to-cyan-500",
    },
    { name: "Layout Grid", icon: Grid, color: "from-purple-500 to-indigo-500" },
    {
      name: "Image Generator",
      icon: ImageIcon,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const categories = [
    "All",
    "Web",
    "Mobile",
    "Branding",
    "UI",
    "Illustrations",
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Design System</h1>
          <p className="text-gray-400 mt-1">
            Create and manage your design assets with AI assistance
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Design</span>
        </motion.button>
      </div>

      {/* Design Tools */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
          AI Design Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {designTools.map((tool, index) => (
            <motion.button
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg border border-purple-500/30 hover:border-purple-500/50 transition-all duration-200 group text-left hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(168, 85, 247, 0.8))",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
              >
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">
                {tool.name}
              </h3>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search designs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-2">
          {/* Categories */}
          <div className="flex items-center space-x-1 bg-gray-800 border border-gray-700 rounded-lg p-1">
            {categories.slice(0, 4).map((category) => (
              <button
                key={category}
                className="px-3 py-1 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* View Mode */}
          <div className="flex items-center space-x-1 bg-gray-800 border border-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "list"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Design Assets */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {designAssets.map((asset, index) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-200 group cursor-pointer ${
              viewMode === "list"
                ? "flex items-center space-x-4 p-4"
                : "overflow-hidden"
            }`}
          >
            {/* Thumbnail */}
            <div
              className={`bg-gray-700 ${viewMode === "list" ? "w-20 h-20 rounded-lg flex-shrink-0" : "aspect-video"} flex items-center justify-center`}
            >
              <Layers className="w-8 h-8 text-gray-500" />
            </div>

            {/* Content */}
            <div className={viewMode === "list" ? "flex-1" : "p-4"}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {asset.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-purple-400">
                      {asset.type}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-400">
                      {asset.category}
                    </span>
                  </div>
                </div>

                {viewMode === "grid" && (
                  <button className="p-1 hover:bg-gray-700 rounded transition-colors opacity-0 group-hover:opacity-100">
                    <Heart className="w-4 h-4 text-gray-400 hover:text-red-400" />
                  </button>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {asset.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{asset.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{asset.views}</span>
                  </div>
                  <span>{asset.created}</span>
                </div>

                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded transition-colors">
                    <Copy className="w-3 h-3 text-gray-400" />
                  </button>
                  <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded transition-colors">
                    <Download className="w-3 h-3 text-gray-400" />
                  </button>
                  <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded transition-colors">
                    <Share className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Design Assistant */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-6 border border-purple-500/20"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
            AI Design Assistant
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
            <h3 className="font-medium text-white mb-2">
              Generate Color Palette
            </h3>
            <p className="text-sm text-gray-300 mb-3">
              Create harmonious color schemes based on your brand
            </p>
            <button className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors">
              Generate
            </button>
          </div>

          <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
            <h3 className="font-medium text-white mb-2">Create Component</h3>
            <p className="text-sm text-gray-300 mb-3">
              Design custom UI components with AI assistance
            </p>
            <button className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors">
              Create
            </button>
          </div>

          <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
            <h3 className="font-medium text-white mb-2">Design Review</h3>
            <p className="text-sm text-gray-300 mb-3">
              Get AI feedback on your design choices
            </p>
            <button className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors">
              Review
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
