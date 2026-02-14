let deadlines = JSON.parse(localStorage.getItem("deadlines")) || [];

function save(){
  localStorage.setItem("deadlines", JSON.stringify(deadlines));
}

function addDeadline(){
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;

  if(!title || !date) return alert("Fill all fields");

  deadlines.push({title, date});
  save();
  render();
}

function render(){
  const list = document.getElementById("list");
  list.innerHTML="";

  deadlines.forEach((d,index)=>{
    const diff = new Date(d.date) - new Date();
    const hours = Math.floor(diff/1000/60/60);
    const days = Math.floor(hours/24);

    const div = document.createElement("div");
    div.className="card";

    if(days < 1) div.classList.add("warning");

    div.innerHTML = `
      <strong>${d.title}</strong><br>
      ${days} days ${hours%24} hrs left
      <br><br>
      <button onclick="deleteDeadline(${index})">Delete</button>
    `;

    list.appendChild(div);
  });
}

function deleteDeadline(index){
  deadlines.splice(index,1);
  save();
  render();
}


setInterval(render,1000);
render();
