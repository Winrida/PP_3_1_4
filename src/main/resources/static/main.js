showAllUsers();

function showAllUsers() {
    fetch("http://localhost:8080/api/admin")
        .then(res => res.json())
        .then(admin => {
            let output = '';
            console.log(admin);
            admin.forEach(user => {
                output += `
                <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                <button type="button" class="btn btn-info"
                    data-bs-toggle="modal" data-bs-target="#edit"
                    onclick="showEditInfo(${user.id})">Edit</button>
                </td>
                <td>
                <button type="button" class="btn btn-danger"
                    data-bs-toggle="modal" data-bs-target="#delete" 
                    onclick="showDeleteInfo(${user.id})">Delete</button>
                </td>
                </tr>
                `;
            });
            document.getElementById("usersOutput").innerHTML = output;
        });
}

function showDeleteInfo(id) {
    fetch("http://localhost:8080/api/admin/")
        .then(res => {
            res.json().then(user => {
                let currentUser = user.find((u) => u.id === parseInt(id));
                document.getElementById("deleteUserId").value = currentUser.id;
                document.getElementById("deleteUserName").value = currentUser.name;
                document.getElementById("deleteUserAge").value = currentUser.age;
                document.getElementById("deleteUserEmail").value = currentUser.email;
                document.getElementById("deleteUserRole").value = currentUser.role;
            })
        });
}

function showEditInfo(id) {
    fetch("http://localhost:8080/api/admin/")
        .then(res => {
            res.json().then(user => {
                let currentUser = user.find((u) => u.id === parseInt(id));
                document.getElementById("editUserId").value = currentUser.id;
                document.getElementById("editUserName").value = currentUser.name;
                document.getElementById("editUserAge").value = currentUser.age;
                document.getElementById("editUserEmail").value = currentUser.email;
                document.getElementById("editUserRole").value = currentUser.role;
                document.getElementById("editUserPassword").value = currentUser.password;
            })
        });
}


async function deleteUser() {
    event.preventDefault();
    await fetch("http://localhost:8080/api/admin/" + document.getElementById("deleteUserId").value, {
        method: "DELETE"
    })

    $("#delete .close").click();
    refreshAll();
}

function refreshAll() {
    let newTable = document.getElementById("usersOutput");
    while (newTable.rows.length > 1) {
        newTable.deleteRow(1)
    }
    showAllUsers();
}

async function editUser() {
    event.preventDefault();
    await fetch("http://localhost:8080/api/admin/" + document.getElementById("editUserId").value, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            id: document.getElementById("editUserId").value,
            name: document.getElementById("editUserName").value,
            age: document.getElementById("editUserAge").value,
            email: document.getElementById("editUserEmail").value,
            role: document.getElementById("editUserRole").value,
            password: document.getElementById("editUserPassword").value
        })
    })
    $("#edit .close").click();
    refreshAll();
}

function newUser() {
    event.preventDefault();
    let name = document.getElementById("createName").value;
    let age = document.getElementById("createAge").value;
    let email = document.getElementById("createEmail").value;
    let role = document.getElementById("createRole").value;
    let password = document.getElementById("createPassword").value;

    fetch("http://localhost:8080/api/admin/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            name: name,
            age: age,
            email: email,
            role: role,
            password: password
        })
    })
        .then(()=> {
            document.getElementById("nav-table-tab").click();
            showAllUsers();
            document.getElementById("createUser").reset();
        })
}