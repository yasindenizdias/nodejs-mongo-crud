25580090 YASİN DENİZ
# NodeJS & Express - MongoDB CRUD Uygulaması

Bu proje, Node.js ve Express framework'ü kullanılarak MongoDB resmi sürücüsü (MongoDB Native Driver) ile geliştirilmiş temel CRUD (Ekle, Sil, Güncelle, Listele) operasyonlarını gerçekleştiren bir web uygulamasıdır.

##  Kullanılan Teknolojiler
- **Node.js**
- **Express.js**
- **MongoDB Native Driver** (`MongoClient`, `ObjectId`)
- **MongoDB Atlas** (Bulut Veritabanı)
- **HTML / CSS / Vanilla JavaScript** (Arayüz)

## 📌 Özellikler (CRUD)
- **Listeleme (Read):** `GET /api/kayitlar` -> Tüm kayıtları MongoDB koleksiyonundan çeker (`collection.find()`).
- **Ekleme (Create):** `POST /api/kayitlar` -> Yeni bir kaydı veritabanına ekler (`collection.insertOne()`).
- **Güncelleme (Update):** `PUT /api/kayitlar/:id` -> Belirtilen ID'ye sahip kaydı günceller (`collection.updateOne()`).
- **Silme (Delete):** `DELETE /api/kayitlar/:id` -> Belirtilen ID'ye sahip kaydı veritabanından siler (`collection.deleteOne()`).

