import sublinks from "./data.js";
console.log(sublinks);

const sidewrapper = document.querySelector(".sidebar-wrapper");
const toggleBtn = document.querySelector(".toggle-btn");
const closeBtn = document.querySelector(".close-btn");
const sidebar = document.querySelector(".sidebar-links");
const linksBtns = [...document.querySelectorAll(".link-btn")];
const submenu = document.querySelector(".submenu");
const hero = document.querySelector(".hero");
const nav = document.querySelector(".nav");

toggleBtn.addEventListener("click", () => sidewrapper.classList.add("show"));

closeBtn.addEventListener("click", () => sidewrapper.classList.remove("show"));

linksBtns.forEach((btn) => {
  btn.addEventListener("mouseover", (e) => {
    let content = e.target.textContent;
    const btnBounding = e.target.getBoundingClientRect();
    const bottom = btnBounding.bottom - 4;
    const center = (btnBounding.left + btnBounding.right) / 2;
    content = sublinks.find((item) => item.page === content);
    console.log({ content });

    if (content) {
      submenu.classList.add("show");
      submenu.style.top = `${bottom}px`;
      submenu.style.left = `${center}px`;

      const { page, links } = content;

      submenu.innerHTML = `
      <section>
       <h4>${page}</h4>
        <div class='submenu-center col-${links.length}'>
       ${links
         .map((link) => {
           const { label, icon, url } = link;
           return `
       
        <a href='${url} '>
       <i class='${icon}'>  </i>  ${label}
       </a>
       `;
         })
         .join("")}
         </div>

      </section>
      `;
    }
  });

  sidebar.innerHTML = sublinks
    .map((item) => {
      const { page, links } = item;
      return `
  <article>
   <h4>
   ${page}
   </h4>
   <div class='sidebar-sublinks'>
   ${links
     .map((item) => {
       const { label, icon, url } = item;
       return `
       <a href='${url}'>
       <i class='${icon}'>  </i> ${label}
       </a>
       `;
     })
     .join("")}
   </div>
   
  </article>
  `;
    })
    .join("");
});
hero.addEventListener("mouseover", (e) => {
  submenu.classList.remove("show");
});
nav.addEventListener("mouseover", (e) => {
  if (!e.target.classList.contains("link-btn")) {
    submenu.classList.remove("show");
  }
});
