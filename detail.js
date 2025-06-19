const params = new URLSearchParams(location.search);
const id = params.get('id');
fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const sp = data.find(x => x.id == id);
    const div = document.getElementById('product-detail');
    div.innerHTML = `
      <div class="card">
        <img src="${sp.hinh}" class="card-img-top" alt="${sp.ten}">
        <div class="card-body">
          <h3>${sp.ten}</h3>
          <p>${sp.mo_ta}</p>
          <p class="text-danger fw-bold">${sp.gia.toLocaleString()}đ</p>
          <button class="btn btn-primary" onclick="addToCart(${sp.id})">Thêm vào giỏ</button>
        </div>
      </div>
    `;
  });

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('gioHang') || '[]');
  const found = cart.find(item => item.id === id);
  if (found) found.sl++; else cart.push({ id, sl: 1 });
  localStorage.setItem('gioHang', JSON.stringify(cart));
  alert('Đã thêm vào giỏ!');
}
