import storage from './storage';
import arrowImg from './public/images/arrow-right.svg';

async function gql(query) {
    const response = await fetch('https://api.hashnode.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '03c3a1e9-57d4-4dd8-9ad1-a89b16db2d6a'
        },
        body: JSON.stringify({ query }),
    });

    return response.json();

}

const query = `{
    user(username: "adxy") {
      publication {
        posts(page: 0) {
         slug
         title
         brief
         dateAdded
        }
      }
    }
  }`


gql(query).then((resp)=>{              
    const apiResponse = resp.data.user.publication.posts;
    apiResponse.forEach(post => {
      const card = document.createElement("div");
      card.classList.add("writings-card");
      const title = document.createElement("p");
      
      title.innerText = post.title;
      title.classList.add('title')
      card.appendChild(title);

      const date = document.createElement('p');
      const dateAdded = new Date(post.dateAdded).toLocaleDateString();
      date.innerText = dateAdded;
      date.classList.add('date');
      card.appendChild(date);
      
      const elm =  document.getElementById('writings');
      elm.appendChild(card);
    });
});

storage.openSource.forEach((contribution) => {
  const openSourceCard = document.createElement('div');
  openSourceCard.classList.add('os-card');

  openSourceCard.addEventListener('pointerdown', function() {
    window.open(`${contribution.prLink}`,'_blank');
  }, false);

  const title = document.createElement('p');
  title.innerText = contribution.title;
  title.classList.add('title');

  openSourceCard.appendChild(title);
  const langTagDiv = document.createElement('div');
  langTagDiv.classList.add('languages')

  contribution.languages.forEach((lang) => {
    const langTag = document.createElement('div');
    langTag.innerText = lang;
    langTag.classList.add('tags');
    langTagDiv.appendChild(langTag);
  });  
  openSourceCard.appendChild(langTagDiv);
  document.getElementById('open-source').appendChild(openSourceCard);
});


document.querySelector('.email').innerText = storage.email; 
document.querySelector('.intro').innerHTML = storage.introText;

storage.socials.forEach((social) => {
  document.querySelector(`.${social.platform}`).addEventListener('pointerdown', function() {
    window.open(`${social.link}`,'_blank');
  }, false);
})

storage.projects.forEach((project) => {

  const card = document.createElement('div');
  card.classList.add('project-card');

  const topDiv = document.createElement('div');

  const title = document.createElement('p');
  title.innerText = project.title;
  title.classList.add('title')
  topDiv.appendChild(title);

  const brief = document.createElement('p');
  brief.innerText = project.brief;
  brief.classList.add('brief');
  topDiv.appendChild(brief);

  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('project-buttons-box');

  const codeButton = document.createElement('div');
  codeButton.classList.add('project-button');

  const liveButton = codeButton.cloneNode(true);
  const codeText = document.createElement('p');
  const liveText = document.createElement('p');

  const arrowButton = document.createElement('img');
  arrowButton.src = arrowImg;

  const arrowButtonClone = arrowButton.cloneNode(true)

  codeText.innerText = 'code';
  liveText.innerText = 'live';

  codeButton.appendChild(codeText);
  codeButton.appendChild(arrowButton);
  liveButton.appendChild(liveText);
  liveButton.appendChild(arrowButtonClone);
  buttonDiv.appendChild(codeButton);
  buttonDiv.appendChild(liveButton);

  card.appendChild(topDiv);
  card.appendChild(buttonDiv);

  const projectSection = document.querySelector('.section-projects');
  projectSection.appendChild(card);

  codeButton.addEventListener('pointerdown', function() {
    window.open(`${project.code}`,'_blank');
  }, false);

  liveButton.addEventListener('pointerdown', function() {
    window.open(`${project.link}`,'_blank');
  }, false);

})


const player = document.querySelector('lottie-player');

const headphone = document.getElementById('headphone');
const chillAudio = new Audio('https://cdn.pixabay.com/audio/2022/08/17/audio_eb3864cceb.mp3');
chillAudio.loop = true;

headphone.addEventListener('pointerdown', () => {  
  if(chillAudio.paused){
    player.play();
    chillAudio.play()
  }else{
    player.stop();
    chillAudio.pause();
    chillAudio.currentTime = 0;
  }
});
