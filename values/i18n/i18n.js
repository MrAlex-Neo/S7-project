// i18n.js
import 'intl-pluralrules'


import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Определение языков и переводов
const resources = {
  en: {
    translation: {
      welcome: 'Welcome!',
      welcome_1: 'Welcome to S7 Energy!',
      welcome_1_1: 'We are happy to provide energy to your car!',
      welcome_2: 'Eco-friendly sustainability and comfort for every driver',
      welcome_3: 'Only fast charging for your car.',
      welcome_3_1: 'Move around without long waits',
      welcome_4: 'Plan long trips with confidence',
      skip: 'Skip',
      next: 'Next',
      confirm: 'Confirm',
      try: 'Try again',
      registration: 'Registration',
      log_in: 'Log in',
      open_app: 'Open the application',
      hello: "Hello!",
      phone_number: "Phone number",
      badPhoneInputText: "Incorrect number format has been entered",
      badTextInputText: 'You must enter at least three characters',
      phone_number_sing_in: "Enter the phone number to receive the confirmation code",
      map: 'Map',
      stations: 'Stations',
      stations_1: "Currently, there are no active connectors at the station. Select another station or contact customer support",
      stations_2: 'The list of stations is empty.',
      stations_3: 'Contact customer support',
      favourites: 'Favourites',
      profile: 'Profile',
      resendCode: 'Resend the code via',
      resendCodeBtn: 'Resend the confirmation code',
      regCheckBox1: 'By clicking "next", I accept the terms',
      regCheckBox2: 'user agreement',
      enterTheCode: 'Enter the code',
      wrongCode: 'An incorrect confirmation code has been entered',
      checkCode: 'A confirmation code will be sent to the number ',
      checkCode1: '',
      registration: 'Registration',
      name: 'Name',
      surname: 'Surname',
      searchText: 'Search for charging stations',
      busy: 'Busy',
      free: 'Free',
      history: 'History',
      history_1: "You haven't had any surgery yet",
      settings: 'Settings',
      FAQ: 'FAQ',
      FAQ_1: "Let's have a list of frequently asked questions. For more information, please contact the support service",
      help: 'Help',
      purse: 'Adding money to your wallet',
      purse_1: 'Select the amount to top up',
      purse_2: 'The wallet has been replenished!',
      purse_3: 'Credited',
      purse_4: 'Ok',
      pursebtn: 'Top up your wallet',
      personal_data: 'Personal Information',
      change_lang: 'Change the language',
      exit: 'Exit',
      exit_1: 'Exit',
      exit_2: 'Do you want to log out of your account?',
      cancel: 'Cancel',
      save: 'Save',
      contactUs: 'Contact us',
      spend: "Spend",
      received: "Refill",
      kw: 'kW',
      sum: 'sum',
      min: 'min',
      transaction_time: 'Transaction time',
      paid: 'Paid for',
      tariff: 'Tariff',
      charging_time: 'Charging time',
      route: 'Route',
      start: 'Start',
      stationSlider_1: 'Select the type of restriction',
      stationSlider_2: 'Your machine can fill up to 100% without limitation',
      stationSlider_3: 'Unlimited',
      stationSlider_4: 'Power',
      stationSlider_5: 'Money',
      stationSlider_6: 'Time',
      station_info_1: 'Charging Information',
      station_info_2: 'Wallet',
      station_info_3: 'Type of payment',
      station_info_item_1: 'Charging port',
      station_info_item_2: 'The machine is not connected',
      for: 'for',
      turnKindWallet: 'Choose a convenient type of deposit',
      percent: 'Percent',
      amount: 'Amount',
      charging_process: 'The charging process',
      charge_page_1: 'Turn off the charging?',
      charge_page_2: 'Do you want to turn off the charging? Your car has charged up to',
      charge_page_3: 'Yes, stop it',
      charge_page_4: 'Stop charging',
      charge_end_1: 'Your car has charged up to',
      charge_end_2: 'The e-wallet has been debited',
      close: 'Close',
      energy: 'Energy',
      station_port: 'Charging port',
      route_choose: 'Open with',
      update_user: 'View or edit photo',
      download_img_1: 'Profile Photo',
      download_img_2: 'Replace the photo',
      download_img_3: 'Delete a photo',
      permission: 'Grant permission',
      permission_1: 'We need your permission to show the camera',
      error: 'An error has occurred, please write to the support service in a telegram',
      error_1: 'Error',
      mistake_win: 'You are not registered!',
      mistake_win_1: 'Register or log in',
      delete: 'Remove',
      delete_1: 'Delete an account',
      delete_2: 'Do you really want to delete your account?',
      port_state_1: 'free',
      port_state_2: 'busy',
      port_state_3: 'error',
    },
  },
  ru: {
    translation: {
      welcome: 'Добро пожаловать!',
      welcome_1: 'Добро пожаловать в S7 Energy!',
      welcome_1_1: 'Мы рады обеспечить энергией Вашей авто!',
      welcome_2: 'Экологичная устойчивость и комфорт для каждого водителя',
      welcome_3: 'Только быстрая зарядка для вашего автомобиля.',
      welcome_3_1: 'Передвигайтесь без долгих ожиданий',
      welcome_4: 'Планируйте длительные поездки с уверенностью',
      skip: 'Пропустить',
      next: 'Далее',
      confirm: 'Подтвердить',
      try: 'Попробовать снова',
      registration: 'Регистрация',
      log_in: 'Войти',
      open_app: 'Открыть приложение',
      hello: "Здравствуйте!",
      phone_number: "Номер телефона",
      badPhoneInputText: "Введен некоректный формат номера",
      badTextInputText: 'Необходимо ввести минимум три символа',
      phone_number_sing_in: "Введите номер телефона для получения кода подтверждения",
      map: 'Карта',
      stations: 'Станции',
      stations_1: 'На данный момент на станции нет активных коннекторов. Выберите другую станцию или обратитесь в службу поддержки',
      stations_2: 'Список станций пуст.',
      stations_3: 'Обратитесь в службу поддержки',
      favourites: 'Избранные',
      profile: 'Профиль',
      resendCode: 'Повторно отправить код через',
      resendCodeBtn: 'Отправить повторно код подтверждения',
      regCheckBox1: 'Нажимая «далее», я принимаю условия',
      regCheckBox2: 'пользовательского соглашения',
      enterTheCode: 'Введите код',
      wrongCode: 'Введен неправильный код подтверждения',
      checkCode: 'На номер',
      checkCode1: 'будет отправлен код',
      registration: 'Регистрация',
      name: 'Имя',
      surname: 'Фамилия',
      searchText: 'Поиск зарядных станций',
      busy: 'Занят',
      free: 'Свободен',
      history: 'История',
      history_1: 'У вас пока нет ни одной операции',
      settings: 'Настройки',
      FAQ: 'FAQ',
      FAQ_1: 'Список часто задаваемых вопросов пуст. Для дополнительной информации можно обратиться в службу поддержки',
      help: 'Помощь',
      purse: 'Пополнение кошелька',
      purse_1: 'Выберете сумму для пополнения',
      purse_2: 'Кошелек пополнен!',
      purse_3: 'Зачислено',
      purse_4: 'OK',
      pursebtn: 'Пополнить кошелек',
      personal_data: 'Личная информация',
      change_lang: 'Изменить язык',
      exit: 'Выйти',
      exit_1: 'Выход',
      exit_2: 'Вы хотите выйти из аккаунта?',
      cancel: 'Отменить',
      save: 'Сохранить',
      contactUs: 'Связаться с нами',
      spend: "Списано",
      received: "Пополнение",
      kw: 'кВт',
      sum: 'сум',
      min: 'мин',
      transaction_time: 'Время транзакции',
      paid: 'Оплачено',
      tariff: 'Тариф',
      charging_time: 'Время зарядки',
      route: 'Маршрут',
      start: 'Начать',
      stationSlider_1: 'Выберите тип ограничения',
      stationSlider_2: 'Ваша машина может быть заправлена до 100% без ограничений',
      stationSlider_3: 'Без ограничений',
      stationSlider_4: 'Мощность',
      stationSlider_5: 'Деньги',
      stationSlider_6: 'Время',
      station_info_1: 'Информация о зарядке',
      station_info_2: 'Кошелек',
      station_info_3: 'Вид оплаты',
      station_info_item_1: 'Зарядный порт',
      station_info_item_2: 'Машина не подключена',
      for: 'за',
      turnKindWallet: 'Выберите удобный вид пополнения',
      percent: 'Процент',
      amount: 'Сумма',
      charging_process: 'Процесс зарядки',
      charge_page_1: 'Отключить зарядку?',
      charge_page_2: 'Вы хотите отключить зарядку? Ваша машина зарядилась до',
      charge_page_3: 'Да, остановить',
      charge_page_4: 'Остановить зарядку',
      charge_end_1: 'Ваша машина зарядилась до',
      charge_end_2: 'С электронного кошелка списано',
      close: 'Закрыть',
      energy: 'Энергия',
      station_port: 'Зарядный порт',
      route_choose: 'Открыть с помощью',
      update_user: 'Просмотреть или отредактировать фото',
      download_img_1: 'Фото профиля',
      download_img_2: 'Заменить фото',
      download_img_3: 'Удалить фото',
      permission: 'Предоставьте разрешение',
      permission_1: 'Нам нужно ваше разрешение, чтобы показать камеру',
      error: 'Возникла ошибка, пожалуйста напишите в службу поддержки в телеграме',
      error_1: 'Ошибка',
      mistake_win: 'Вы не зарегистрированны!',
      mistake_win_1: 'Зарегистрируйтесть или войдите в систему',
      delete: 'Удалить',
      delete_1: 'Удалить аккаунт',
      delete_2: 'Вы действительно хотите удалить аккаунт?',
      port_state_1: 'свободен',
      port_state_2: 'занят',
      port_state_3: 'ошибка',
    },
  },
  uz: {
    translation: {
      welcome: 'Xush kelibsiz!',
      welcome_1: 'S7 Energy-ga xush kelibsiz!',
      welcome_1_1: "Biz sizning mashinangizni energiya bilan ta'minlashdan mamnunmiz!",
      welcome_2: 'Har bir haydovchi uchun barqaror barqarorlik va qulaylik',
      welcome_3: 'Avtomobilingiz uchun faqat tez zaryadlash.',
      welcome_3_1: 'Uzoq kutmasdan harakatlaning',
      welcome_4: 'Ishonch bilan uzoq sayohatlarni rejalashtiring',
      skip: "O'tkazib",
      next: "Keyingi",
      confirm: 'Tasdiqlash',
      try: "Yana urinib ko'ring",
      registration: "Ro'yxatdan o'tish",
      log_in: "Kirish",
      open_app: "Ilovani oching",
      hello: "Salom alekum!",
      phone_number: "Telefon raqami",
      badPhoneInputText: "Noto'g'ri raqam formati kiritildi",
      badTextInputText: 'Siz kamida uchta belgini kiritishingiz kerak',
      phone_number_sing_in: "Tasdiqlash kodini olish uchun telefon raqamini kiriting",
      map: 'Xarita',
      stations: 'Stantsiyalar',
      stations_1: "Hozirgi vaqtda stansiyada faol ulagichlar mavjud emas. Boshqa stantsiyani tanlang yoki qo'llab-quvvatlash xizmatiga murojaat qiling",
      stations_2: "Stantsiyalar ro'yxati bo'sh.",
      stations_3: "Qo'llab-quvvatlash xizmatiga murojaat qiling",
      favourites: 'Sevimlilar',
      profile: 'Profil',
      resendCode: 'Kodni qayta yuboring',
      resendCodeBtn: 'Tasdiqlash kodini qayta yuboring',
      regCheckBox1: '"Keyingi" tugmasini bosish orqali men shartlarni qabul qilaman',
      regCheckBox2: 'foydalanuvchi shartnomasi',
      enterTheCode: 'Kodni kiriting',
      wrongCode: "Noto'g'ri tasdiqlash kodi kiritildi",
      checkCode: 'Tasdiqlash kodi',
      checkCode1: 'raqamiga yuboriladi',
      registration: "Ro'yxatdan o'tish",
      name: 'Ism',
      surname: 'Familiyasi',
      searchText: 'Zaryadlash stantsiyalarini qidirish',
      busy: 'Band',
      free: 'Ozod',
      history: 'Tarix',
      history_1: "Sizda hali bitta operatsiya yo'q",
      settings: 'Sozlamalar',
      FAQ: 'FAQ',
      FAQ_1: "Tez-tez so'raladigan savollar ro'yxatiga ruxsat bering. Qo'shimcha ma'lumot olish uchun siz qo'llab-quvvatlash xizmatiga murojaat qilishingiz mumkin",
      help: 'Yordam',
      purse: "Hamyonni to'ldirish",
      purse_1: "To'ldirish miqdorini tanlang",
      purse_2: "Hamyon to'ldirildi!",
      purse_3: 'Qabul qilingan',
      purse_4: 'Ok',
      pursebtn: "Hamyonni to'ldiring",
      personal_data: "Shaxsiy ma'lumotlar",
      change_lang: "Tilni o'zgartirish",
      exit: 'Chiqish',
      exit_1: 'Chiqish',
      exit_2: 'Hisobingizdan chiqishni xohlaysizmi?',
      cancel: 'Bekor qilish',
      save: 'Saqlash',
      contactUs: "Biz bilan bog'laning",
      spend: "Sarflangan",
      received: "To'ldirish",
      kw: 'kVt',
      sum: "so'm",
      min: 'min',
      transaction_time: 'Tranzaksiya vaqti',
      paid: "To'langan",
      tariff: 'Tarif',
      charging_time: 'Zaryadlash vaqti',
      route: "Yo'nalish",
      start: 'Boshlang',
      stationSlider_1: 'Cheklov turini tanlang',
      stationSlider_2: 'Moshinangiz cheklovsiz 100% gacha to’ldirish mumkin',
      stationSlider_3: 'Cheklovsiz',
      stationSlider_4: 'Quvvat',
      stationSlider_5: 'Pul',
      stationSlider_6: 'Vaqt',
      station_info_1: "Zaryadlash haqida ma'lumot",
      station_info_2: 'Hamyon',
      station_info_3: "To'lov turi",
      station_info_item_1: 'Zaryadlash porti',
      station_info_item_2: 'Mashina ulanmagan',
      for: 'uchun',
      turnKindWallet: "To'ldirishning qulay turini tanlang",
      percent: 'Miqdori',
      charging_process: 'Zaryadlash jarayoni',
      charge_page_1: "Zaryadlashni o'chirib qo'yasizmi?",
      charge_page_2: "Zaryadlashni o'chirib qo'ymoqchimisiz? Sizning mashinangiz zaryadlandi",
      charge_page_3: "Ha, to'xtating",
      charge_page_4: "Zaryadlashni to'xtating",
      charge_end_1: 'Sizning mashinangiz zaryadlandi',
      charge_end_2: 'Elektron hamyondan olingan',
      close: 'Yopish',
      energy: 'Energiya',
      station_port: 'Zaryadlash porti',
      route_choose: 'Bilan oching',
      update_user: "Fotosuratni ko'rish yoki tahrirlash",
      download_img_1: 'Profil fotosurati',
      download_img_2: 'Fotosuratni almashtiring',
      download_img_3: "Fotosuratni o'chirish",
      permission: 'Ruxsat bering',
      permission_1: "Kamerani ko'rsatish uchun sizga ruxsat kerak",
      error: "Xatolik yuz berdi, iltimos, qo'llab-quvvatlash xizmatiga telegramda yozing",
      error_1: 'Xato',
      mistake_win: "Siz ro'yxatdan o'tmagansiz!",
      mistake_win_1: "Ro'yxatdan o'ting yoki tizimga kiring",
      delete: "O'chirish",
      delete_1: "Hisobni o'chirish",
      delete_2: "Siz haqiqatan ham hisobni o'chirishni xohlaysizmi?",
      port_state_1: 'ozod',
      port_state_2: 'band',
      port_state_3: 'xato',
    },
  },
};

let language = 'en'
const checkLang = async () => {
  try {
    const lang = await AsyncStorage.getItem("lang");
    console.log("lang", lang);
    if (lang) {
      language = lang
    } else {
      language = 'en'
    }
  } catch (error) {
    console.log(error);
  }
};

checkLang();

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: language, // начальный язык
    fallbackLng: language, // язык по умолчанию
    interpolation: {
      escapeValue: false, // не требуется экранирование для React Native
    },
  });
// i18next
//   .use(initReactI18next)
//   .init({
//     resources,
//     lng: 'en', // начальный язык
//     fallbackLng: 'en', // язык по умолчанию
//     interpolation: {
//       escapeValue: false, // не требуется экранирование для React Native
//     },
//   });

export default i18next;
