const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // public klasöründeki index.html'i otomatik sunar

// MongoDB Atlas Bağlantısı
const url = 'mongodb+srv://yasindenizask_db_user:KBKWzFNUSnQjKQhJ@yasindenizdias.oajlnds.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'okulOdeviDB';
const collectionName = 'kayitlar';

let koleksiyon;

async function dbBaglan() {
  try {
    await client.connect();
    console.log('MongoDB Atlas veritabanına başarıyla bağlanıldı!');
    const db = client.db(dbName);
    koleksiyon = db.collection(collectionName);
  } catch (err) {
    console.error('Bağlantı hatası:', err);
  }
}
dbBaglan();

// 1. LİSTELEME
app.get('/api/kayitlar', async (req, res) => {
  try {
    const veriler = await koleksiyon.find({}).toArray();
    res.json(veriler);
  } catch (err) {
    res.status(500).json({ hata: err.message });
  }
});

// 2. EKLEME
app.post('/api/kayitlar', async (req, res) => {
  try {
    const yeniVeri = {
      baslik: req.body.baslik,
      aciklama: req.body.aciklama,
      fiyat: Number(req.body.fiyat),
      tarih: new Date()
    };
    const sonuc = await koleksiyon.insertOne(yeniVeri);
    res.status(201).json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: err.message });
  }
});

// 3. GÜNCELLEME
app.put('/api/kayitlar/:id', async (req, res) => {
  try {
    const sorgu = { _id: new ObjectId(req.params.id) };
    const yeniDegerler = {
      $set: {
        baslik: req.body.baslik,
        aciklama: req.body.aciklama,
        fiyat: Number(req.body.fiyat)
      }
    };
    const sonuc = await koleksiyon.updateOne(sorgu, yeniDegerler);
    res.json(sonuc);
  } catch (err) {
    res.status(400).json({ hata: err.message });
  }
});

// 4. SİLME
app.delete('/api/kayitlar/:id', async (req, res) => {
  try {
    const sorgu = { _id: new ObjectId(req.params.id) };
    const sonuc = await koleksiyon.deleteOne(sorgu);
    res.json({ mesaj: 'Kayıt başarıyla silindi', sonuc });
  } catch (err) {
    res.status(400).json({ hata: err.message });
  }
});

// Sunucuyu Başlat
app.listen(3000, () => {
  console.log('Sunucu http://localhost:3000 adresinde çalışıyor.');
});