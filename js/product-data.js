document.addEventListener("DOMContentLoaded", function () {
  fetch("./js/data.json")
    .then((response) => response.json())
    .then((data) => {
      const danhMucElements = document.querySelectorAll("div[data-loai]");

      danhMucElements.forEach((container) => {
        const loai = container.getAttribute("data-loai");
        const filtered = data.filter((sp) => sp.loai === loai);

        let html = "";
        filtered.forEach((sp) => {
          html += `
            <div class="col-6 col-lg phone--card">
              <a href="product.html?id=${sp.id}" class="phone--produce">
                <div class="img">
                  <img src="${sp.hinhanh}" alt="${sp.ten}">
                </div>
                <div class="phone--produce__text">
                  <h2>${sp.ten}</h2>
                  <div class="Memory">
                    ${sp.bo_nho?.map((t) => `<span>${t}</span>`).join("") || ""}
                  </div>
                  <div class="stars">
                    <form>
                      ${[5, 4, 3, 2, 1]
                        .map(
                          (i) => `
                        <input class="star star-${i}" id="star-${i}-${
                            sp.id
                          }" type="radio" name="star-${sp.id}" ${
                            sp.danhgia === i ? "checked" : ""
                          }/>
                        <label class="star star-${i}" for="star-${i}-${
                            sp.id
                          }"></label>`
                        )
                        .join("")}
                    </form>
                    <span>(${sp.danhgia} Đánh Giá)</span>
                  </div>
                  <p>${Number(sp.gia).toLocaleString()}<span>₫</span></p>
                </div>
              </a>
            </div>`;
        });

        container.innerHTML = html;
      });
    });
});
