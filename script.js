
function initializeData() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', '');
    }
    if (!localStorage.getItem('employees')) {
        localStorage.setItem('employees', JSON.stringify([
            { id: 1, name: "John Doe", status: "active", currentTask: "" },
            { id: 2, name: "Jane Smith", status: "active", currentTask: "" },
            { id: 3, name: "Bob Johnson", status: "active", currentTask: "" },
            { id: 4, name: "Alice Brown", status: "active", currentTask: "" },
            { id: 5, name: "Charlie Green", status: "active", currentTask: "" },
            { id: 6, name: "Diana Prince", status: "active", currentTask: "" },
            { id: 7, name: "Bruce Wayne", status: "active", currentTask: "" },
            { id: 8, name: "Clark Kent", status: "active", currentTask: "" }
        ]));
    }
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify([
            { id: 1, title: "Fix Login Page", description: "Make the login responsive", assignedTo: 1, status: "completed" },
            { id: 2, title: "Update Dashboard UI", description: "Improve visual elements", assignedTo: 2, status: "completed" },
            { id: 3, title: "Implement Dark Mode", description: "Add toggle for dark theme", assignedTo: 3, status: "completed" },
            { id: 4, title: "Optimize Database Queries", description: "Improve backend performance", assignedTo: 4, status: "completed" },
            { id: 5, title: "Write API Documentation", description: "Document all API endpoints", assignedTo: 5, status: "completed" },
            { id: 6, title: "Refactor User Authentication", description: "Enhance security protocols", assignedTo: 6, status: "completed" },
            { id: 7, title: "Develop Notification System", description: "Push notifications for tasks", assignedTo: 7, status: "completed" },
            { id: 8, title: "Create Analytics Dashboard", description: "Track user activity", assignedTo: 8, status: "completed" },
            { id: 9, title: "Design Mobile App Layout", description: "Wireframes for mobile", assignedTo: 1, status: "completed" },
            { id: 10, title: "Prepare Q3 Financial Report", description: "Compile financial data", assignedTo: 2, status: "completed" },
            { id: 11, title: "Onboard New Employees", description: "Setup accounts and training", assignedTo: 3, status: "completed" },
            { id: 12, title: "Conduct Security Audit", description: "Check for vulnerabilities", assignedTo: 4, status: "completed" },
            { id: 13, title: "Update Terms of Service", description: "Review and revise legal text", assignedTo: 5, status: "completed" },
            { id: 14, title: "Plan Q4 Marketing Campaign", description: "Brainstorm and strategy", assignedTo: 6, status: "completed" },
            { id: 15, title: "Migrate Cloud Storage", description: "Move data to new provider", assignedTo: 7, status: "completed" },
            { id: 16, title: "Deploy New Frontend Features", description: "Push latest UI changes live", assignedTo: 8, status: "completed" },
            { id: 17, title: "Debug Payment Gateway", description: "Resolve transaction issues", assignedTo: 1, status: "pending" },
            { id: 18, title: "Research AI Integration", description: "Explore machine learning options", assignedTo: 2, status: "pending" },
            { id: 19, title: "Schedule Team Building Event", description: "Organize social gathering", assignedTo: 3, status: "pending" },
            { id: 20, title: "Update Software Licenses", description: "Renew expiring licenses", assignedTo: 4, status: "pending" },
            { id: 21, title: "Perform Server Maintenance", description: "Routine server health check", assignedTo: 5, status: "pending" },
            { id: 22, title: "Review Code for Performance", description: "Identify bottlenecks", assignedTo: 6, status: "pending" },
            { id: 23, title: "Prepare Client Presentation", description: "Create slides for next meeting", assignedTo: 7, status: "pending" },
            { id: 24, title: "Refine Onboarding Flow", description: "Improve new user experience", assignedTo: 8, status: "pending" }
        ]));
    }
    if (!localStorage.getItem('recentActivities')) {
        const now = new Date();
        const activityData = [
            {
                type: 'task_completed',
                description: 'Task "Update Dashboard UI" completed',
                timestamp: new Date(now.getTime() - 10 * 60 * 1000).toISOString() 
            },
            {
                type: 'employee_added',
                description: 'New employee "Sarah Johnson" added',
                timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString() 
            },
            {
                type: 'task_assigned', 
                description: 'Task "Fix Login Bug" assigned to you',
                timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString() 
            }
        ];
        localStorage.setItem('recentActivities', JSON.stringify(activityData));
    }
}
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}


