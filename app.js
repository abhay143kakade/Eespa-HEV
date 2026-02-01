const API = "http://localhost:5000/api";

function login() {
  fetch(API + "/login", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({
      username:username.value,
      password:password.value
    })
  })
  .then(r=>r.json())
  .then(d=>{
    if(d.token){
      localStorage.token=d.token;
      localStorage.role=d.role;
      location="dashboard.html";
    } else msg.innerText=d.message;
  });
}

function loadDashboard(){
  fetch(API+"/vehicle",{
    headers:{Authorization:"Bearer "+localStorage.token}
  })
  .then(r=>r.json())
  .then(d=>{
    battery.innerText=d.battery_soc+"%";
    speed.innerText=d.speed+" km/h";
    temp.innerText=d.temperature+" °C";
  });
}

function createUser(){
  fetch(API+"/admin/create",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:"Bearer "+localStorage.token
    },
    body:JSON.stringify({
      username:newUser.value,
      password:newPass.value,
      role:role.value
    })
  }).then(r=>r.json()).then(d=>output.innerText=JSON.stringify(d,null,2));
}

function checkAdmin(){
  if(localStorage.role!=="admin") location="dashboard.html";
}

function logout(){
  localStorage.clear();
  location="index.html";
}
