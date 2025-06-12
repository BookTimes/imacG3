// if (module.hot) {
//   module.hot.accept();

// }
const frames = [];
let currentFrame = 0;
const frameCount = 44;
const frameRate = 60; // FPS
const canvas = document.querySelector(".g3-anim");
const ctx = canvas.getContext("2d");

class App {
  constructor() {
    this.HeroTextColor();
    this.loadFrames();
  }
  HeroTextColor = function () {
    const texts = document.querySelectorAll(".hero-text-tag-effect");
    for (let char = 1; char < 6; char++) {
      const markup = `<span class="color-effect-${char} color-effect-main">l</span>`;
      console.log(markup);
      texts.forEach((text) => text.insertAdjacentHTML("beforeend", markup));
    }
  };
  loadFrames = function () {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();

      // img.src = i < 10 ? `./000${i}.png` : `./00${i}.png`; //for parcel
      img.src = i < 10 ? `./static/g3/000${i}.png` : `./static/g3/00${i}.png`;

      frames.push(img);
    }

    frames[0].onload = () => {
      canvas.width = frames[0].width;
      canvas.height = frames[0].height;
      ctx.drawImage(frames[currentFrame], 0, 0);
    };
  };
}
const app = new App();

const pcEntryOptions = {
  root: null,
  threshold: 0.9,
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(frames[currentFrame], 0, 0);
  currentFrame = (currentFrame + 1) % frameCount;
  console.log(currentFrame);
  if (currentFrame == 43) return;
  setTimeout(() => requestAnimationFrame(animate), 1000 / frameRate);
}

const pcEntryAnimation = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  const pcContainer = document.querySelector(".pc-bg");
  const pcText = document.querySelector(".pc-text");
  setTimeout(() => {
    pcText.classList.remove("hid");
  }, 5000);
  pcContainer.style.width = "100vw";
  pcContainer.style.borderRadius = 0;

  animate();

  pcIntersection.unobserve(pcContainer);
};

const pcIntersection = new IntersectionObserver(
  pcEntryAnimation,
  pcEntryOptions
);

pcIntersection.observe(document.querySelector(".pc-bg"));

const colorfulAnimation = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  const colorfulImg = document.querySelector(".colorful-header-img");
  colorfulImg.classList.add("colorful-rotate");
  colorfulIntersect.unobserve(colorfulImg);
};

const colorfulIntersect = new IntersectionObserver(
  colorfulAnimation,
  pcEntryOptions
);

colorfulIntersect.observe(document.querySelector(".colorful-header-img"));

document.querySelector(".btn-primary").addEventListener("click", function () {
  window.open("https://www.apple.com/ae/shop/buy-mac/imac", "_blank").focus();
});