async function register() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!username || !email || !password || !confirmPassword) {
        alert('Please fill in all fields!');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters!');
        return;
    }

    const users = JSON.parse(localStorage.getItem("users"));
    if (users.some(u => u.username === username)) {
        alert("Username already taken!");
        return;
    }

    try {
        const hashedPassword = await hashPassword(password);
        users.push({ username, email, password: hashedPassword });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful! Redirecting to login...");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
    }
}

// Login
async function login() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }

    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(u => u.username === username);

    if (!user) {
        alert("User not found!");
        return;
    }

    try {
        const hashedInput = await hashPassword(password);
        if (hashedInput === user.password) {
            localStorage.setItem("currentUser", username); 
            alert('Login successful! Redirecting to Dashboard.');
            window.location.href = "dashboard.html";
        } else {
            alert("Wrong password!");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Login failed. Please try again.");
    }
}


function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
function updateDashboardStats() {
    const employees = JSON.parse(localStorage.getItem("employees"));
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    const totalTasks = tasks.length;
    const activeEmployees = employees.filter(e => e.status === "active").length;
    const completedTasks = tasks.filter(t => t.status === "completed").length;
    const pendingTasks = tasks.filter(t => t.status === "pending" || t.status === "in-progress").length; 

    if (document.getElementById("totalTasks")) {
        document.getElementById("totalTasks").textContent = totalTasks;
    }
    if (document.getElementById("activeEmployees")) {
        document.getElementById("activeEmployees").textContent = activeEmployees;
    }
    if (document.getElementById("completedTasks")) {
        document.getElementById("completedTasks").textContent = completedTasks;
    }
    if (document.getElementById("pendingTasks")) {
        document.getElementById("pendingTasks").textContent = pendingTasks;
    }
}
function formatTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) {
        return "just now";
    } else if (seconds < 3600) {
        return Math.floor(seconds / 60) + " minutes ago";
    } else if (seconds < 86400) {
        return Math.floor(seconds / 3600) + " hours ago";
    } else if (seconds < 172800) { 
        return "yesterday";
    } else {
        return date.toLocaleDateString(); 
    }
}

const activityIconMap = {
    'task_added': { icon: 'fas fa-plus-circle', color: '#6e8efb' },
    'task_completed': { icon: 'fas fa-check-circle', color: '#2ed573' },
    'task_assigned': { icon: 'fas fa-tasks', color: '#a777e3' }, 
    'task_deleted': { icon: 'fas fa-trash-alt', color: '#ff4757' }, 
    'employee_added': { icon: 'fas fa-user-plus', color: '#a777e3' },
    'employee_deleted': { icon: 'fas fa-user-times', color: '#ff4757' },
    'employee_status_changed': { icon: 'fas fa-user-tag', color: '#ffa502' },
    'task_unassigned': { icon: 'fas fa-link-slash', color: '#ffa502' }, 
};

function addActivity(type, description) {
    let activities = JSON.parse(localStorage.getItem('recentActivities')) || [];
    const newActivity = {
        type: type,
        description: description,
        timestamp: new Date().toISOString()
    };

    activities.unshift(newActivity); 
    const MAX_ACTIVITIES = 5;
    if (activities.length > MAX_ACTIVITIES) {
        activities = activities.slice(0, MAX_ACTIVITIES);
    }

    localStorage.setItem('recentActivities', JSON.stringify(activities));
    if (document.querySelector('.dashboard-container')) {
        loadRecentActivity();
    }
}

