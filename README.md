# basic-task-management-system

# Task Manager Pro

## ✨ A Modern, Minimalist Task and Employee Management System

Task Manager Pro is a sleek and intuitive web application designed to streamline task and employee management for small teams or personal use. Built with a modern glassmorphism aesthetic, it offers a visually appealing and user-friendly interface for tracking projects, monitoring employee status, and staying on top of recent team activities.

---

## 🚀 Getting Started

To run this project locally, simply follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url> 
    ```
    (Replace `<your-repo-url>` with the actual URL of your GitHub repository)

2.  **Navigate to the project directory:**
    ```bash
    cd Task-Manager-Pro
    ```

3.  **Open `index.html`:**
    Open the `index.html` file in your preferred web browser. Since this is a client-side application, you don't need a web server; your browser can run it directly.

---

## 💡 Usage

1.  **Register:** On the `register.html` page, create a new user account. The system includes a basic password strength indicator.
2.  **Login:** Use your newly registered (or default "devil") credentials to log in via `index.html`.
3.  **Dashboard:** Upon successful login, you'll be redirected to the `dashboard.html`. Here, you'll see:
    *   Key statistics: Total Tasks, Active Employees, Completed Tasks, and Pending Tasks.
    *   Quick action links to navigate to task and employee management pages.
    *   A dynamic "Recent Activity" feed that updates automatically as actions are performed.
4.  **Manage Tasks (`tasks.html`):**
    *   **Add New Task:** Use the form to create new tasks, add a description, and assign them to an active employee.
    *   **View All Tasks:** See a comprehensive list of all tasks, their descriptions, assigned employees, and current status.
    *   **Mark as Complete:** Click the "Complete" button for any pending or in-progress task to mark it as finished.
    *   **Delete Task:** Remove tasks from the list using the "Delete" button.
5.  **Manage Employees (`employees.html`):**
    *   **Add New Employee:** Easily add new team members. They will be added as "active" by default.
    *   **View Employee List:** See all registered employees, their current status, and if they have a current task.
    *   **Toggle Status:** Change an employee's status between "active" and "inactive".
    *   **Delete Employee:** Permanently remove an employee. **Note:** Deleting an employee will automatically unassign any tasks previously assigned to them.
6.  **Dynamic Updates:** All changes made in task or employee management (adding, completing, deleting, status changes) are reflected immediately on the Dashboard's statistics and Recent Activity feed, providing a real-time overview.

---

## 💻 Technologies Used

*   **HTML5:** For structuring the web pages.
*   **CSS3:** For styling, including the modern glassmorphism effects, responsive design, and animations.
*   **JavaScript (ES6+):** Powers all interactive elements, data manipulation, and dynamic UI updates.
*   **Font Awesome:** Provides a rich library of icons for enhanced visual cues.

---

## 📸 Screenshots

*(You can add screenshots of your application here to showcase its features and design. For example:)*

*   **Dashboard Overview:**
    ![Dashboard Screenshot](https://github.com/devilsutra/basic-task-management-system/blob/0b1b391faecd6333a15d3e50ccabb2a0e163ab58/ss/dashboard.png)
*   **Login Page:**
    ![Login Page Screenshot](path/to/your/login-screenshot.png)
*   **Task Management Page:**
    ![Task Management Screenshot](path/to/your/tasks-screenshot.png)
*   **Employee Management Page:**
    ![Employee Management Screenshot](path/to/your/employees-screenshot.png)

---

## 🔮 Future Enhancements

This project currently uses `LocalStorage` for simplicity. For a production-ready application, significant enhancements would include:

*   **Backend Integration:** Transition from `LocalStorage` to a server-side backend (e.g., Node.js with Express, Python with Django/Flask, PHP with Laravel) and a robust database (e.g., PostgreSQL, MongoDB, MySQL) for:
    *   Scalable data storage.
    *   Multi-user data isolation.
    *   Enhanced security for user credentials.
*   **User Roles and Permissions:** Implement different levels of access (e.g., Admin, Manager, Employee) with varying privileges.
*   **Task Editing:** Add functionality to edit existing task details (title, description, assigned employee, status).
*   **Advanced Task Features:** Add due dates, priorities, categories, and recurrence options for tasks.
*   **Task Filtering & Sorting:** Allow users to filter tasks by status, employee, or sort them by various criteria.
*   **Notifications System:** Implement real-time notifications for task assignments, status changes, and due dates.
*   **Reporting & Analytics:** Expand the "View Reports" section with interactive charts and more detailed analytical data.
*   **Improved Error Handling:** More robust error messages and user feedback.
*   **Search Functionality:** Add search bars for tasks and employees.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or find any bugs, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature X'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

*   **Limesh**
*   GitHub: [YourGitHubUsername](https://github.com/YourGitHubUsername)
*   Email: [YourEmail@example.com](mailto:YourEmail@example.com)

Feel free to connect!
