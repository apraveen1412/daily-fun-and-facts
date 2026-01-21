import {
    generateActivityPool,
    getRandomActivity
} from './activitypool.js';
generateActivityPool(1000); // ensure pool is generated

//Creating elements using DOM
let h1=document.createElement('h1');
let h2=document.createElement('h2');
let time=document.createElement('p');

let Name=document.createElement('div');
let userName=document.createElement('input');
let saveName=document.createElement('button');

let catDiv=document.createElement('div');
let catHead=document.createElement('h2');
let catImg=document.createElement('img');
let catText=document.createElement('p');

let JQ=document.createElement('div');
let JQHead=document.createElement('h2');
let jk=document.createElement('p');
let quote=document.createElement('p');

let wod=document.createElement('div');
let wodHead=document.createElement('h2');
let word=document.createElement('h3');
let phonetic=document.createElement('h3');
let meaning=document.createElement('p');

let bookDiv = document.createElement('div');
let bookHead = document.createElement('h2');
let bookTitle = document.createElement('h3');
let bookImg = document.createElement('img');
let seeMoreBtn = document.createElement('button');
let bookDetails = document.createElement('div');
let bookAuthor = document.createElement('p');
let bookDescription = document.createElement('p');

let activityDiv = document.createElement('div');
let activityHead = document.createElement('h2');
let activityText = document.createElement('p');
let fetchActivityBtn = document.createElement('button');

function createHR() {
    return document.createElement('hr');
}

let mainContent=document.createElement('div');
let body=document.querySelector('body');


h1.innerText='Daily Fun & Facts';
jk.innerText = "Loading joke...";
quote.innerText = "Loading quote...";
bookHead.innerText = 'Book Recommendation';
seeMoreBtn.innerText = 'See More';

let storedName=localStorage.getItem('username');
if(storedName)  h2.innerText=`Welcome, ${storedName}`;
else h2.innerText='';

saveName.innerText='Save name';
catHead.innerText='Cat of the day';
JQHead.innerText='Jokes & Quotes';
wodHead.innerText='Word of the day';
bookHead.innerText = 'Book Recommendation';
seeMoreBtn.innerText = 'See More';
bookDetails.style.display = 'none';

userName.setAttribute('placeholder', 'Enter your name');
mainContent.setAttribute('id', 'main-content');
h1.setAttribute('id', 'title');
h2.setAttribute('id', 'welcome');
Name.setAttribute('id', 'name');
userName.setAttribute('type', 'text');
userName.setAttribute('id', 'username-input');
saveName.setAttribute('id', 'save-name');
catDiv.setAttribute('id', 'catImgs');
JQ.setAttribute('id', 'jokes-quotes');
wod.setAttribute('id', 'wod');
wodHead.setAttribute('id', 'wod-head');
word.setAttribute('id', 'word');
meaning.setAttribute('id', 'meaning');
bookDiv.setAttribute('id', 'book-div');
activityDiv.setAttribute('id', 'activity-div');
activityHead.setAttribute('id', 'activity-head');
activityText.setAttribute('id', 'activity-text');
fetchActivityBtn.setAttribute('id', 'fetch-activity');

Name.append(userName);
Name.append(saveName);
catDiv.append(catHead);
catDiv.append(createHR());
catDiv.append(catImg);
catDiv.append(catText);
JQ.append(JQHead);
JQ.append(createHR());
JQ.append(jk);
JQ.append(quote);
wod.append(wodHead);
wod.append(createHR());
wod.append(word);
wod.append(phonetic);
wod.append(meaning);
bookDiv.append(bookHead);
bookDiv.append(createHR());
bookDiv.append(bookTitle);
bookDiv.append(bookImg);
bookDiv.append(seeMoreBtn);
bookDetails.append(bookAuthor);
bookDetails.append(bookDescription);
bookDiv.append(bookDetails);
activityDiv.append(activityHead);
activityDiv.append(createHR());
activityDiv.append(activityText);
activityDiv.append(fetchActivityBtn);
mainContent.append(catDiv);
mainContent.append(JQ);
mainContent.append(wod);
mainContent.append(bookDiv);
mainContent.append(activityDiv);
body.append(h1);
body.append(h2);
body.append(time);
body.append(Name);
body.append(mainContent);

async function days(){
    let weekdays=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today=new Date();
    const dayIndex=today.getDay();
    return weekdays[dayIndex]
}

async function month(){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    const monthIndex = today.getMonth();
    return months[monthIndex];
}

async function updateTime(){
    let now=new Date();
    let Day=await days().then((d)=>d);
    let Year=now.getFullYear();
    let Month=await month().then((m)=>m);
    let date=now.getDate();
    let Hours=now.getHours();
    let AmPm=Hours>=12?'PM':'AM';
    Hours=Hours%12||12;
    let Mins=String(now.getMinutes()).padStart(2, 0);
    let Secs=String(now.getSeconds()).padStart(2, 0);
    
    time.innerText=`${Day}, ${Month} ${date}, ${Year}, ${Hours+":"+Mins+":"+Secs} ${AmPm}`;
}

