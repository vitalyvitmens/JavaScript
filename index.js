// console.log(window);

// console.log("Hello World");

// const app = document.querySelector("#app");

const getUser = async () => {
  try {
    const res = await fetch("https://vk.com");
    const data = await res.json();
  } catch (e) {
    console.log(e);
  }
};

getUser();
