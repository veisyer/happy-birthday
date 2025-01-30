// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("customize.json")
    .then(data => data.json())
    .then(data => {
      dataArr = Object.keys(data);
      dataArr.map(customData => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .querySelector(`[data-node-name*="${customData}"]`)
              .setAttribute("src", data[customData]);
          } else {
            document.querySelector(`[data-node-name*="${customData}"]`).innerText = data[customData];
          }
        }

        // Check if the iteration is over
        // Run animation if so
        if (dataArr.length === dataArr.indexOf(customData) + 1) {
          animationTimeline();
        } 
      });
    });
};

// Animation Timeline
const animationTimeline = () => {
  const tl = new TimelineMax({ paused: true });

  let step = 0;
  const steps = [
    () => tl.to(".container", 0.1, { visibility: "visible" }),
    () => tl.from(".one", 0.7, { opacity: 0, y: 10 }),
    () => tl.from(".two", 0.4, { opacity: 0, y: 10 }),
    () => tl.to(".one", 0.7, { opacity: 0, y: 10 }),
    () => tl.to(".two", 0.7, { opacity: 0, y: 10 }),
    () => tl.from(".three", 0.7, { opacity: 0, y: 10 }),
    () => tl.to(".three", 0.7, { opacity: 0, y: 10 }),
    () => tl.from(".four", 0.7, { scale: 0.2, opacity: 0 }),
    () => tl.from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
  ];

  document.addEventListener("click", () => {
    if (step < steps.length) {
      steps[step++]();
    }
  });

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
    step = 0;
  });
};

// Run fetch and animation in sequence
fetchData();
