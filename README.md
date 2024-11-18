<h1>Real-Time Chat Application</h1>

<p>Welcome to the Real-Time Chat Application built with <strong>Socket.IO</strong> and <strong>JavaScript</strong>! This project demonstrates the power of real-time communication in web applications, allowing users to engage in instant messaging seamlessly.</p>

<h1>Step-by-Step Guide to Running with Docker</h1>

<p>This document provides a step-by-step guide on how to download, configure, and run the project using Docker.</p>

<h2>Prerequisites</h2>

<p>Before you begin, you will need to have Docker and Docker Compose installed on your machine. You can download and install Docker from the following link:</p>

<p><a href="https://www.docker.com/get-started">Download Docker</a></p>

<h2>Step 1: Download the Project</h2>

<p>Clone the project repository to your local machine using the following command:</p>

<pre><code>git clone git@github.com:arthurdiasdeveloper/realtime-socketio-chat.git</code></pre>

<p>Navigate to the project directory:</p>

<pre><code>cd realtime-socketio-chat</code></pre>

<h2>Step 2: Build and Run the Docker Containers</h2>

<p>To build and start the Docker containers, run the following command:</p>

<pre><code>docker-compose up --build</code></pre>

<p>If you want to stop the project, type the following command:</p>

<pre><code>docker-compose down</code></pre>

<h2>Features</h2>
<ul>
    <li><strong>Real-Time Messaging</strong>: Send and receive messages instantly with Socket.IO.</li>
    <li><strong>Integration Testing</strong>: Comprehensive tests ensure the reliability and performance of the application.</li>
    <li><strong>Scalable Architecture</strong>: Built to handle multiple users and channels effortlessly.</li>
</ul>

<h2>Getting Started</h2>
<p>Follow these instructions to set up and run the project locally:</p>

<h3>Prerequisites</h3>
<ul>
    <li>Node.js (v14 or later)</li>
    <li>npm (Node Package Manager)</li>
</ul>

<h3>Installation</h3>
<ol>
    <li>Clone the repository:
        <pre><code>git clone https://github.com/arthurdiasdeveloper/realtime-socketio-chat.git</code></pre>
    </li>
    <li>Navigate to the project directory:
        <pre><code>cd realtime-socketio-chat</code></pre>
    </li>
    <li>Install the dependencies:
        <pre><code>npm install</code></pre>
    </li>
</ol>

<h3>Running the Application</h3>
<p>To start the application, run the following command:</p>
<pre><code>npm start</code></pre>
<p>Follow your terminal to <code>http://localhost:3000</code> to access the application logs.</p>

<h2>Running Tests</h2>
<p>To execute the integration tests, run:</p>
<pre><code>npm test</code></pre>

<h2>Technologies Used</h2>
<ul>
    <li><strong>JavaScript</strong>: The primary programming language for the application.</li>
    <li><strong>Socket.IO</strong>: Enables real-time, bidirectional communication between clients and servers.</li>
    <li><strong>Jest</strong>: For testing and ensuring the quality of the application.</li>
</ul>

<h2>Contributing</h2>
<p>Contributions are welcome! Please follow these steps to contribute:</p>
<ol>
    <li>Fork the project</li>
    <li>Create your feature branch (<code>git checkout -b feature/AmazingFeature</code>)</li>
    <li>Commit your changes (<code>git commit -m 'Add some AmazingFeature'</code>)</li>
    <li>Push to the branch (<code>git push origin feature/AmazingFeature</code>)</li>
    <li>Open a Pull Request</li>
</ol>

<h2>Acknowledgments</h2>
<ul>
    <li>Thanks to the Socket.IO community for their support and documentation.</li>
    <li>Inspiration and resources from various online tutorials and articles.</li>
</ul>
