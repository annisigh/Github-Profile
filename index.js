
const url = "https://api.github.com/users";

const searchInputEle = document.getElementById("searchInput")
const searchButtonEle = document.getElementById("searchBtn")
const profileContainerEle = document.getElementById("profileContainer")
const loadingEle = document.getElementById("loading")

const generateProfile = (profile)=>{
    return( 
     `  
    <div class="profile-box">
    <div class="top-section">
      <div class="left">
          <div class="avatar">
              <img alt="avatar" src="${profile.avatar_url}"/>
          </div>
          <div class="self">
              <h1>${profile.name}</h1>
              <h1>${profile.login}</h1>
          </div>
      </div>

      <a href="${profile.html_url}" target = "_black">
      <button class="primary-btn">Check Profile</button>
      </a>
      
    </div>

    
  <div class="about">
      <h2>About</h2>

      <p>
      ${profile.bio}
      </p>

  </div>

  <div class="status">
      <div class="status-item">
          <h3>Followers</h3>
          <p>${profile.followers}</p>
      </div>
      <div class="status-item">
          <h3>Followings</h3>
          <p>${profile.following}</p>
      </div>
      <div class="status-item">
          <h3>Repos</h3>
          <p>${profile.public_gists}</p>
      </div>
  </div>
</div>
 `
    );
};

const fetchProfile = async () => {
    const username = searchInputEle.value;

    loadingEle.innerText = "loading...."
    loadingEle.style.color = "black";

    try{
       const res = await fetch(`${url}/${username}`);
       const data = await res.json();

       if(data.bio){
        loadingEle.innerText = "";
        profileContainerEle.innerHTML = generateProfile(data);
       }else{
        loadingEle.innerHTML = data.message;
        loadingEle.style.color = "red";
        profileContainerEle.innerText = "";
       }

       console.log("data", data);
    }catch(error){
       console.log({error});
       loadingEle.innerText = "";
    }
};

searchButtonEle.addEventListener("click", fetchProfile);



