function loadRecentActivity() {
    const activityListContainer = document.getElementById("activityList");
    if (!activityListContainer) return; 

    const activities = JSON.parse(localStorage.getItem("recentActivities")) || [];
    activityListContainer.innerHTML = ""; 

    if (activities.length === 0) {
        activityListContainer.innerHTML = '<p style="text-align: center; color: rgba(255, 255, 255, 0.7);">No recent activity.</p>';
        return;
    }

    activities.forEach(activity => {
        const activityItem = document.createElement("div");
        activityItem.classList.add("activity-item");

        const iconInfo = activityIconMap[activity.type] || { icon: 'fas fa-info-circle', color: 'gray' };

        activityItem.innerHTML = `
            <div class="activity-icon" style="background: ${iconInfo.color}33; color: ${iconInfo.color};">
                <i class="${iconInfo.icon}"></i>
            </div>
            <div class="activity-details">
                <p>${activity.description}</p>
                <p class="activity-time">${formatTimeAgo(activity.timestamp)}</p>
            </div>
        `;
        activityListContainer.appendChild(activityItem);
    });
}
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const employees = JSON.parse(localStorage.getItem("employees"));
    const taskList = document.getElementById("taskList");
    
    if (taskList) {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const assignedEmployee = employees.find(e => e.id === task.assignedTo);
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>${assignedEmployee ? assignedEmployee.name : "Unassigned"}</td>
                <td><span class="${task.status}">${task.status}</span></td>
                <td>
                    <div class="action-buttons">
                        ${task.status !== 'completed' ? `<button onclick="markTaskCompleted(${task.id})" class="btn btn-success"><i class="fas fa-check"></i> Complete</button>` : ''}
                        <button onclick="deleteTask(${task.id})" class="btn btn-danger"><i class="fas fa-trash-alt"></i> Delete</button>
                    </div>
                </td>
            `;
            taskList.appendChild(row);
        });
    }
}

function loadEmployeeDropdown() {
    const employees = JSON.parse(localStorage.getItem("employees"));
    const dropdown = document.getElementById("taskEmployee");
    
    if (dropdown) {
        dropdown.innerHTML = '<option value="">-- Assign to --</option>';
        employees.filter(e => e.status === "active").forEach(emp => {
            const option = document.createElement("option");
            option.value = emp.id;
            option.textContent = emp.name;
            dropdown.appendChild(option);
        });
    }
}

function addTask() {
    const titleInput = document.getElementById("taskTitle");
    const descriptionInput = document.getElementById("taskDesc");
    const assignedToSelect = document.getElementById("taskEmployee");

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const assignedTo = parseInt(assignedToSelect.value) || null;

    if (!title || !description) {
        alert("Title and description are required!");
        return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    
    tasks.push({
        id: newId,
        title,
        description,
        assignedTo,
        status: "pending"
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    titleInput.value = ""; 
    descriptionInput.value = "";
    assignedToSelect.value = ""; 
    loadTasks(); 
    updateDashboardStats(); 
    addActivity('task_added', `New task "${title}" added`); 
    alert("Task added successfully!");
}

function markTaskCompleted(id) {
    if (!confirm("Are you sure you want to mark this task as completed?")) {
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks"));
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        const completedTaskTitle = tasks[taskIndex].title; 
        tasks[taskIndex].status = "completed";
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks(); 
        updateDashboardStats(); 
        addActivity('task_completed', `Task "${completedTaskTitle}" completed`); 
        alert("Task marked as completed!");
    } else {
        alert("Task not found!");
    }
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    const taskToDelete = tasks.find(task => task.id === id);
    const taskTitle = taskToDelete ? taskToDelete.title : 'Unknown Task';

    if (!confirm(`Are you sure you want to delete task "${taskTitle}"? This action cannot be undone.`)) {
        return; 
    }

    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    loadTasks(); 
    updateDashboardStats(); 
    addActivity('task_deleted', `Task "${taskTitle}" deleted.`); 
    alert(`Task "${taskTitle}" deleted successfully!`);
}



function loadEmployees() {
    const employees = JSON.parse(localStorage.getItem("employees"));
    const employeeList = document.getElementById("employeeList");
    
    if (employeeList) {
        employeeList.innerHTML = "";
        employees.forEach(emp => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${emp.name}</td>
                <td><span class="${emp.status}">${emp.status}</span></td>
                <td>${emp.currentTask || "None"}</td>
                <td>
                    <div class="action-buttons">
                        <button onclick="toggleEmployeeStatus(${emp.id})" class="btn btn-secondary">
                            ${emp.status === 'active' ? '<i class="fas fa-user-times"></i> Deactivate' : '<i class="fas fa-user-check"></i> Activate'}
                        </button>
                        <button onclick="deleteEmployee(${emp.id})" class="btn btn-danger">
                            <i class="fas fa-trash-alt"></i> Delete
                        </button>
                    </div>
                </td>
            `;
            employeeList.appendChild(row);
        });
    }
}

function addEmployee() {
    const employeeNameInput = document.getElementById("employeeName");
    const name = employeeNameInput.value.trim();

    if (!name) {
        alert("Employee name is required!");
        return;
    }

    const employees = JSON.parse(localStorage.getItem("employees"));
    const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;

    employees.push({
        id: newId,
        name: name,
        status: "active",
        currentTask: ""
    });

    localStorage.setItem("employees", JSON.stringify(employees));
    employeeNameInput.value = ""; 
    loadEmployees(); 
    loadEmployeeDropdown(); 
    updateDashboardStats(); 
    addActivity('employee_added', `New employee "${name}" added`); 
    alert("Employee added successfully!");
}


