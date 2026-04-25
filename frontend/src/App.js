import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);

  const [storyInputs, setStoryInputs] = useState({});
  const [taskInputs, setTaskInputs] = useState({});
  const [editInputs, setEditInputs] = useState({});

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchProjects = () => {
    axios.get("http://localhost:5000/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  };

  const fetchUsers = () => {
    axios.get("http://localhost:5000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  // ✅ Create User (NEW)
  const addUser = () => {
    if (!userName) {
      alert("Enter user name");
      return;
    }

    axios.post("http://localhost:5000/users", {
      name: userName,
      email: userName + "@test.com"
    }).then(() => {
      setUserName("");
      fetchUsers();
    }).catch(err => console.error(err));
  };

  // Create Project
  const addProject = () => {
    if (!name) {
      alert("Enter project name");
      return;
    }

    axios.post("http://localhost:5000/projects", {
      name,
      description: desc
    }).then(() => {
      setName("");
      setDesc("");
      fetchProjects();
    });
  };

  // Create Story
  const addStory = (projectId) => {
    const data = storyInputs[projectId];

    if (!data || !data.title || !data.userId) {
      alert("Please enter story and select user");
      return;
    }

    axios.post("http://localhost:5000/stories", {
      title: data.title,
      description: "Story desc",
      status: "In Progress",
      ProjectId: projectId,
      UserId: data.userId
    }).then(() => {
      setStoryInputs({ ...storyInputs, [projectId]: {} });
      fetchProjects();
    });
  };

  // Create Task
  const addTask = (storyId) => {
    if (!taskInputs[storyId]) {
      alert("Enter task");
      return;
    }

    axios.post("http://localhost:5000/tasks", {
      title: taskInputs[storyId],
      description: "Task desc",
      status: "Todo",
      UserStoryId: storyId
    }).then(() => {
      setTaskInputs({ ...taskInputs, [storyId]: "" });
      fetchProjects();
    });
  };

  // Delete Project
  const deleteProject = (id) => {
    axios.delete(`http://localhost:5000/projects/${id}`)
      .then(() => fetchProjects())
      .catch(err => console.error(err));
  };

  // Update Project
  const updateProject = (id) => {
    if (!editInputs[id]) {
      alert("Enter new name");
      return;
    }

    axios.put(`http://localhost:5000/projects/${id}`, {
      name: editInputs[id]
    })
      .then(() => {
        setEditInputs({ ...editInputs, [id]: "" });
        fetchProjects();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h1> Agile Project Manager </h1>



      {/* Create Project */}
      <div className="form">
        <input
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={addProject}>Add Project</button>
      </div>

      {/* USER SECTION (NEW) */}
      <h3 style={{ textAlign: "center" }}>👥 Manage Team</h3>
      <div className="form">
        <input
          placeholder="Enter User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>
      {/* Projects */}
      <div className="projects">
        {projects.length === 0 ? (
          <p>No projects found</p>
        ) : (
          projects.map((p) => (
            <div key={p.id} className="card">

              <h2>{p.name}</h2>
              <p>{p.description}</p>

              {/* Update */}
              <input
                placeholder="Update Project Name"
                value={editInputs[p.id] || ""}
                onChange={(e) =>
                  setEditInputs({ ...editInputs, [p.id]: e.target.value })
                }
              />

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => updateProject(p.id)}>Update</button>
                <button onClick={() => deleteProject(p.id)}>Delete</button>
              </div>

              {/* Add Story */}
              <div className="inline-group">
                <input
                  placeholder="New Story"
                  value={storyInputs[p.id]?.title || ""}
                  onChange={(e) =>
                    setStoryInputs({
                      ...storyInputs,
                      [p.id]: {
                        ...storyInputs[p.id],
                        title: e.target.value
                      }
                    })
                  }
                />

                <select
                  value={storyInputs[p.id]?.userId || ""}
                  onChange={(e) =>
                    setStoryInputs({
                      ...storyInputs,
                      [p.id]: {
                        ...storyInputs[p.id],
                        userId: e.target.value
                      }
                    })
                  }
                >
                  <option value="">Select User</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>

                <button onClick={() => addStory(p.id)}>Add Story</button>
              </div>

              {/* Stories */}
              {p.UserStories?.map((s) => (
                <div key={s.id} className="story">
                  <h4>{s.title}</h4>
                  <p>Status: {s.status}</p>
                  <p>Assigned to: {s.User?.name || "Not assigned"}</p>

                  {/* Add Task */}
                  <div className="inline-group">
                    <input
                      placeholder="New Task"
                      value={taskInputs[s.id] || ""}
                      onChange={(e) =>
                        setTaskInputs({
                          ...taskInputs,
                          [s.id]: e.target.value
                        })
                      }
                    />
                    <button onClick={() => addTask(s.id)}>Add Task</button>
                  </div>

                  {/* Tasks */}
                  <div className="tasks">
                    {s.Tasks?.map((t) => (
                      <div key={t.id} className="task">
                        {t.title} ({t.status})
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;