window.onload=async()=>{
    updateTime();
    setInterval(updateTime, 1000);
    dayCat().then((cat)=>{
                catImg.setAttribute('src', cat.url);})
            .catch(()=> catImg.setAttribute('alt', 'Cat image not available'));

    randCatFact().then((e)=> catText.innerText=e)
                 .catch(()=> catText.innerText="Couldn't fetch cat fact 😿");

    joke().then((e)=> jk.innerText=e)
          .catch(()=> jk.innerText="Couldn't fetch a joke 😅");

    quot().then((e)=> quote.innerText=e)
          .catch(()=> quote.innerText="Couldn't fetch a quote ✨");
    wordOfDay().then((e) => {
                    word.innerText = e.word;
                    phonetic.innerText = e.phonetics?.[0]?.text || "No phonetic available";
                    meaning.innerText = e.meanings?.[0]?.definitions?.[0]?.definition || "No meaning available";
                });
    bookrecommendation();
    
    boredActivity();
}

saveName.addEventListener('click', ()=>{
    localStorage.removeItem('username');
    let name=userName.value;
    localStorage.setItem('username', name);
    h2.innerText=`Welcome, ${localStorage.getItem('username')}`;
    userName.value='';
    userName.disabled=true;
});


//cat of the day
async function dayCat(){
    let url='https://api.thecatapi.com/v1/images/search';
    let res= await fetch(url); //without axios
    let data=await res.json();
    return data[0];
}

async function randCatFact(){
    let url='https://catfact.ninja/fact';
    let res=await axios.get(url); //using axios
    return res.data.fact;
}

//Joke & Quote
async function joke(){
    let url='https://v2.jokeapi.dev/joke/Any?safe-mode';
    let res=await axios.get(url);
    if(res.data.type==='single')    return `Joke:/n ${res.data.joke}`;
    else    return `Setup: ${res.data.setup}\nDelivery: ${res.data.delivery}`;
}
async function quot() {
    let url='https://dummyjson.com/quotes/random';
    let res = await axios.get(url);
    let q = `\n${res.data.quote}\n\n        -${res.data.author}`;
    return q;
}

//Word of the day
async function wordOfDay() {
    try{
        let randwordurl='https://random-word-api.herokuapp.com/word';
        let wordres=await axios.get(randwordurl);
        let randword=wordres.data[0];

        let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${randword}`;
        let res = await axios.get(url);
        let data=res.data[0];
        return data;
    }
    catch(err){
        return{
            word: "N/A",
            phonetics: [{ text: "" }],
            meanings: [{ definitions: [{ definition: "Could not fetch word 😢" }] }]
        };
    }
}

async function bookrecommendation() {
    try {
        let maxAttempts = 5; // Retry a few times if invalid ID
        let data = null;

        for (let i = 0; i < maxAttempts; i++) {
            let randomId = Math.floor(Math.random() * 500000) + 1; // smaller range, more likely valid
            let url = `https://openlibrary.org/works/OL${randomId}W.json`;
            try {
                let res = await axios.get(url);
                data = res.data;
                if (data.title) break; // valid book found
            } catch {
                continue; // try next random ID
            }
        }

        if (!data) throw new Error("Could not fetch a valid book.");

        // Title
        let title = data.title || "No title available";

        // Description
        let description = "No description available";
        if (data.description) {
            description = typeof data.description === "string" ? data.description : data.description.value;
        }

        // Authors
        let authorNames = [];
        if (data.authors && data.authors.length > 0) {
            for (let a of data.authors) {
                try {
                    let authRes = await axios.get(`https://openlibrary.org${a.author.key}.json`);
                    authorNames.push(authRes.data.name);
                } catch {
                    authorNames.push("Unknown author");
                }
            }
        } else {
            authorNames.push("Unknown author");
        }

        // Cover image
        let cover = data.covers ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg` : "";

        // Update DOM
        bookTitle.innerText = title;
        bookAuthor.innerText = `Author: ${authorNames.join(', ')}`;
        bookDescription.innerText = description;
        bookImg.setAttribute('src', cover || '');
        bookImg.setAttribute('alt', title);
        bookDetails.style.display = 'none'; // initially hidden

        // Toggle See More
        seeMoreBtn.onclick = () => {
            bookDetails.style.display = bookDetails.style.display === 'none' ? 'block' : 'none';
        };

    } catch (err) {
        console.error("Error fetching random book:", err);
        bookTitle.innerText = "Could not fetch a random book 😢";
        bookAuthor.innerText = "";
        bookDescription.innerText = "";
        bookImg.setAttribute('alt', 'No image available');
    }
}

//Activity for bored people

function boredActivity() {
    try {
        activityHead.innerText = "Activity for Bored People";
        activityText.innerText = "Loading activity...";
        fetchActivityBtn.innerText = "Fetch Another Activity";

        // initial fetch
        activityText.innerText = getRandomActivity();

        // single click handler (no duplicates)
        fetchActivityBtn.onclick = async () => {
            try {
                fetchActivityBtn.disabled = true;
                activityText.innerText = "Loading activity...";
                activityText.innerText = getRandomActivity();
            } catch {
                activityText.innerText = "Couldn't fetch an activity 😕";
            } finally {
                fetchActivityBtn.disabled = false;
            }
        };

    } catch {
        activityHead.innerText = "Activity for Bored People";
        activityText.innerText = "Couldn't fetch an activity 😕";
        fetchActivityBtn.innerText = "Try Again";
    }
}
