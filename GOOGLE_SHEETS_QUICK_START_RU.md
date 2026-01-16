# 🚀 Быстрая настройка Google Sheets для заявок

## ⚡ За 5 минут

### 1️⃣ Создайте таблицу

1. Откройте https://sheets.google.com
2. Создайте новую таблицу: **"Florida Build Group - Leads"**
3. В первой строке напишите заголовки:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Phone`
   - D1: `Email`
   - E1: `Address`
   - F1: `Message`

### 2️⃣ Создайте скрипт

1. В таблице: **Extensions** → **Apps Script**
2. Вставьте этот код (удалив старый):

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date();
    
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.phone || '',
      data.email || '',
      data.address || '',
      data.message || ''
    ]);
    
    // ОПЦИОНАЛЬНО: Email уведомления
    // Раскомментируйте и замените на свой email
    /*
    MailApp.sendEmail({
      to: "ВАШ_EMAIL@gmail.com",
      subject: "🏠 Новая заявка: " + data.name,
      body: "Имя: " + data.name + "\nТелефон: " + data.phone + "\nEmail: " + data.email
    });
    */
    
    return ContentService
      .createTextOutput(JSON.stringify({'status': 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({'status': 'error', 'message': error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({'status': 'active'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. **Сохраните** (💾)

### 3️⃣ Разверните Web App

1. **Deploy** → **New deployment**
2. Иконка ⚙️ → **Web app**
3. Настройки:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. **Deploy**
5. **Authorize access** → выберите ваш Google аккаунт
6. **Advanced** → **Go to ... (unsafe)** → **Allow**
7. **СКОПИРУЙТЕ URL** (выглядит как `https://script.google.com/macros/s/...../exec`)

### 4️⃣ Добавьте URL на сайт

Откройте файл **`js/main.js`** и найдите строку 5:

```javascript
const GOOGLE_SCRIPT_URL = 'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE';
```

Замените на ваш скопированный URL:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
```

### 5️⃣ Готово! 🎉

Теперь все заявки с сайта будут автоматически сохраняться в вашу Google Таблицу!

---

## 📧 Бонус: Email уведомления

Чтобы получать email при каждой заявке:

1. В коде скрипта найдите закомментированный блок `/* MailApp.sendEmail ... */`
2. Раскомментируйте его (удалите `/*` в начале и `*/` в конце)
3. Замените `ВАШ_EMAIL@gmail.com` на ваш настоящий email
4. Сохраните и заново разверните (Deploy → Manage deployments → Edit → Version: New version → Deploy)

---

## 🔧 Проверка работы

1. Откройте ваш сайт
2. Заполните форму
3. Нажмите "Request Free Inspection"
4. Проверьте таблицу - должна появиться новая строка!

---

## ❗ Важные моменты

- ✅ URL должен заканчиваться на `/exec`
- ✅ В настройках доступа должно быть "Anyone"
- ✅ Обязательно нажмите "Allow" при авторизации
- ✅ Не забудьте сохранить `js/main.js` после вставки URL

---

## 🆘 Проблемы?

**Данные не приходят:**
- Проверьте URL в `js/main.js`
- Откройте консоль браузера (F12) и посмотрите ошибки
- Убедитесь, что выбрали "Anyone" в доступе

**Ошибка авторизации:**
- Повторите шаг 3, обязательно нажмите "Allow"

---

## 📊 Формат данных в таблице

| Timestamp | Name | Phone | Email | Address | Message |
|-----------|------|-------|-------|---------|---------|
| 06.01.2024 14:30 | John Smith | (305) 123-4567 | john@example.com | Miami, FL | Need 3 bedrooms |

Готово! Ваша CRM система работает! 🎯