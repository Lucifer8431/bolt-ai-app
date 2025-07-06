import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Star,
  Users,
  Calendar,
  GitBranch,
  Code,
  Globe,
  Smartphone,
  Database,
} from "lucide-react";

export function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const projects = [
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Full-stack React application with payment integration",
      status: "in-progress",
      type: "web",
      progress: 75,
      team: ["Alex Chen", "Sarah Design"],
      lastUpdate: "2 hours ago",
      technologies: ["React", "Node.js", "MongoDB"],
      starred: true,
    },
    {
      id: 2,
      name: "Mobile Banking App",
      description: "Secure mobile application for banking services",
      status: "planning",
      type: "mobile",
      progress: 25,
      team: ["Dr. Research", "Tina Tester"],
      lastUpdate: "1 day ago",
      technologies: ["React Native", "Firebase"],
      starred: false,
    },
    {
      id: 3,
      name: "AI Analytics Dashboard",
      description: "Real-time analytics dashboard with AI insights",
      status: "completed",
      type: "web",
      progress: 100,
      team: ["Alex Chen", "Mike Manager"],
      lastUpdate: "3 days ago",
      technologies: ["Vue.js", "Python", "TensorFlow"],
      starred: true,
    },
    {
      id: 4,
      name: "API Gateway Service",
      description: "Microservices API gateway with authentication",
      status: "in-progress",
      type: "backend",
      progress: 60,
      team: ["Alex Chen"],
      lastUpdate: "5 hours ago",
      technologies: ["Node.js", "Docker", "Redis"],
      starred: false,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-yellow-500";
      case "in-progress":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "on-hold":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "web":
        return Globe;
      case "mobile":
        return Smartphone;
      case "backend":
        return Database;
      default:
        return Code;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "web":
        return "from-blue-500 to-cyan-500";
      case "mobile":
        return "from-purple-500 to-pink-500";
      case "backend":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 mt-1">
            Manage your development projects and collaborate with AI agents
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </motion.button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg text-sm"
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>

          <button className="p-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors">
            <Filter className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Projects Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="text-2xl font-bold text-white">{projects.length}</div>
          <div className="text-gray-400 text-sm">Total Projects</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="text-2xl font-bold text-blue-400">
            {projects.filter((p) => p.status === "in-progress").length}
          </div>
          <div className="text-gray-400 text-sm">In Progress</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="text-2xl font-bold text-green-400">
            {projects.filter((p) => p.status === "completed").length}
          </div>
          <div className="text-gray-400 text-sm">Completed</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400">
            {projects.filter((p) => p.status === "planning").length}
          </div>
          <div className="text-gray-400 text-sm">Planning</div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => {
          const TypeIcon = getTypeIcon(project.type);
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 group cursor-pointer"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${getTypeColor(project.type)} rounded-lg flex items-center justify-center`}
                  >
                    <TypeIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {project.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div
                        className={`w-2 h-2 ${getStatusColor(project.status)} rounded-full`}
                      />
                      <span className="text-sm text-gray-400 capitalize">
                        {project.status.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  {project.starred && (
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  )}
                  <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Project Description */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm font-medium text-white">
                    {project.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`bg-gradient-to-r ${getTypeColor(project.type)} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-md">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Project Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {project.team.length} members
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {project.lastUpdate}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No projects found
          </h3>
          <p className="text-gray-400 mb-6">
            {searchQuery || filterStatus !== "all"
              ? "Try adjusting your search or filters"
              : "Create your first project to get started"}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center space-x-2 mx-auto transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Project</span>
          </motion.button>
        </div>
      )}
    </div>
  );
}
