document.addEventListener("DOMContentLoaded", function () {
  const id = new URLSearchParams(window.location.search).get("id");

  if (!id) {
    console.warn("Thiếu tham số ?id trên URL");
    hienThiThongBaoLoi("Thiếu ID sản phẩm trên đường dẫn.");
    return;
  }

  fetch("./js/data.json")
    .then((res) => {
      if (!res.ok) throw new Error("Không thể load file data.json");
      return res.json();
    })
    .then((list) => {
      const product = list.find((p) => p.id == id);
      if (!product) {
        console.warn("Không tìm thấy sản phẩm với ID =", id);
        hienThiThongBaoLoi("Không tìm thấy sản phẩm.");
        return;
      }

      // Hiển thị dữ liệu
      const nameEl = document.getElementById("product-name");
      const typeEl = document.getElementById("product-type");
      const priceEl = document.getElementById("product-price");
      const imgEl = document.getElementById("product-image");
      const featureList = document.getElementById("product-features");
      const descEl = document.getElementById("product-description");

      if (!nameEl || !typeEl || !priceEl || !imgEl || !featureList || !descEl) {
        console.error("Thiếu phần tử HTML để hiển thị sản phẩm.");
        hienThiThongBaoLoi("Giao diện bị thiếu cấu trúc cần thiết.");
        return;
      }

      nameEl.textContent = product.ten;
      typeEl.textContent = product.loai;
      priceEl.textContent = Number(product.gia).toLocaleString() + "₫";
      imgEl.src = product.hinhanh;

      featureList.innerHTML = product.bo_nho.map((item) => `<li>${item}</li>`).join("");

      descEl.innerHTML = `
        <h6>Thông tin sản phẩm:</h6>
        <ul>
          ${product.bo_nho.map((t) => `<li>${t}</li>`).join("")}
        </ul>
        <p><strong>Giá:</strong> ${Number(product.gia).toLocaleString()}₫</p>
        <p><strong>Đánh giá:</strong> ${product.danhgia}/5 sao</p>
      `;
    })
    .catch((err) => {
      console.error("Lỗi khi tải sản phẩm:", err);
      hienThiThongBaoLoi("Lỗi khi tải dữ liệu sản phẩm.");
    });

  // Hàm fallback hiển thị lỗi ra giao diện
  function hienThiThongBaoLoi(thongBao) {
    const fallback = document.createElement("h2");
    fallback.textContent = thongBao;
    fallback.style.color = "red";
    fallback.style.textAlign = "center";
    fallback.style.marginTop = "2rem";
    document.body.appendChild(fallback);
  }
});
