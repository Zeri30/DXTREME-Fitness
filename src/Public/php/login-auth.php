<?php
session_start();

$configPath = __DIR__ . '/../../Connection/db-config.php';
if (file_exists($configPath)) {
    require_once $configPath;
} else {
    error_log("db-config.php not found at: $configPath");
    $_SESSION['login_error'] = 'Server configuration error (db-config missing).';
    header("Location: ../pages/login.php");
    exit;
}

// CHECK IF CONNECTION IS SET
if (!isset($conn) || !$conn) {
    error_log('Database connection not available (login-auth).');
    $_SESSION['login_error'] = 'Database connection error.';
    header("Location: ../pages/login.php");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $username = filter_var($username, FILTER_SANITIZE_STRING); 
    $password = trim($_POST['password']);

    $stmt = $conn->prepare("SELECT UserID, Username, PasswordHash, Role FROM Users WHERE Username=?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        if (password_verify($password, $row['PasswordHash'])) {
            $_SESSION['UserID'] = $row['UserID'];
            $_SESSION['Username'] = $row['Username'];
            $_SESSION['Role'] = $row['Role'];

            if ($row['Role'] === 'Owner') {
                header("Location: ../../Roles/owner-role/pages/owner-dashboard.html");
                exit;
            }
            if ($row['Role'] === 'Employee') {
                header("Location: ../../Roles/employee-role/pages/employee-dashboard.html");
                exit;
            }

        } else {
            $error = "Incorrect password";
        }
    } else {
        $error = "Username not found";
    }

    $stmt->close();
    $conn->close();

    // CHECK FOR ERRORS AND REDIRECT BACK TO LOGIN PAGE
    if (isset($error)) {
        $_SESSION['login_error'] = $error;

        header("Location: ../../Public/pages/login.php");
        exit;
    }
}
?>