function toggleEmployeeStatus(id) {
    const employees = JSON.parse(localStorage.getItem("employees"));
    const empIndex = employees.findIndex(e => e.id === id);

    if (empIndex !== -1) {
        const emp = employees[empIndex];
        const oldStatus = emp.status;
        emp.status = emp.status === "active" ? "inactive" : "active";
        
        localStorage.setItem("employees", JSON.stringify(employees));
        loadEmployees();
        loadEmployeeDropdown(); 
        updateDashboardStats(); 
        addActivity('employee_status_changed', `Employee "${emp.name}" status changed from ${oldStatus} to ${emp.status}`); // Add activity
    }
}
function deleteEmployee(id) {
    
    const employees = JSON.parse(localStorage.getItem("employees"));
    const employeeToDelete = employees.find(emp => emp.id === id);
    const employeeName = employeeToDelete ? employeeToDelete.name : 'Unknown Employee';

    if (!confirm(`Are you sure you want to delete employee "${employeeName}"? All tasks assigned to them will be unassigned.`)) {
        return; 
    }

    let updatedEmployees = JSON.parse(localStorage.getItem("employees"));
    let updatedTasks = JSON.parse(localStorage.getItem("tasks"));
    updatedEmployees = updatedEmployees.filter(emp => emp.id !== id);
    const unassignedTaskCount = updatedTasks.filter(task => task.assignedTo === id).length;
    updatedTasks = updatedTasks.map(task => {
        if (task.assignedTo === id) {
            task.assignedTo = null; 
        }
        return task;
    });

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    loadEmployees(); 
    loadTasks(); 
    loadEmployeeDropdown(); 
    updateDashboardStats(); 

    
    addActivity('employee_deleted', `Employee "${employeeName}" deleted.`);
    if (unassignedTaskCount > 0) {
        addActivity('task_unassigned', `${unassignedTaskCount} task(s) unassigned from "${employeeName}".`);
    }
    alert(`Employee "${employeeName}" deleted successfully!`);
}
function setupPasswordStrengthChecker() {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthBar = document.getElementById('strengthBar');
            if (!strengthBar) return;

            let strength = 0;
            if (password.length >= 8) strength += 1;
            if (password.match(/[A-Z]/)) strength += 1;
            if (password.match(/[0-9]/)) strength += 1;
            if (password.match(/[^A-Za-z0-9]/)) strength += 1;

            switch(strength) {
                case 0: strengthBar.style.width = '0%'; strengthBar.style.background = '#ff4757'; break;
                case 1: strengthBar.style.width = '25%'; strengthBar.style.background = '#ff4757'; break;
                case 2: strengthBar.style.width = '50%'; strengthBar.style.background = '#ffa502'; break;
                case 3: strengthBar.style.width = '75%'; strengthBar.style.background = '#2ed573'; break;
                case 4: strengthBar.style.width = '100%'; strengthBar.style.background = '#2ed573'; break;
            }
        });
    }
}
function setupNavigation() {
    if (document.getElementById("backToDashboardBtn")) {
        document.getElementById("backToDashboardBtn").addEventListener("click", () => {
            window.location.href = "dashboard.html";
        });
    }
    
    if (document.getElementById("backToDashboardBtn2")) {
        document.getElementById("backToDashboardBtn2").addEventListener("click", () => {
            window.location.href = "dashboard.html";
        });
    }
}
function setupEventListeners() {
    if (document.getElementById("registerBtn")) {
        document.getElementById("registerBtn").addEventListener("click", register);
    }
    if (document.getElementById("loginBtn")) {
        document.getElementById("loginBtn").addEventListener("click", login);
    }
    if (document.getElementById("logoutBtn")) {
        document.getElementById("logoutBtn").addEventListener("click", logout);
    }
    if (document.getElementById("addTaskBtn")) {
        document.getElementById("addTaskBtn").addEventListener("click", addTask);
    }


    if (document.getElementById("addEmployeeBtn")) {
        document.getElementById("addEmployeeBtn").addEventListener("click", addEmployee);
    }

    setupPasswordStrengthChecker(); 
}


document.addEventListener("DOMContentLoaded", function() {
    initializeData();
    setupEventListeners();
    setupNavigation();
    
  
    if (document.getElementById("usernameDisplay")) {
        document.getElementById("usernameDisplay").textContent = 
            localStorage.getItem("currentUser") || "User";
    }
    

    if (document.querySelector('.dashboard-container')) {
        updateDashboardStats();
        loadRecentActivity(); 
    }
    if (document.querySelector('.task-form') || document.querySelector('.task-list')) {
        loadTasks();
        loadEmployeeDropdown();
    }
    if (document.querySelector('.employee-form') || document.querySelector('.employee-list')) {
        loadEmployees();
    }
});