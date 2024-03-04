function Resume_mb(){
    // alert("You are redirecting to Resume of 'Basha'")
    location.href = '/me/Resume.html';

}

const img = document.querySelector("img");
img.ondragstart = () => {
  return false;
};