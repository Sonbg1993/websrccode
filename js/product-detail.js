document.addEventListener("DOMContentLoaded", function () {
  const id = new URLSearchParams(window.location.search).get("id");
  fetch("./js/data.json")
    .then((res) => res.json())
    .then((list) => {
      const product = list.find((p) => p.id == id);
      if (!id || !product) {
        console.warn("Không tìm thấy sản phẩm với ID =", id);
        document.getElementById("product-name").textContent =
          "Không tìm thấy sản phẩm";
        return;
      }

      // Hiển thị dữ liệu
      document.getElementById("product-name").textContent = product.ten;
      document.getElementById("product-type").textContent = product.loai;
      document.getElementById("product-price").textContent =
        Number(product.gia).toLocaleString() + "₫";
      document.getElementById("product-image").src = product.hinhanh;

      // Tính năng
      const featureList = document.getElementById("product-features");
      featureList.innerHTML = "";
      product.bo_nho.forEach((item) => {
        featureList.innerHTML += `<li>${item}</li>`;
      });

      // Mô tả (modal)
      document.getElementById("product-description").innerHTML = `
        <h6>Thông tin sản phẩm:</h6>
        <ul>
          ${product.bo_nho.map((t) => `<li>${t}</li>`).join("")}
        </ul>
        <p><strong>Giá:</strong> ${Number(product.gia).toLocaleString()}₫</p>
        <p><strong>Đánh giá:</strong> ${product.danhgia}/5 sao</p>
      `;
    });
});
