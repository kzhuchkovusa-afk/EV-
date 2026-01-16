# 📊 Интеграция формы с Google Sheets

## Пошаговая инструкция

### Шаг 1: Создайте Google Таблицу

1. Откройте [Google Sheets](https://sheets.google.com)
2. Создайте новую таблицу
3. Назовите её **"Florida Build Group - Leads"**
4. В первой строке создайте заголовки:
   - `A1`: **Timestamp** (Дата/Время)
   - `B1`: **Name** (Имя)
   - `C1`: **Phone** (Телефон)
   - `D1`: **Email** (Email)
   - `E1`: **Address** (Адрес)
   - `F1`: **Message** (Сообщение)

### Шаг 2: Создайте Google Apps Script

1. В вашей Google Таблице нажмите **Extensions** (Расширения) → **Apps Script**
2. Удалите весь код по умолчанию
3. Скопируйте и вставьте код ниже:

```javascript
function doPost(e) {
  try {
    // Получаем активную таблицу
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Парсим данные из запроса
    var data = JSON.parse(e.postData.contents);
    
    // Получаем текущую дату и время
    var timestamp = new Date();
    
    // Добавляем новую строку с данными
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.phone || '',
      data.email || '',
      data.address || '',
      data.message || ''
    ]);
    
    // Возвращаем успешный ответ
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Lead saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Возвращаем ошибку
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'active',
      'message': 'Google Sheets API is working'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Нажмите **Save** (💾 Сохранить)
5. Назовите проект: **"Lead Form Handler"**

### Шаг 3: Разверните Web App

1. Нажмите **Deploy** (Развернуть) → **New deployment** (Новое развёртывание)
2. Нажмите на иконку ⚙️ (шестерёнка) рядом с "Select type"
3. Выберите **Web app**
4. Заполните настройки:
   - **Description**: Lead Form Integration
   - **Execute as**: Me (ваш email)
   - **Who has access**: Anyone (Любой пользователь)
5. Нажмите **Deploy**
6. **Важно!** Нажмите **Authorize access** (Авторизовать доступ)
7. Выберите ваш Google аккаунт
8. Нажмите **Advanced** → **Go to Lead Form Handler (unsafe)** → **Allow**
9. **СКОПИРУЙТЕ Web App URL** - он выглядит так:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

### Шаг 4: Добавьте URL в код сайта

Откройте файл `js/main.js` и найдите строку:

```javascript
const GOOGLE_SCRIPT_URL = 'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE';
```

Замените `'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE'` на ваш скопированный URL:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
```

### Шаг 5: Протестируйте

1. Откройте ваш сайт
2. Заполните форму
3. Нажмите "Request Free Inspection"
4. Проверьте вашу Google Таблицу - данные должны появиться!

---

## 🔔 Дополнительно: Email уведомления

Если хотите получать email уведомления о каждой новой заявке, добавьте в Google Apps Script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date();
    
    // Добавляем строку
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.phone || '',
      data.email || '',
      data.address || '',
      data.message || ''
    ]);
    
    // ОТПРАВКА EMAIL УВЕДОМЛЕНИЯ
    var emailBody = 
      "New lead from Florida Build Group website!\n\n" +
      "Name: " + data.name + "\n" +
      "Phone: " + data.phone + "\n" +
      "Email: " + data.email + "\n" +
      "Address: " + data.address + "\n" +
      "Message: " + data.message + "\n\n" +
      "Timestamp: " + timestamp;
    
    MailApp.sendEmail({
      to: "YOUR_EMAIL@gmail.com",  // ← ЗАМЕНИТЕ НА ВАШ EMAIL
      subject: "🏠 New Lead: " + data.name,
      body: emailBody
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Lead saved and email sent'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

**Не забудьте заменить** `YOUR_EMAIL@gmail.com` на ваш настоящий email!

---

## 📝 Структура данных в таблице

Каждая заявка будет добавлена в новую строку:

| Timestamp | Name | Phone | Email | Address | Message |
|-----------|------|-------|-------|---------|---------|
| 2024-01-06 14:30:25 | John Smith | (305) 123-4567 | john@email.com | Miami, FL | Need painting for 3 bedrooms |

---

## ✅ Готово!

Теперь все заявки с сайта автоматически сохраняются в вашу Google Таблицу!

## 🔧 Troubleshooting

**Проблема**: Данные не приходят в таблицу
- Проверьте, что вы скопировали правильный URL из Apps Script
- Убедитесь, что выбрали "Anyone" в настройках доступа
- Проверьте консоль браузера (F12) на наличие ошибок

**Проблема**: Ошибка авторизации
- Повторите шаг авторизации
- Убедитесь, что выбрали "Allow" для всех разрешений

**Проблема**: Email не приходят
- Проверьте папку "Спам"
- Убедитесь, что заменили YOUR_EMAIL@gmail.com на ваш реальный email